import { Principal } from "@dfinity/principal";
import { TokenService } from "../../token";
import { IcsPoolSwapService } from "../../ics-swap";
import { Actors } from "../../actors";
import { TokenStandard } from "../../token/tokenAdapter";

export const depositToPool = async ({
  token0,
  token0Standard,
  token1,
  token1Standard,
  pool,
  zeroForOne,
  amount,
  actors,
}: {
  token0: string;
  token0Standard: TokenStandard;
  token1: string;
  token1Standard: TokenStandard;
  pool: string;
  zeroForOne: boolean;
  amount: number;
  actors: Actors;
}) => {
  const tokenService = TokenService.getInstance(actors);
  const icsPoolSwapService = IcsPoolSwapService.getInstance(pool, actors);

  const token0Fee = await tokenService.getFee({
    canisterId: token0,
    tokenStandard: token0Standard,
  });

  const token1Fee = await tokenService.getFee({
    canisterId: token1,
    tokenStandard: token1Standard,
  });

  // approve if not ICRC 1 to pool
  if (zeroForOne && token0Standard !== "ICRC1") {
    await tokenService.approve({
      memo: [],
      from_subaccount: [],
      created_at_time: [],
      expected_allowance: [],
      expires_at: [],
      amount: BigInt(Math.floor(Number(amount) + Number(token0Fee))),
      fee: [BigInt(token0Fee)],
      spender: {
        owner: Principal.fromText(pool),
        subaccount: [],
      },
      canisterId: token0,
    });
  } else if (!zeroForOne && token1Standard !== "ICRC1") {
    await tokenService.approve({
      memo: [],
      from_subaccount: [],
      created_at_time: [],
      expected_allowance: [],
      expires_at: [],
      amount: BigInt(amount) + BigInt(token1Fee),
      fee: [BigInt(token1Fee)],
      spender: {
        owner: Principal.fromText(pool),
        subaccount: [],
      },
      canisterId: token1,
    });
  }

  const depositResult = await icsPoolSwapService.depositFrom({
    fee: zeroForOne ? BigInt(token0Fee) : BigInt(token1Fee),
    amount: BigInt(amount),
    token: zeroForOne ? token0 : token1,
  });
  console.log("finish deposit", depositResult);
};

export type HandleDeposit = typeof depositToPool;