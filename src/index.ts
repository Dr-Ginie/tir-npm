export {
  Address,
  PaymentInformation,
  AddressDetailsType,
  CryptoAddressDetails,
  FiatAddressDetails,
} from './methods/paystring.interfaces';
export { getPayStringAsync, getPayStringDebounce, Options } from './methods/paystring.http';
export { parsePayString, parsePayStringUrl } from './methods/paystring.parse';
export { splitPayString, isValidPrefix } from './methods/paystring.misc';
export { convertPayStringToUrl, convertUrlToPayString } from './methods/paystring.convert';

export const canisterId = 'qbu4y-iaaaa-aaaan-qdvda-cai';
export const domain = `${canisterId}.raw.icp0.io`;
export const canisterUrl = `https://${domain}`;
export const url = 'https://theregistry.app';
export const payDomain = 'pay.theregistry.app';
