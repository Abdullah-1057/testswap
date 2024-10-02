import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export type NatResult = { ok: bigint } | { err: string };
export interface SwapRecordInfo {
  to: string;
  feeAmount: bigint;
  action: TransactionType;
  feeAmountTotal: bigint;
  token0Id: string;
  token1Id: string;
  token0AmountTotal: bigint;
  liquidityTotal: bigint;
  from: string;
  tick: bigint;
  feeTire: bigint;
  recipient: string;
  token0ChangeAmount: bigint;
  token1AmountTotal: bigint;
  liquidityChange: bigint;
  token1Standard: string;
  token0Fee: bigint;
  token1Fee: bigint;
  timestamp: bigint;
  token1ChangeAmount: bigint;
  token0Standard: string;
  price: bigint;
  poolId: string;
}
export type TransactionType =
  | { decreaseLiquidity: null }
  | { claim: null }
  | { swap: null }
  | { addLiquidity: null }
  | { increaseLiquidity: null };
export default interface _SERVICE {
  addClient: ActorMethod<[Principal], undefined>;
  baseLastStorage: ActorMethod<[], string>;
  baseStorage: ActorMethod<[], Array<string>>;
  batchPush: ActorMethod<[Array<SwapRecordInfo>], undefined>;
  clean: ActorMethod<[], undefined>;
  cycleAvailable: ActorMethod<[], NatResult>;
  cycleBalance: ActorMethod<[], NatResult>;
  getAllowTokens: ActorMethod<[], Array<string>>;
  getClients: ActorMethod<[], Array<Principal>>;
  getControllers: ActorMethod<[], Array<Principal>>;
  getDataQueue: ActorMethod<[], Array<SwapRecordInfo>>;
  getEnableSync: ActorMethod<[], boolean>;
  getPoolLastPrice: ActorMethod<[Principal], number>;
  getSyncError: ActorMethod<[], string>;
  getSyncLock: ActorMethod<[], boolean>;
  getSyncOffset: ActorMethod<[], bigint>;
  getSyncStatus: ActorMethod<[], boolean>;
  priceCanister: ActorMethod<[], Array<Principal>>;
  push: ActorMethod<[SwapRecordInfo], undefined>;
  removeTokenMetadata: ActorMethod<[Principal], undefined>;
  setEnableSync: ActorMethod<[boolean], boolean>;
  setPriceCanister: ActorMethod<[Principal], undefined>;
  syncOldDataToLast: ActorMethod<[bigint], boolean>;
  updateTokenDecimal: ActorMethod<[Principal, bigint], undefined>;
}
