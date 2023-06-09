import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Address {
  paymentNetwork: string;
  environment: [] | [string];
  addressDetails: AddressDetails;
  addressDetailsType: AddressDetailsType;
}
export type AddressDetails =
  | { FiatAddressDetails: FiatAddressDetails }
  | { CryptoAddressDetails: CryptoAddressDetails };
export type AddressDetailsType = { FiatAddress: null } | { CryptoAddress: null };
export interface AddressRequest {
  addresses: Array<Address>;
  payId: string;
}
export interface CryptoAddressDetails {
  tag: [] | [string];
  address: string;
}
export interface FiatAddressDetails {
  routingNumber: [] | [string];
  accountNumber: string;
}
export type HeaderField = [string, string];
export interface HttpRequest {
  url: string;
  method: string;
  body: Uint8Array;
  headers: Array<HeaderField>;
}
export interface HttpResponse {
  body: Uint8Array;
  headers: Array<HeaderField>;
  status_code: number;
}
export interface _SERVICE {
  create: ActorMethod<[AddressRequest], undefined>;
  delete: ActorMethod<[string], undefined>;
  fetchPayIds: ActorMethod<[], Array<string>>;
  getPayIdCount: ActorMethod<[], number>;
  getPrice: ActorMethod<[string], bigint>;
  http_request: ActorMethod<[HttpRequest], HttpResponse>;
  payStringExist: ActorMethod<[string], boolean>;
  setPrice: ActorMethod<[number, bigint], undefined>;
  update: ActorMethod<[string, AddressRequest], undefined>;
}

export const idlFactory = ({ IDL }: any) => {
  const FiatAddressDetails = IDL.Record({
    routingNumber: IDL.Opt(IDL.Text),
    accountNumber: IDL.Text,
  });
  const CryptoAddressDetails = IDL.Record({
    tag: IDL.Opt(IDL.Text),
    address: IDL.Text,
  });
  const AddressDetails = IDL.Variant({
    FiatAddressDetails: FiatAddressDetails,
    CryptoAddressDetails: CryptoAddressDetails,
  });
  const AddressDetailsType = IDL.Variant({
    FiatAddress: IDL.Null,
    CryptoAddress: IDL.Null,
  });
  const Address = IDL.Record({
    paymentNetwork: IDL.Text,
    environment: IDL.Opt(IDL.Text),
    addressDetails: AddressDetails,
    addressDetailsType: AddressDetailsType,
  });
  const AddressRequest = IDL.Record({
    addresses: IDL.Vec(Address),
    payId: IDL.Text,
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
  });
  const HttpResponse = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    status_code: IDL.Nat16,
  });
  return IDL.Service({
    create: IDL.Func([AddressRequest], [], []),
    delete: IDL.Func([IDL.Text], [], []),
    fetchPayIds: IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    getPayIdCount: IDL.Func([], [IDL.Nat32], ['query']),
    getPrice: IDL.Func([IDL.Text], [IDL.Nat], ['query']),
    http_request: IDL.Func([HttpRequest], [HttpResponse], ['query']),
    payStringExist: IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    setPrice: IDL.Func([IDL.Nat32, IDL.Nat], [], []),
    update: IDL.Func([IDL.Text, AddressRequest], [], []),
  });
};
