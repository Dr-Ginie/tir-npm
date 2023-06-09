import { splitPayString } from './paystring.misc';
import { parsePayString, parsePayStringUrl } from './paystring.parse';

export function convertPayStringToUrl(potentialPayString: string): URL {
  const payString = parsePayString(potentialPayString);

  const { user, host } = splitPayString(payString);

  return parsePayStringUrl(`https://${host}/${user}`);
}

export function convertUrlToPayString(potentialPayStringUrl: string): string {
  const payStringUrl = parsePayStringUrl(potentialPayStringUrl);

  const user = payStringUrl.pathname.slice(1);
  const payString = `${user}$${payStringUrl}`;

  return parsePayString(payString);
}
