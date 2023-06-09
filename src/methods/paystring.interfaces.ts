export interface PaymentInformation {
  addresses: Address[];
  payId?: string;
  memo?: string;
}

export enum AddressDetailsType {
  CryptoAddress = 'CryptoAddressDetails',
  FiatAddress = 'FiatAddressDetails',
}

export interface CryptoAddressDetails {
  address: string;
  tag?: string;
}

export interface FiatAddressDetails {
  accountNumber: string;
  routingNumber?: string;
}

export interface Address {
  paymentNetwork: string;
  environment?: string;
  addressDetailsType: AddressDetailsType;
  addressDetails: CryptoAddressDetails | FiatAddressDetails;
}
