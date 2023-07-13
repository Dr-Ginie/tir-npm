import { splitPayString } from './paystring.misc';
import { parsePayString, parsePayStringUrl } from './paystring.parse';

export function convertPayStringToUrl(payString: string): URL {
  payString = parsePayString(payString);

  const { prefix, domain } = splitPayString(payString);

  return parsePayStringUrl(`https://${domain}/${prefix}`);
}

export function convertUrlToPayString(payStringUrl: string): string {
  const domain = parsePayStringUrl(payStringUrl);

  const prefix = domain.pathname.slice(1);
  const payString = `${prefix}$${domain}`;

  return parsePayString(payString);
}
