import DIP20Actor from "./dip20"
import ICRC1Actor from "./icrc1"
import ExtActor from "./ext"
import { SubAccount } from "@dfinity/ledger-icp";
import { Principal } from "@dfinity/principal";

type TokenStandardActor = DIP20Actor | ICRC1Actor | ExtActor;
export interface ITokenService {
  actor: TokenStandardActor;
  decimals: number;
  getDecimals(): number;
  balanceOf(address: string | {
    owner: Principal;
    subaccount: [] | [Uint8Array | number[]];
  }): Promise<number>;
  name(): Promise<string>;
  symbol(): Promise<string>;
  totalSupply(): Promise<number>;
  getFee(): Promise<bigint>;
  getBurnedAmountInDeadWallet(): Promise<number>;
  getBurnedAmmount(): Promise<number>;
  holdPercentage(address: string): Promise<number>;
  getMetadata(): Promise<any>;
  getLogo(): Promise<string>;

  approve(input: {
    'fee': [] | [bigint],
    'memo': [] | [Uint8Array | number[]],
    'from_subaccount': [] | [Uint8Array | number[]],
    'created_at_time': [] | [bigint],
    'amount': bigint,
    'expected_allowance': [] | [bigint],
    'expires_at': [] | [bigint],
    'spender': {
      'owner': Principal,
      'subaccount': [] | [Uint8Array | number[]],
    },
  }): Promise<bigint>

  getFee(): Promise<bigint>; transfer(
    input: {
      to: {
        owner: Principal;
        subaccount: [] | [Uint8Array | number[]];
      },
      amount: bigint,
      fee: [bigint] | [],
      memo: [Uint8Array | number[]] | [],
      from_subaccount: [] | [Uint8Array | number[]],
      created_at_time: [bigint] | []
    }
  ): Promise<bigint>;
}
