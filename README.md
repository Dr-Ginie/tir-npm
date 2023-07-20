# The identity registry

###### Empowering Seamless Cross-Platform Payments with PayStrings

In the vast expanse of the decentralized galaxy, where the powers of technology converge with the limitless possibilities of finance, emerges The Registry. 🌌✨ With our groundbreaking PayStrings as NFTS, we have forged cosmic bridges, uniting disparate platforms into a harmonious symphony of cross-platform payments. 💫💸

**Learn more here:**
Socials: https://b.ink/the_registery_
Website: https://identityregistry.io

### Methods

Fetch a PayString async

```ts
// the PayString - ex; chris$identity-registry-redirected-domain.io
// options: see options interface
async function getPayStringAsync(payString: string, options?: Options): Promise<PaymentInformation | undefined>;
```

Fetch a PayString debounced, result gets returned in the callback

```ts
// callback returns data with a delay
// the PayString - ex; chris$identity-registry-redirected-domain.io
// options: see options interface
// debounce time - set custom time for debounced response (defaults to 300ms)
function getPayStringDebounce(
  callback: (data: PaymentInformation | undefined) => void,
  payString: string,
  options?: Options,
  debounceTime = minDebounceTime,
): void;
```

Parse a PayString, return undefined if not parseable by protocol standards

```ts
function parsePayString(payString: string): string | undefined;
```

Parse a PayString url, return undefined if not parseable by protocol standards

```ts
function parsePayStringUrl(payString: string): URL | undefined;
```

Splits the PayString to return the prefix and domain, return undefined if not parseable by protocol standards

```ts
function splitPayString(payString: string): { prefix: string; domain: string } | undefined;
```

Converts the PayString to an URL, return undefined if not parseable by protocol standards

```ts
function convertPayStringToUrl(payString: string): URL | undefined;
```

function Converts a PayString URL to a PayString, return undefined if not parseable by protocol standards

```ts
convertUrlToPayString(payStringUrl: string): string | undefined
```

### Interfaces

```ts
interface PaymentInformation {
  addresses: Address[];
  payId?: string;
  memo?: string;
}
```

```ts
enum AddressDetailsType {
  CryptoAddress = 'CryptoAddressDetails',
  FiatAddress = 'FiatAddressDetails',
}
```

```ts
interface CryptoAddressDetails {
  address: string;
  tag?: string;
}
```

```ts
interface FiatAddressDetails {
  accountNumber: string;
  routingNumber?: string;
}
```

```ts
interface Address {
  paymentNetwork: string;
  environment?: string;
  addressDetailsType: AddressDetailsType;
  addressDetails: CryptoAddressDetails | FiatAddressDetails;
}
```

```ts
// - chain: ex; icp
// - network: ex; mainnet
// - version: ex; 1.0 (paystring version)
interface Options {
  chain?: string;
  environment?: string;
  version?: string;
}
```
