import { Actors } from "../actors";
import type IPriceHistoryActor from "./interface";

let instance: PriceHistoryService | undefined;

export class PriceHistoryService {
  private actor: IPriceHistoryActor;

  constructor({ actor }: { actor: IPriceHistoryActor }) {
    this.actor = actor;
  }

  public async getPriceHistory({
    canisterId,
    start,
    range,
    length,
  }: {
    canisterId: string;
    start: bigint;
    range: bigint;
    length: bigint;
  }) {
    return await this.actor.getTokenPricesData(
      canisterId,
      start,
      range,
      length,
    );
  }

  public async getToken({ canisterId }: { canisterId: string }) {
    return await this.actor.getToken(canisterId);
  }

  public static getInstance() {
    if (!instance) {
      instance = new PriceHistoryService({
        actor: new Actors().withoutIdentity().createPriceHistoryActor(),
      });
    }
    return instance;
  }
}
