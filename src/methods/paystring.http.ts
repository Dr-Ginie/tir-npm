import axios from 'axios';
import { convertPayStringToUrl } from './paystring.convert';
import { PaymentInformation } from './paystring.interfaces';
import debounce from 'debounce';
import { parsePayStringUrl } from './paystring.parse';
import { paystringCanisterId } from '../canister/paystring/paystring.actor';

const minDebounceTime = 300;

export async function getPaystringData(paystring: string, options?: { chain?: string; environment?: string }) {
  try {
    const url = convertPayStringToUrl(paystring).toString();

    const acceptChain = options?.chain ? options.chain : 'payid';
    const acceptEnvironment = options?.environment ? `-${options.environment}` : '';

    const result = await axios.get<PaymentInformation>(url, {
      headers: {
        contentType: 'application/json',
        Accept: `application/${acceptChain}${acceptEnvironment}+json`,
        'PayID-Version': '1.0',
      },
    });

    return result.data;
  } catch (error) {
    return undefined;
  }
}

let pastSearchQuery: string | undefined;
let debounceSearchFunction: ((() => void) & { clear(): void }) | null = null;

export function getPaystringDataDebounced(
  callback: (data: PaymentInformation | undefined) => void,
  query: string,
  domain = `https://${paystringCanisterId}.raw.icp0.io/`,
  debounceTime = minDebounceTime,
) {
  const url = parsePayStringUrl(domain);

  if (debounceTime < minDebounceTime) {
    debounceTime = minDebounceTime;
  }

  if (debounceSearchFunction) {
    debounceSearchFunction.clear();
  }

  if (pastSearchQuery !== query) {
    debounceSearchFunction = debounce(() => {
      getPaystringData(`${query}$${url.hostname}`).then(callback);
      debounceSearchFunction = null;
    }, debounceTime);

    pastSearchQuery = query;
    debounceSearchFunction();
  }
}
