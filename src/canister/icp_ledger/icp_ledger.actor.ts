import { Actor, HttpAgent, Identity } from '@dfinity/agent';
import { Tokens, TransferArg, _SERVICE, idlFactory } from './icp_ledger.declaration';
import { unwrapResult } from '../helpers/canister.helpers';
import { Principal } from '@dfinity/principal';
import { wicpCanisterId } from '../wicp/wicp_ledger.actor';

export const icpCanisterid = 'ryjl3-tyaaa-aaaaa-aaaba-cai';
export const mainnetHost = 'https://icp0.io';

export default class IcpLedgerActor {
  actor: _SERVICE;

  constructor(identity: Identity | Promise<Identity>, host?: string) {
    this.actor = this.createActor(identity, host ? host : mainnetHost);
  }

  private createActor(identity: Identity | Promise<Identity>, host?: string) {
    const agent = new HttpAgent({ host, identity });
    return Actor.createActor(idlFactory, { agent, canisterId: icpCanisterid }) as _SERVICE;
  }

  async transfer(amount: bigint) {
    try {
      const transferResult = await this.actor.icrc1_transfer({
        amount,
        created_at_time: [],
        fee: [BigInt(10000)],
        from_subaccount: [],
        memo: [],
        to: {
          owner: Principal.fromText(wicpCanisterId),
          subaccount: [],
        },
      });

      return await unwrapResult(transferResult);
    } catch (error) {
      console.log(error);
    }
  }
}
