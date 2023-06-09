import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Account {
  owner: Principal;
  subaccount: [] | [Uint8Array];
}
export interface AccountBalanceArgs {
  account: string;
}
export interface ArchiveInfo {
  canister_id: Principal;
}
export interface ArchiveOptions {
  num_blocks_to_archive: bigint;
  max_transactions_per_response: [] | [bigint];
  trigger_threshold: bigint;
  max_message_size_bytes: [] | [bigint];
  cycles_for_archive_creation: [] | [bigint];
  node_max_memory_size_bytes: [] | [bigint];
  controller_id: Principal;
}
export interface ArchivedBlocksRange {
  callback: [Principal, string];
  start: bigint;
  length: bigint;
}
export interface Archives {
  archives: Array<ArchiveInfo>;
}
export interface BinaryAccountBalanceArgs {
  account: Uint8Array;
}
export interface BlockRange {
  blocks: Array<CandidBlock>;
}
export interface CandidBlock {
  transaction: CandidTransaction;
  timestamp: TimeStamp;
  parent_hash: [] | [Uint8Array];
}
export type CandidOperation =
  | {
      Approve: {
        fee: Tokens;
        from: Uint8Array;
        allowance_e8s: bigint;
        expires_at: [] | [TimeStamp];
        spender: Uint8Array;
      };
    }
  | { Burn: { from: Uint8Array; amount: Tokens } }
  | { Mint: { to: Uint8Array; amount: Tokens } }
  | {
      Transfer: {
        to: Uint8Array;
        fee: Tokens;
        from: Uint8Array;
        amount: Tokens;
      };
    }
  | {
      TransferFrom: {
        to: Uint8Array;
        fee: Tokens;
        from: Uint8Array;
        amount: Tokens;
        spender: Uint8Array;
      };
    };
export interface CandidTransaction {
  memo: bigint;
  icrc1_memo: [] | [Uint8Array];
  operation: [] | [CandidOperation];
  created_at_time: TimeStamp;
}
export interface Decimals {
  decimals: number;
}
export interface Duration {
  secs: bigint;
  nanos: number;
}
export interface GetBlocksArgs {
  start: bigint;
  length: bigint;
}
export type GetBlocksError =
  | {
      BadFirstBlockIndex: {
        requested_index: bigint;
        first_valid_index: bigint;
      };
    }
  | { Other: { error_message: string; error_code: bigint } };
export interface InitArgs {
  send_whitelist: Array<Principal>;
  token_symbol: [] | [string];
  transfer_fee: [] | [Tokens];
  minting_account: string;
  transaction_window: [] | [Duration];
  max_message_size_bytes: [] | [bigint];
  icrc1_minting_account: [] | [Account];
  archive_options: [] | [ArchiveOptions];
  initial_values: Array<[string, Tokens]>;
  token_name: [] | [string];
}
export type LedgerCanisterPayload = { Upgrade: [] | [UpgradeArgs] } | { Init: InitArgs };
export type MetadataValue = { Int: bigint } | { Nat: bigint } | { Blob: Uint8Array } | { Text: string };
export interface Name {
  name: string;
}
export interface QueryBlocksResponse {
  certificate: [] | [Uint8Array];
  blocks: Array<CandidBlock>;
  chain_length: bigint;
  first_block_index: bigint;
  archived_blocks: Array<ArchivedBlocksRange>;
}
export type Result = { Ok: bigint } | { Err: TransferError };
export type Result_1 = { Ok: bigint } | { Err: TransferError_1 };
export interface SendArgs {
  to: string;
  fee: Tokens;
  memo: bigint;
  from_subaccount: [] | [Uint8Array];
  created_at_time: [] | [TimeStamp];
  amount: Tokens;
}
export interface StandardRecord {
  url: string;
  name: string;
}
export interface Symbol {
  symbol: string;
}
export interface TimeStamp {
  timestamp_nanos: bigint;
}
export interface Tokens {
  e8s: bigint;
}
export interface TransferArg {
  to: Account;
  fee: [] | [bigint];
  memo: [] | [Uint8Array];
  from_subaccount: [] | [Uint8Array];
  created_at_time: [] | [bigint];
  amount: bigint;
}
export interface TransferArgs {
  to: Uint8Array;
  fee: Tokens;
  memo: bigint;
  from_subaccount: [] | [Uint8Array];
  created_at_time: [] | [TimeStamp];
  amount: Tokens;
}
export type TransferError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { BadBurn: { min_burn_amount: bigint } }
  | { Duplicate: { duplicate_of: bigint } }
  | { BadFee: { expected_fee: bigint } }
  | { CreatedInFuture: { ledger_time: bigint } }
  | { TooOld: null }
  | { InsufficientFunds: { balance: bigint } };
export type TransferError_1 =
  | {
      TxTooOld: { allowed_window_nanos: bigint };
    }
  | { BadFee: { expected_fee: Tokens } }
  | { TxDuplicate: { duplicate_of: bigint } }
  | { TxCreatedInFuture: null }
  | { InsufficientFunds: { balance: Tokens } };
export interface TransferFee {
  transfer_fee: Tokens;
}
export interface UpgradeArgs {
  maximum_number_of_accounts: [] | [bigint];
  icrc1_minting_account: [] | [Account];
}
export interface _SERVICE {
  account_balance: ActorMethod<[BinaryAccountBalanceArgs], Tokens>;
  account_balance_dfx: ActorMethod<[AccountBalanceArgs], Tokens>;
  archives: ActorMethod<[], Archives>;
  decimals: ActorMethod<[], Decimals>;
  icrc1_balance_of: ActorMethod<[Account], bigint>;
  icrc1_decimals: ActorMethod<[], number>;
  icrc1_fee: ActorMethod<[], bigint>;
  icrc1_metadata: ActorMethod<[], Array<[string, MetadataValue]>>;
  icrc1_minting_account: ActorMethod<[], [] | [Account]>;
  icrc1_name: ActorMethod<[], string>;
  icrc1_supported_standards: ActorMethod<[], Array<StandardRecord>>;
  icrc1_symbol: ActorMethod<[], string>;
  icrc1_total_supply: ActorMethod<[], bigint>;
  icrc1_transfer: ActorMethod<[TransferArg], Result>;
  name: ActorMethod<[], Name>;
  query_blocks: ActorMethod<[GetBlocksArgs], QueryBlocksResponse>;
  send_dfx: ActorMethod<[SendArgs], bigint>;
  symbol: ActorMethod<[], Symbol>;
  transfer: ActorMethod<[TransferArgs], Result_1>;
  transfer_fee: ActorMethod<[{}], TransferFee>;
}

export const idlFactory = ({ IDL }: any) => {
  const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const UpgradeArgs = IDL.Record({
    maximum_number_of_accounts: IDL.Opt(IDL.Nat64),
    icrc1_minting_account: IDL.Opt(Account),
  });
  const Tokens = IDL.Record({ e8s: IDL.Nat64 });
  const Duration = IDL.Record({ secs: IDL.Nat64, nanos: IDL.Nat32 });
  const ArchiveOptions = IDL.Record({
    num_blocks_to_archive: IDL.Nat64,
    max_transactions_per_response: IDL.Opt(IDL.Nat64),
    trigger_threshold: IDL.Nat64,
    max_message_size_bytes: IDL.Opt(IDL.Nat64),
    cycles_for_archive_creation: IDL.Opt(IDL.Nat64),
    node_max_memory_size_bytes: IDL.Opt(IDL.Nat64),
    controller_id: IDL.Principal,
  });
  const InitArgs = IDL.Record({
    send_whitelist: IDL.Vec(IDL.Principal),
    token_symbol: IDL.Opt(IDL.Text),
    transfer_fee: IDL.Opt(Tokens),
    minting_account: IDL.Text,
    transaction_window: IDL.Opt(Duration),
    max_message_size_bytes: IDL.Opt(IDL.Nat64),
    icrc1_minting_account: IDL.Opt(Account),
    archive_options: IDL.Opt(ArchiveOptions),
    initial_values: IDL.Vec(IDL.Tuple(IDL.Text, Tokens)),
    token_name: IDL.Opt(IDL.Text),
  });
  const LedgerCanisterPayload = IDL.Variant({
    Upgrade: IDL.Opt(UpgradeArgs),
    Init: InitArgs,
  });
  const BinaryAccountBalanceArgs = IDL.Record({
    account: IDL.Vec(IDL.Nat8),
  });
  const AccountBalanceArgs = IDL.Record({ account: IDL.Text });
  const ArchiveInfo = IDL.Record({ canister_id: IDL.Principal });
  const Archives = IDL.Record({ archives: IDL.Vec(ArchiveInfo) });
  const Decimals = IDL.Record({ decimals: IDL.Nat32 });
  const MetadataValue = IDL.Variant({
    Int: IDL.Int,
    Nat: IDL.Nat,
    Blob: IDL.Vec(IDL.Nat8),
    Text: IDL.Text,
  });
  const StandardRecord = IDL.Record({ url: IDL.Text, name: IDL.Text });
  const TransferArg = IDL.Record({
    to: Account,
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat,
  });
  const TransferError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat,
    }),
    TemporarilyUnavailable: IDL.Null,
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
  });
  const Result = IDL.Variant({ Ok: IDL.Nat, Err: TransferError });
  const Name = IDL.Record({ name: IDL.Text });
  const GetBlocksArgs = IDL.Record({
    start: IDL.Nat64,
    length: IDL.Nat64,
  });
  const TimeStamp = IDL.Record({ timestamp_nanos: IDL.Nat64 });
  const CandidOperation = IDL.Variant({
    Approve: IDL.Record({
      fee: Tokens,
      from: IDL.Vec(IDL.Nat8),
      allowance_e8s: IDL.Int,
      expires_at: IDL.Opt(TimeStamp),
      spender: IDL.Vec(IDL.Nat8),
    }),
    Burn: IDL.Record({ from: IDL.Vec(IDL.Nat8), amount: Tokens }),
    Mint: IDL.Record({ to: IDL.Vec(IDL.Nat8), amount: Tokens }),
    Transfer: IDL.Record({
      to: IDL.Vec(IDL.Nat8),
      fee: Tokens,
      from: IDL.Vec(IDL.Nat8),
      amount: Tokens,
    }),
    TransferFrom: IDL.Record({
      to: IDL.Vec(IDL.Nat8),
      fee: Tokens,
      from: IDL.Vec(IDL.Nat8),
      amount: Tokens,
      spender: IDL.Vec(IDL.Nat8),
    }),
  });
  const CandidTransaction = IDL.Record({
    memo: IDL.Nat64,
    icrc1_memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    operation: IDL.Opt(CandidOperation),
    created_at_time: TimeStamp,
  });
  const CandidBlock = IDL.Record({
    transaction: CandidTransaction,
    timestamp: TimeStamp,
    parent_hash: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const BlockRange = IDL.Record({ blocks: IDL.Vec(CandidBlock) });
  const GetBlocksError = IDL.Variant({
    BadFirstBlockIndex: IDL.Record({
      requested_index: IDL.Nat64,
      first_valid_index: IDL.Nat64,
    }),
    Other: IDL.Record({
      error_message: IDL.Text,
      error_code: IDL.Nat64,
    }),
  });
  const ArchivedBlocksRange = IDL.Record({
    callback: IDL.Func([GetBlocksArgs], [IDL.Variant({ Ok: BlockRange, Err: GetBlocksError })], ['query']),
    start: IDL.Nat64,
    length: IDL.Nat64,
  });
  const QueryBlocksResponse = IDL.Record({
    certificate: IDL.Opt(IDL.Vec(IDL.Nat8)),
    blocks: IDL.Vec(CandidBlock),
    chain_length: IDL.Nat64,
    first_block_index: IDL.Nat64,
    archived_blocks: IDL.Vec(ArchivedBlocksRange),
  });
  const SendArgs = IDL.Record({
    to: IDL.Text,
    fee: Tokens,
    memo: IDL.Nat64,
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(TimeStamp),
    amount: Tokens,
  });
  const Symbol = IDL.Record({ symbol: IDL.Text });
  const TransferArgs = IDL.Record({
    to: IDL.Vec(IDL.Nat8),
    fee: Tokens,
    memo: IDL.Nat64,
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(TimeStamp),
    amount: Tokens,
  });
  const TransferError_1 = IDL.Variant({
    TxTooOld: IDL.Record({ allowed_window_nanos: IDL.Nat64 }),
    BadFee: IDL.Record({ expected_fee: Tokens }),
    TxDuplicate: IDL.Record({ duplicate_of: IDL.Nat64 }),
    TxCreatedInFuture: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: Tokens }),
  });
  const Result_1 = IDL.Variant({ Ok: IDL.Nat64, Err: TransferError_1 });
  const TransferFee = IDL.Record({ transfer_fee: Tokens });
  return IDL.Service({
    account_balance: IDL.Func([BinaryAccountBalanceArgs], [Tokens], ['query']),
    account_balance_dfx: IDL.Func([AccountBalanceArgs], [Tokens], ['query']),
    archives: IDL.Func([], [Archives], ['query']),
    decimals: IDL.Func([], [Decimals], ['query']),
    icrc1_balance_of: IDL.Func([Account], [IDL.Nat], ['query']),
    icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query']),
    icrc1_fee: IDL.Func([], [IDL.Nat], ['query']),
    icrc1_metadata: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, MetadataValue))], ['query']),
    icrc1_minting_account: IDL.Func([], [IDL.Opt(Account)], ['query']),
    icrc1_name: IDL.Func([], [IDL.Text], ['query']),
    icrc1_supported_standards: IDL.Func([], [IDL.Vec(StandardRecord)], ['query']),
    icrc1_symbol: IDL.Func([], [IDL.Text], ['query']),
    icrc1_total_supply: IDL.Func([], [IDL.Nat], ['query']),
    icrc1_transfer: IDL.Func([TransferArg], [Result], []),
    name: IDL.Func([], [Name], ['query']),
    query_blocks: IDL.Func([GetBlocksArgs], [QueryBlocksResponse], ['query']),
    send_dfx: IDL.Func([SendArgs], [IDL.Nat64], []),
    symbol: IDL.Func([], [Symbol], ['query']),
    transfer: IDL.Func([TransferArgs], [Result_1], []),
    transfer_fee: IDL.Func([IDL.Record({})], [TransferFee], ['query']),
  });
};
