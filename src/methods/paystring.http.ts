import axios from 'axios';
import { convertPayStringToUrl } from './paystring.convert';
import { PaymentInformation } from './paystring.interfaces';
import debounce from 'debounce';
import { domain } from '..';
import { parsePayString } from './paystring.parse';

const minDebounceTime = 300;

export async function getPayStringAsync(payString: string, options?: { chain?: string; environment?: string }) {
  try {
    try {
      payString = parsePayString(payString);
    } catch (error) {
      payString = `${payString}$${domain}`;
    }
    const url = convertPayStringToUrl(payString).toString();

    const acceptChain = options?.chain ? options.chain : 'payid';
    const acceptEnvironment = options?.environment ? `-${options.environment}` : '';

    const result = await axios.get<PaymentInformation>(url, {
      headers: {
        contentType: 'application/json',
        Accept: `application/${acceptChain}${acceptEnvironment}+json`,
      },
    });

    return result.data;
  } catch (error) {
    return undefined;
  }
}

let pastSearchQuery: string | undefined;
let debounceSearchFunction: ((() => void) & { clear(): void }) | null = null;

export function getPayStringDebounce(
  callback: (data: PaymentInformation | undefined) => void,
  payString: string,
  debounceTime = minDebounceTime,
) {
  if (debounceTime < minDebounceTime) {
    debounceTime = minDebounceTime;
  }

  if (debounceSearchFunction) {
    debounceSearchFunction.clear();
  }

  try {
    payString = parsePayString(payString);
  } catch (error) {
    payString = `${payString}$${domain}`;
  }

  if (pastSearchQuery !== payString) {
    debounceSearchFunction = debounce(() => {
      getPayStringAsync(payString).then(callback);
      debounceSearchFunction = null;
    }, debounceTime);

    pastSearchQuery = payString;
    debounceSearchFunction();
  }
}
