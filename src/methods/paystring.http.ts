import axios from 'axios';
import { convertPayStringToUrl } from './paystring.convert';
import { PaymentInformation } from './paystring.interfaces';

export async function getPaystringData(paystring: string, options?: { chain?: string; environment?: string }) {
  const url = convertPayStringToUrl(paystring).toString();

  const acceptChain = options?.chain ? options.chain : 'payid';
  const acceptEnvironment = options?.environment ? `-${options.environment}` : '';

  const result = await axios.get<PaymentInformation>(url, {
    headers: {
      contentType: 'application/json',
      Accept: `application/${acceptChain}${acceptEnvironment}+json`,
      'PayID-Version': '1.0',
    },
  });

  return result.data;
}
