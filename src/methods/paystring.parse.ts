import { splitPayString } from './paystring.misc';

export function parsePayString(input: string): string {
  const { user, host } = splitPayString(input);

  if (user.includes('/') || host.includes('/')) {
    throw new Error('A PayString string representation cannot include paths.');
  }

  parsePayStringUrl(`https://${host}/${user}`);
  return input.toLowerCase();
}

export function parsePayStringUrl(input: string): URL {
  const url = new URL(input);

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`Invalid URL protocol: "${url.protocol}". PayString URLs must be HTTP/HTTPS.`);
  }

  if (!url.hostname.includes('.')) {
    throw new Error(`Hostname "${url.hostname}" is not a valid hostname. Needs a dot-separated TLD.`);
  }

  return url;
}
