import axios, { AxiosHeaders, RawAxiosRequestHeaders } from 'axios';
import { convertPayStringToUrl } from './paystring.convert';
import { PaymentInformation } from './paystring.interfaces';
import debounce from 'debounce';
import { domain } from '..';
import { parsePayString } from './paystring.parse';

interface Options {
  chain?: string;
  environment?: string;
  version?: string;
}

const minDebounceTime = 300;

export async function getPayStringAsync(payString: string, options?: Options) {
  try {
    const parsedPayString = parsePayString(payString);
    const url = convertPayStringToUrl(parsedPayString).toString();

    const acceptChain = options?.chain ? options.chain : 'payid';
    const acceptEnvironment = options?.environment ? `-${options.environment}` : '';

    let headers: RawAxiosRequestHeaders = {
      'content-type': 'application/json',
      Accept: `application/${acceptChain}${acceptEnvironment}+json`,
    };

    if (options?.version) {
      headers = {
        ...headers,
        'PayID-Version': options.version,
      };
    }

    const result = await axios.get<PaymentInformation>(url, {
      headers,
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
  options?: Options,
  debounceTime = minDebounceTime,
) {
  if (debounceTime < minDebounceTime) {
    debounceTime = minDebounceTime;
  }

  if (debounceSearchFunction) {
    debounceSearchFunction.clear();
  }

  if (pastSearchQuery !== payString) {
    debounceSearchFunction = debounce(() => {
      getPayStringAsync(payString, options).then(callback);
      debounceSearchFunction = null;
    }, debounceTime);

    pastSearchQuery = payString;
    debounceSearchFunction();
  }
}
