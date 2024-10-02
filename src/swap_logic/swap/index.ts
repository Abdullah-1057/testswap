import { Actors } from "../actors";

export * as ics from "./ics";
export interface ISwapStrategy {
  executeSwap({
    amount,
    pool,
    zeroForOne, // for future non icp swaps
    slipage,
  }: {
    amount: number;
    pool: string;
    zeroForOne: boolean;
    slipage: number;
  }): Promise<bigint>;
}

export class SwapContext {
  private strategy: ISwapStrategy;
  private actors: Actors;

  constructor({
    strategy,
    actors,
  }: {
    strategy: ISwapStrategy;
    actors: Actors;
  }) {
    this.strategy = strategy;
    this.actors = actors;
  }

  async executeSwap({
    amount,
    pool,
    zeroForOne, // for future non icp swaps
    slipage,
  }: {
    amount: number;
    pool: string;
    zeroForOne: boolean;
    slipage: number;
  }) {
    return await this.strategy.executeSwap({
      amount,
      pool,
      zeroForOne,
      slipage,
    });
  }
}
