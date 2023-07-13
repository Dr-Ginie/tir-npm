# The identity registry

###### Empowering Seamless Cross-Platform Payments with PayStrings

In the vast expanse of the decentralized galaxy, where the powers of technology converge with the limitless possibilities of finance, emerges The Registry. 🌌✨ With our groundbreaking PayStrings as NFTS, we have forged cosmic bridges, uniting disparate platforms into a harmonious symphony of cross-platform payments. 💫💸

**Learn more here:**
Socials: https://b.ink/the_registery_
Website: https://identityregistry.io

### Methods

Fetch a PayString async

```ts
// the PayString argument supports;
//  - full paystrings (`chris$domain.io`)
//  - PayString suffix ('chris')
// The suffix method will default to the PayString canister
getPayStringAsync(
    payString: string,
    options?: {
        chain?: string;
        environment?: string
    }
): Promise<PaymentInformation | undefined>
```

Fetch a PayString debounced, result gets returned in the callback

```ts
// the PayString argument supports;
//  - full paystrings (`chris$domain.io`)
//  - PayString suffix ('chris')
// The suffix method will default to the PayString canister
getPayStringDebounce(
  callback: (data: PaymentInformation | undefined) => void,
  payString: string,
  debounceTime = minDebounceTime,
): void

```

Parse a PayString, throws an error if not parseable by protocol standards

```ts
parsePayString(payString: string): void

```

Parse a PayString url, throws an error if not parseable by protocol standards

```ts
parsePayStringUrl(payString: string): URL

```

Splits the PayString to return the prefix and domain, throws an error if not parseable by protocol standards

```ts
splitPayString(payString: string): { prefix: string; domain: string }
```

Converts the PayString to an URL

```ts
convertPayStringToUrl(payString: string): URL
```

Converts a PayString URL to a PayString

```ts
convertUrlToPayString(payStringUrl: string): string
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
