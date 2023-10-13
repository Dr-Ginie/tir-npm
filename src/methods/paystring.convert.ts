import { splitPayString } from './paystring.misc';
import { parsePayString, parsePayStringUrl } from './paystring.parse';

/**
 * Create an URL object from the PayString
 * @param payString the complete paystring "prefix$domain"
 *
 * @returns `URL` or undefined if not parsable.
 */
export function convertPayStringToUrl(payString: string): URL | undefined {
  const _parsed = parsePayString(payString);
  if (!_parsed) return;

  const _split = splitPayString(_parsed);
  if (!_split) return;

  const { prefix, domain } = _split;
  return parsePayStringUrl(`https://${domain}/${prefix}`);
}

/**
 * Convert a PayString URL to a PayString
 * @param payStringUrl the url of a paystring "https://domain/prefix"
 * @returns paystring as `string` or `undefined` if not parsable.
 */
export function convertUrlToPayString(payStringUrl: string): string | undefined {
  const _parsted = parsePayStringUrl(payStringUrl);
  if (!_parsted) return;

  const prefix = _parsted.pathname.slice(1);
  const payString = `${prefix}$${_parsted}`;

  return parsePayString(payString);
}
