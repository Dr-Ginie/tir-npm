import { splitPayString } from './paystring.misc';

export function parsePayString(payString: string): string | undefined {
  const _split = splitPayString(payString);

  if (!_split) return;

  const { prefix: user, domain: host } = _split;

  // A PayString string representation cannot include paths
  if (user.includes('/') || host.includes('/')) return;

  parsePayStringUrl(`https://${host}/${user}`);
  return payString.toLowerCase();
}

export function parsePayStringUrl(payStringUrl: string): URL | undefined {
  const url = new URL(payStringUrl);

  // Invalid URL protocol: "${url.protocol}". PayString URLs must be HTTP/HTTPS.
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // Hostname "${url.hostname}" is not a valid hostname. Needs a dot-separated TLD
  if (!url.hostname.includes('.')) return;

  return url;
}
