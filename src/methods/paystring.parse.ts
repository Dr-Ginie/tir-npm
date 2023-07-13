import { splitPayString } from './paystring.misc';

export function parsePayString(payString: string): string {
  const { prefix: user, domain: host } = splitPayString(payString);

  if (user.includes('/') || host.includes('/')) {
    throw new Error('A PayString string representation cannot include paths.');
  }

  parsePayStringUrl(`https://${host}/${user}`);
  return payString.toLowerCase();
}

export function parsePayStringUrl(payStringUrl: string): URL {
  const url = new URL(payStringUrl);

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`Invalid URL protocol: "${url.protocol}". PayString URLs must be HTTP/HTTPS.`);
  }

  if (!url.hostname.includes('.')) {
    throw new Error(`Hostname "${url.hostname}" is not a valid hostname. Needs a dot-separated TLD.`);
  }

  return url;
}
