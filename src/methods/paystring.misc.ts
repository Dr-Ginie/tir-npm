import { payStringCanisterUrl } from '..';

/**
 * Splits a PayString into its prefix and domain.
 * @param payString the complete paystring "prefix$domain.extension"
 *
 * @returns `{ prefix: string, domain: string }` or `undefined` if not parsable.
 */
export function splitPayString(payString: string): { prefix: string; domain: string } | undefined {
  const lastDollarIndex = payString.lastIndexOf('$');
  const prefix = payString.slice(0, lastDollarIndex);
  const domain = payString.slice(lastDollarIndex + 1);

  // A PayString must have a user and a host, divided by a $ (e.g. alice$example.com)
  if (lastDollarIndex === -1 || prefix.length === 0 || domain.length === 0) return;

  return { prefix, domain };
}

/**
 * Check the validity of a paystring prefix and if its url parsable
 * @param prefix the prefix of a paystring
 *
 * @returns `true` if valid, `false` otherwise.
 */
export function isValidPrefix(prefix: string): boolean {
  const urlSafePattern = /^[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]*$/;
  if (!urlSafePattern.test(prefix)) {
    return false;
  }

  return true;
}

/**
 * NOT IMPLEMENTED
 * Check if a domain is trusted by the PayString Canister
 * @param domain the domain to check
 *
 * @returns `true` if trusted, `false` otherwise.
 */
export async function isTrustedDomain(domain: string): Promise<boolean> {
  // const url = `${payStringCanisterUrl}/.well-known/ic-domains`;
  // const response = await fetch(url);
  // const data = await response.text();
  return false;
}
