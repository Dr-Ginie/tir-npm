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

export const payStringCanisterId = 'qbu4y-iaaaa-aaaan-qdvda-cai';
export const payStringDomain = `${payStringCanisterId}.raw.icp0.io`;
export const payStringCanisterUrl = `https://${payStringDomain}`;
export const defaultPayStringDomain = 'upayed.me';
