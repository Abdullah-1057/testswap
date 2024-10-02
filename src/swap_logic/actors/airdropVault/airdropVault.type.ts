import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Balance = bigint;
export type Balance__1 = bigint;
export type Timestamp = bigint;
export type TransferError = {
    'GenericError': { 'message': string, 'error_code': bigint }
} |
{ 'TemporarilyUnavailable': null } |
{ 'BadBurn': { 'min_burn_amount': Balance } } |
{ 'Duplicate': { 'duplicate_of': TxIndex } } |
{ 'BadFee': { 'expected_fee': Balance } } |
{ 'CreatedInFuture': { 'ledger_time': Timestamp } } |
{ 'TooOld': null } |
{ 'InsufficientFunds': { 'balance': Balance } };
export type TransferResult = { 'Ok': TxIndex } |
{ 'Err': TransferError };
export type TxIndex = bigint;
export interface Vault {
    'balance_of': ActorMethod<[], Balance__1>,
    'claim': ActorMethod<[], TransferResult>,
}
export interface _SERVICE extends Vault { }
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
