import { Actors } from "../../actors";
import { IcsPoolSwapService } from "../../ics-swap";

export const swap = async ({
  amount,
  pool,
  zeroForOne,
  slipage,
  actors,
}: {
  amount: number;
  pool: string;
  zeroForOne: boolean;
  slipage: number;
  actors: Actors;
}) => {
  try {
    const icsPoolSwapService = IcsPoolSwapService.getInstance(pool, actors);
    const amountStr = amount.toString();
    const quote = await icsPoolSwapService.getQuote({
      amountIn: amountStr,
      zeroForOne: zeroForOne,
      amountOutMinimum: slipage.toString(),
    });
    const tokenSwapped = await icsPoolSwapService.swap({
      amountIn: amountStr,
      zeroForOne: zeroForOne,
      amountOutMinimum: quote.toString(),
    });

    return tokenSwapped;
  } catch (error) {
    console.log("error at swap method", error);
    throw error;
  }
};

export type HandleSwap = typeof swap;