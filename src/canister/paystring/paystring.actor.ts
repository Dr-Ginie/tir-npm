import { Actor, HttpAgent, Identity } from '@dfinity/agent';
import { Address, _SERVICE, idlFactory } from './paystring.declaration';
import { parsePayString } from '../../methods/paystring.parse';
import IcpLedgerActor from '../icp_ledger/icp_ledger.actor';
import { splitPayString } from '../../methods/paystring.misc';
import WicpLedgerActor from '../wicp_ledger/wicp_ledger.actor';

export const paystringCanisterId = 'qbu4y-iaaaa-aaaan-qdvda-cai';
export const mainnetHost = 'https://icp0.io';

export default class PaystringActor {
  actor: _SERVICE;
  identity: Identity | Promise<Identity>;
  host: string;

  constructor(identity: Identity | Promise<Identity>, host?: string) {
    this.host = host ? host : mainnetHost;
    this.actor = this.createActor(identity, this.host);
    this.identity = identity;
  }

  private createActor(identity: Identity | Promise<Identity>, host?: string) {
    const agent = new HttpAgent({ host, identity });
    return Actor.createActor(idlFactory, { agent, canisterId: paystringCanisterId }) as _SERVICE;
  }

  async getPriceByPaystring(paystring: string) {
    const payId = parsePayString(paystring);
    const { user } = splitPayString(payId);
    return await this.actor.getPrice(user);
  }

  async payStringExist(paystring: string) {
    const payId = parsePayString(paystring);
    const { user } = splitPayString(payId);
    return await this.actor.payStringExist(user);
  }

  async create(paystring: string, addresses: Address[]) {
    try {
      const payId = parsePayString(paystring);
      const { user } = splitPayString(payId);
      const exists = await this.actor.payStringExist(user);
      if (exists) {
        Promise.reject('Paystring already exists');
      } else {
        const icpActor = new IcpLedgerActor(this.identity, this.host);
        const wicpActor = new WicpLedgerActor(this.identity, this.host);

        const paystringPrice = await this.actor.getPrice(user);
        const blockheight = await icpActor.transfer(paystringPrice);

        if (blockheight) {
          const mintResponse = await wicpActor.mint(blockheight);

          if (mintResponse) {
            await wicpActor.approve(paystringPrice);
            return await this.actor.create({ payId, addresses });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchPayIds() {
    return await this.actor.fetchPayIds();
  }
}
