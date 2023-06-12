import { getPaystringData } from '../methods/paystring.http';
import { AnonymousIdentity } from '@dfinity/agent';
import { parsePayStringUrl } from '../methods/paystring.parse';

test('get data', async () => {
  expect(1).toBe(1);
  const x = await getPaystringData('remcosss$spaceturtle.app');
  console.log(x);
  // const actor = new PaystringActor(new AnonymousIdentity());
  // const price = await actor.getPaystringPrice();
  // const result = await getPaystringData('remcos$spaceturtle.app', { chain: 'mainnet' });
});
