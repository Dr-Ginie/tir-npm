import PaystringActor from './canister/paystring/paystring.actor';
import { getPaystringData, getPaystringDataDebounced } from './methods/paystring.http';

export default {
  getPaystringData,
  getPaystringDataDebounced,
  PaystringActor,
};
