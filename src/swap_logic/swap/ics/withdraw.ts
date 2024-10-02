import { Principal } from "@dfinity/principal";
import { TokenStandard } from "../../token/tokenAdapter";
import { Actors } from "../../actors";
import { TokenService } from "../../token";
import { IcsPoolSwapService } from "../../ics-swap";

export const withdrawFromPool = async ({
  principal,
  token0,
  token0Standard,
  token1,
  token1Standard,
  pool,
  zeroForOne,
  withdraw_amount,
  actors,
}: {
  principal: Principal;
  token0: string;
  token0Standard: TokenStandard;
  token1: string;
  token1Standard: TokenStandard;
  pool: string;
  zeroForOne: boolean;
  withdraw_amount: number;
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

  const unusedBalanceBefore = await icsPoolSwapService.getUserUnusedBalance(
    principal
  );

  let amountStr;
  if (withdraw_amount == 0) {
    amountStr = zeroForOne
      ? unusedBalanceBefore.balance0.toString()
      : unusedBalanceBefore.balance1.toString();
  } else amountStr = withdraw_amount.toString();

  const withdrawResult = await icsPoolSwapService.withdraw({
    fee: zeroForOne ? BigInt(token0Fee) : BigInt(token1Fee),
    amount: zeroForOne ? BigInt(amountStr) : BigInt(amountStr),
    token: zeroForOne ? token0 : token1,
  });
  console.log("finish withdraw", withdrawResult);

  return withdrawResult;
};

export type HandleWithdraw = typeof withdrawFromPool;