export const idlFactory = ({ IDL }: any) => {
  const TransactionType = IDL.Variant({
    decreaseLiquidity: IDL.Null,
    claim: IDL.Null,
    swap: IDL.Null,
    addLiquidity: IDL.Null,
    increaseLiquidity: IDL.Null,
  });
  const SwapRecordInfo = IDL.Record({
    to: IDL.Text,
    feeAmount: IDL.Int,
    action: TransactionType,
    feeAmountTotal: IDL.Int,
    token0Id: IDL.Text,
    token1Id: IDL.Text,
    token0AmountTotal: IDL.Nat,
    liquidityTotal: IDL.Nat,
    from: IDL.Text,
    tick: IDL.Int,
    feeTire: IDL.Nat,
    recipient: IDL.Text,
    token0ChangeAmount: IDL.Nat,
    token1AmountTotal: IDL.Nat,
    liquidityChange: IDL.Nat,
    token1Standard: IDL.Text,
    token0Fee: IDL.Nat,
    token1Fee: IDL.Nat,
    timestamp: IDL.Int,
    token1ChangeAmount: IDL.Nat,
    token0Standard: IDL.Text,
    price: IDL.Nat,
    poolId: IDL.Text,
  });
  const NatResult = IDL.Variant({ ok: IDL.Nat, err: IDL.Text });
  return IDL.Service({
    addClient: IDL.Func([IDL.Principal], [], []),
    baseLastStorage: IDL.Func([], [IDL.Text], ["query"]),
    baseStorage: IDL.Func([], [IDL.Vec(IDL.Text)], ["query"]),
    batchPush: IDL.Func([IDL.Vec(SwapRecordInfo)], [], []),
    clean: IDL.Func([], [], []),
    cycleAvailable: IDL.Func([], [NatResult], []),
    cycleBalance: IDL.Func([], [NatResult], ["query"]),
    getAllowTokens: IDL.Func([], [IDL.Vec(IDL.Text)], []),
    getClients: IDL.Func([], [IDL.Vec(IDL.Principal)], ["query"]),
    getControllers: IDL.Func([], [IDL.Vec(IDL.Principal)], ["query"]),
    getDataQueue: IDL.Func([], [IDL.Vec(SwapRecordInfo)], ["query"]),
    getEnableSync: IDL.Func([], [IDL.Bool], ["query"]),
    getPoolLastPrice: IDL.Func([IDL.Principal], [IDL.Float64], ["query"]),
    getSyncError: IDL.Func([], [IDL.Text], ["query"]),
    getSyncLock: IDL.Func([], [IDL.Bool], ["query"]),
    getSyncOffset: IDL.Func([], [IDL.Nat], ["query"]),
    getSyncStatus: IDL.Func([], [IDL.Bool], ["query"]),
    priceCanister: IDL.Func([], [IDL.Vec(IDL.Principal)], []),
    push: IDL.Func([SwapRecordInfo], [], []),
    removeTokenMetadata: IDL.Func([IDL.Principal], [], []),
    setEnableSync: IDL.Func([IDL.Bool], [IDL.Bool], []),
    setPriceCanister: IDL.Func([IDL.Principal], [], []),
    syncOldDataToLast: IDL.Func([IDL.Nat], [IDL.Bool], []),
    updateTokenDecimal: IDL.Func([IDL.Principal, IDL.Nat], [], []),
  });
};
export const init = ({ IDL }: any) => {
  return [];
};
