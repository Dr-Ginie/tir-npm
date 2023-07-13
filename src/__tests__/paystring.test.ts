import { getPayStringAsync, getPayStringDebounce } from '../methods/paystring.http';

test('getPayStringAsync', async () => {
  const x = await getPayStringAsync('rem.codes$spaceturtle.app');
  expect(1).toBe(1);
});

test('getPayStringAsync', async () => {
  const x = await getPayStringAsync('rem.codes');
  expect(1).toBe(1);
});

test('getPayStringDebounce', () => {
  const x = getPayStringDebounce(() => {}, 'rem.codes$spaceturtle.app');
  expect(1).toBe(1);
});

test('getPayStringDebounce', () => {
  const x = getPayStringDebounce(() => {}, 'rem.codes');
  expect(1).toBe(1);
});
