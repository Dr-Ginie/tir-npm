import axios, { RawAxiosRequestHeaders } from 'axios';
import { convertPayStringToUrl } from './paystring.convert';
import { PaymentInformation } from './paystring.interfaces';
import debounce from 'debounce';
import { parsePayString } from './paystring.parse';
import { isValidPrefix, isVerifiedDomain } from './paystring.misc';

export interface Options {
  chain?: string;
  environment?: string;
  version?: string;
  verifiedDomainOnly?: boolean;
}

const minDebounceTime = 300;

/**
 * Find a PayString and return the payment information.
 * @param prefix The part before the "$" for the PayString.
 * @param domain The domain to use for fetching the PayString.
 * @param options Options to search for specific PaymentInformation per network and / or environment.
 *
 * @returns `PaymentInformation` or `undefined` when none is found.
 */
export async function getPayStringAsync(
  prefix: string,
  domain: string,
  options?: Options,
): Promise<PaymentInformation | undefined> {
  if (domain.includes('://')) {
    domain = domain.split('://')[1];
  }

  if (options?.verifiedDomainOnly === undefined || options?.verifiedDomainOnly === true) {
    const isVerified = await isVerifiedDomain(domain);
    if (!isVerified) return;
  }

  const payString = `${prefix}$${domain}`;
  try {
    if (!isValidPrefix(payString)) return;

    const _parsed = parsePayString(payString);
    if (!_parsed) return;

    const _converted = convertPayStringToUrl(_parsed);
    if (!_converted) return;

    const acceptChain = options?.chain ? options.chain : 'payid';
    const acceptEnvironment = options?.environment ? `-${options.environment}` : '';

    let headers: RawAxiosRequestHeaders = {
      'content-type': 'application/json',
      Accept: `application/${acceptChain}${acceptEnvironment}+json`,
    };

    if (!!options?.version) {
      headers = {
        'PayID-Version': options.version,
        ...headers,
      };
    }

    const result = await axios.get<PaymentInformation>(_converted.toString(), {
      headers,
    });

    return result.data;
  } catch (error) {
    return undefined;
  }
}

let pastSearchPrefix: string | undefined;
let debouncePrefixFunction: ((() => void) & { clear(): void }) | null = null;

/**
 * Find a PayString and return the payment information with a debounce and callback.
 * @param callback Returns the PaymentInformation when the query is done, or undefined when none is found.
 * @param prefix The part before the "$" for the PayString.
 * @param domain The domain to use for fetching the PayString.
 * @param options Options to search for specific PaymentInformation per network and / or environment.
 * @param debounceTime Time it takes between the last keypress and the actual query call.
 *
 * @returns `void`.
 */
export function getPayStringDebounce(
  callback: (data: PaymentInformation | undefined) => void,
  prefix: string,
  domain: string,
  options?: Options,
  debounceTime = minDebounceTime,
) {
  if (debounceTime < minDebounceTime) {
    debounceTime = minDebounceTime;
  }

  if (debouncePrefixFunction) {
    debouncePrefixFunction.clear();
  }

  if (pastSearchPrefix !== prefix) {
    debouncePrefixFunction = debounce(() => {
      getPayStringAsync(prefix, domain, options).then(callback);
      debouncePrefixFunction = null;
    }, debounceTime);

    pastSearchPrefix = prefix;
    debouncePrefixFunction();
  }
}

/**
 * Search for a paystring based on a query and return the payment information.
 * @param query The search query the paystring should match
 * @param domain The domain to use for searching the PayString.
 * @param options Options to search for specific PaymentInformation per network and / or environment.
 *
 * @returns `PaymentInformation[]` or `[]` when none is found.
 */
export async function searchPayString(query: string, domain: string, options?: Options): Promise<PaymentInformation[]> {
  if (domain.includes('://')) {
    domain = domain.split('://')[1];
  }

  if (options?.verifiedDomainOnly === undefined || options?.verifiedDomainOnly === true) {
    const isVerified = await isVerifiedDomain(domain);
    if (!isVerified) return [];
  }

  try {
    const acceptChain = options?.chain ? options.chain : 'payid';
    const acceptEnvironment = options?.environment ? `-${options.environment}` : '';

    let headers: RawAxiosRequestHeaders = {
      'content-type': 'application/json',
      Accept: `application/${acceptChain}${acceptEnvironment}+json`,
    };

    if (!!options?.version) {
      headers = {
        'PayID-Version': options.version,
        ...headers,
      };
    }

    const result = await axios.get<PaymentInformation[]>(`https://${domain}/?search=${query}`, {
      headers,
    });

    return result.data;
  } catch (error) {
    return [];
  }
}

let pastSearchSearch: string | undefined;
let debounceSearchFunction: ((() => void) & { clear(): void }) | null = null;

/**
 * Search for a PayString and return the payment information with a debounce and callback.
 * @param callback Returns the PaymentInformation when the query is done, or undefined when none is found.
 * @param query The search query the paystring should match
 * @param domain The domain to use for fetching the PayString.
 * @param options Options to search for specific PaymentInformation per network and / or environment.
 * @param debounceTime Time it takes between the last keypress and the actual query call.
 *
 * @returns `void`.
 */
export function searchPayStringDebounce(
  callback: (data: PaymentInformation[]) => void,
  query: string,
  domain: string,
  options?: Options,
  debounceTime = minDebounceTime,
) {
  if (debounceTime < minDebounceTime) {
    debounceTime = minDebounceTime;
  }

  if (debounceSearchFunction) {
    debounceSearchFunction.clear();
  }

  if (pastSearchSearch !== query) {
    debounceSearchFunction = debounce(() => {
      searchPayString(query, domain, options).then(callback);
      debounceSearchFunction = null;
    }, debounceTime);

    pastSearchSearch = query;
    debounceSearchFunction();
  }
}
