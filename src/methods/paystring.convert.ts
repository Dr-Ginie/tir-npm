import { splitPayString } from './paystring.misc';
import { parsePayString, parsePayStringUrl } from './paystring.parse';

export function convertPayStringToUrl(payString: string): URL | undefined {
  const _parsed = parsePayString(payString);
  if (!_parsed) return;

  const _split = splitPayString(_parsed);
  if (!_split) return;

  const { prefix, domain } = _split;
  return parsePayStringUrl(`https://${domain}/${prefix}`);
}

export function convertUrlToPayString(payStringUrl: string): string | undefined {
  const _parsted = parsePayStringUrl(payStringUrl);
  if (!_parsted) return;

  const prefix = _parsted.pathname.slice(1);
  const payString = `${prefix}$${_parsted}`;

  return parsePayString(payString);
}
