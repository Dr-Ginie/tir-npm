import { Actor, HttpAgent, Identity } from '@dfinity/agent';
import { _SERVICE, idlFactory } from './wicp_ledger.declaration';
import { unwrapResult } from '../helpers/canister.helpers';
import { Principal } from '@dfinity/principal';
import { paystringCanisterId } from '../paystring/paystring.actor';

export const wicpCanisterid = 'utozz-siaaa-aaaam-qaaxq-cai';
export const mainnetHost = 'https://icp0.io';

export default class WicpLedgerActor {
  actor: _SERVICE;

  constructor(identity: Identity | Promise<Identity>, host?: string) {
    this.actor = this.createActor(identity, host ? host : mainnetHost);
  }

  private createActor(identity: Identity | Promise<Identity>, host?: string) {
    const agent = new HttpAgent({ host, identity });
    return Actor.createActor(idlFactory, { agent, canisterId: wicpCanisterid }) as _SERVICE;
  }

  async mint(blockheight: bigint) {
    try {
      const result = await this.actor.mint([], blockheight);
      return await unwrapResult(result);
    } catch (error) {
      console.log(error);
    }
  }

  async approve(amount: bigint) {
    try {
      const result = await this.actor.approve(Principal.fromText(paystringCanisterId), amount);
      return await unwrapResult(result);
    } catch (error) {
      console.log(error);
    }
  }
}
