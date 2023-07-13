import axios from 'axios';
import { convertPayStringToUrl } from './paystring.convert';
import { PaymentInformation } from './paystring.interfaces';
import debounce from 'debounce';
import { domain } from '..';
import { parsePayString } from './paystring.parse';

const minDebounceTime = 300;

export async function getPayStringAsync(PayString: string, options?: { chain?: string; environment?: string }) {
  try {
    try {
      PayString = parsePayString(PayString);
    } catch (error) {
      PayString = `${PayString}$${domain}`;
    }
    const url = convertPayStringToUrl(PayString).toString();

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

export function getPayStringDebounce(
  callback: (data: PaymentInformation | undefined) => void,
  PayString: string,
  debounceTime = minDebounceTime,
) {
  if (debounceTime < minDebounceTime) {
    debounceTime = minDebounceTime;
  }

  if (debounceSearchFunction) {
    debounceSearchFunction.clear();
  }

  try {
    PayString = parsePayString(PayString);
  } catch (error) {
    PayString = `${PayString}$${domain}`;
  }

  if (pastSearchQuery !== PayString) {
    debounceSearchFunction = debounce(() => {
      getPayStringAsync(PayString).then(callback);
      debounceSearchFunction = null;
    }, debounceTime);

    pastSearchQuery = PayString;
    debounceSearchFunction();
  }
}
