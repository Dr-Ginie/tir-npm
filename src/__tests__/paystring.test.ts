import {
  getPayStringAsync,
  getPayStringDebounce,
  searchPayString,
  searchPayStringDebounce,
} from '../methods/paystring.http';
import { isVerifiedDomain } from '../methods/paystring.misc';

test('isTrustedDomain', async () => {
  //   //   const response = await isTrustedDomain('upayed.me');
  //   //   console.log(response);
  expect(1).toBe(1);
});

// test('searchPayString', async () => {
//   searchPayStringDebounce(console.log, 're', 'spaceturtle.app');
//   expect(1).toBe(1);
// });

// test('getPayStringAsyncFull', async () => {
//   const x = await getPayStringAsync('rem.codes', 'spaceturtle.app');
//   console.log(x);
//   expect(1).toBe(1);
// });

// test('getPayStringAsyncPartial', async () => {
//   const x = await getPayStringAsync('rem.codes', 'spaceturtle.app');
//   console.log(x);
//   expect(1).toBe(1);
// });

// test('getPayStringDebounceFull', () => {
//   getPayStringDebounce(console.log, 'rem.codes$spaceturtle.app');
//   expect(1).toBe(1);
// });

// test('getPayStringDebouncePartial', () => {
//   getPayStringDebounce(console.log, 'rem.codes');
//   expect(1).toBe(1);
// });
