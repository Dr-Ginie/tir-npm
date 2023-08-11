import { getPayStringAsync, getPayStringDebounce } from '../methods/paystring.http';

test('getPayStringAsyncFull', async () => {
  const x = await getPayStringAsync('rem.codes', 'spaceturtle.app');
  console.log(x);
  expect(1).toBe(1);
});

test('getPayStringAsyncPartial', async () => {
  const x = await getPayStringAsync('rem.codes', 'spaceturtle.app');
  console.log(x);
  expect(1).toBe(1);
});

// test('getPayStringDebounceFull', () => {
//   getPayStringDebounce(console.log, 'rem.codes$spaceturtle.app');
//   expect(1).toBe(1);
// });

// test('getPayStringDebouncePartial', () => {
//   getPayStringDebounce(console.log, 'rem.codes');
//   expect(1).toBe(1);
// });
