export function splitPayString(payString: string): { user: string; host: string } {
  const lastDollarIndex = payString.lastIndexOf('$');
  const user = payString.slice(0, lastDollarIndex);
  const host = payString.slice(lastDollarIndex + 1);

  if (lastDollarIndex === -1 || user.length === 0 || host.length === 0) {
    throw new Error('A PayString must have a user and a host, divided by a $ (e.g. alice$example.com).');
  }

  return { user, host };
}
