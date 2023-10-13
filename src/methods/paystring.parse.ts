import { splitPayString } from './paystring.misc';

/**
 * Check the validity of a paystring
 * @param payString the complete PayString "prefix$domain.extension"
 *
 * @returns paystring from input argument in lowercase or `undefined` if not parsable.
 */
export function parsePayString(payString: string): string | undefined {
  const _split = splitPayString(payString);

  if (!_split) return;
  const { prefix: user, domain: host } = _split;

  const urlSafePattern = /^[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]*$/;
  if (!urlSafePattern.test(user)) return;

  // A PayString string representation cannot include paths
  if (user.includes('/') || host.includes('/')) return;

  return payString.toLowerCase();
}

/**
 * Create an URL object from the PayString
 * @param payString the complete paystring "prefix$domain.extension"
 *
 * @returns JS `URL` object or `undefined` if not parsable.
 */
export function parsePayStringUrl(payStringUrl: string): URL | undefined {
  const url = new URL(payStringUrl);

  // Invalid URL protocol: "${url.protocol}". PayString URLs must be HTTP/HTTPS.
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Hostname "${url.hostname}" is not a valid hostname. Needs a dot-separated TLD
  if (!url.hostname.includes('.')) return;

  return url;
}
