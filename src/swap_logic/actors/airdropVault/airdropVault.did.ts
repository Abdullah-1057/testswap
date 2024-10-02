export const idlFactory = ({ IDL }: any) => {
    const Balance__1 = IDL.Nat;
    const TxIndex = IDL.Nat;
    const Balance = IDL.Nat;
    const Timestamp = IDL.Nat64;
    const TransferError = IDL.Variant({
        'GenericError': IDL.Record({
            'message': IDL.Text,
            'error_code': IDL.Nat,
        }),
        'TemporarilyUnavailable': IDL.Null,
        'BadBurn': IDL.Record({ 'min_burn_amount': Balance }),
        'Duplicate': IDL.Record({ 'duplicate_of': TxIndex }),
        'BadFee': IDL.Record({ 'expected_fee': Balance }),
        'CreatedInFuture': IDL.Record({ 'ledger_time': Timestamp }),
        'TooOld': IDL.Null,
        'InsufficientFunds': IDL.Record({ 'balance': Balance }),
    });
    const TransferResult = IDL.Variant({ 'Ok': TxIndex, 'Err': TransferError });
    const Vault = IDL.Service({
        'balance_of': IDL.Func([], [Balance__1], []),
        'claim': IDL.Func([], [TransferResult], []),
    });
    return Vault;
};
export const init = ({ IDL }: any) => {
    return [IDL.Record({ 'tokenId': IDL.Text })];
};
