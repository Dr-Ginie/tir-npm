export function splitPayString(payString: string): { prefix: string; domain: string } | undefined {
  const lastDollarIndex = payString.lastIndexOf('$');
  const prefix = payString.slice(0, lastDollarIndex);
  const domain = payString.slice(lastDollarIndex + 1);

  // A PayString must have a user and a host, divided by a $ (e.g. alice$example.com)
  if (lastDollarIndex === -1 || prefix.length === 0 || domain.length === 0) return;

  return { prefix, domain };
}

export function isValidPrefix(prefix: string): boolean {
  const urlSafePattern = /^[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]*$/;
  if (!urlSafePattern.test(prefix)) {
    return false;
  }

  return true;
}
