import { Principal } from "@dfinity/principal";
import { Actors } from "../actors";
import { Dip20TokenService } from "./dip20Service";
import { ExtTokenService } from "./extService";
import { ICRC1TokenService } from "./icrc1Service";
import { ITokenService } from "./interface/ITokenService";
export type TokenStandard = "DIP20" | "ICRC1" | "EXT" | "ICRC2" | "ICP";

let instance: TokenAdapter | undefined;

export class TokenAdapter {

  private actors: Actors;
  constructor(
    actors: Actors
  ) {
    this.actors = actors;
  }
  public async createTokenAdapter({
    tokenStandard,
    canisterId,
  }: {
    tokenStandard: TokenStandard;
    canisterId: string;
  }): Promise<ITokenService | null> {
    try {
      if (tokenStandard === "DIP20") {
        const actor = this.actors.createDIP20Actor({ canisterId });
        const decimals = await actor.decimals();
        return new Dip20TokenService({
          actor,
          decimals,
        });
      }
      if (
        tokenStandard === "ICRC1" ||
        tokenStandard === "ICRC2" ||
        tokenStandard === "ICP"
      ) {
        const actor = this.actors.createICRC1Actor({ canisterId });
        const decimals = await actor.icrc1_decimals();
        return new ICRC1TokenService({
          actor,
          decimals,
        });
      }
      if (tokenStandard === "EXT") {
        const actor = this.actors.createExtActor({ canisterId });
        const decimals = await actor.metadata().then((metadata) => {
          if ("ok" in metadata && "fungible" in metadata.ok) {
            return metadata.ok.fungible.decimals
              ? metadata.ok.fungible.decimals
              : 1e8;
          }
          return 1e8;
        });
        return new ExtTokenService({
          actor,
          decimals,
        });
      }
      throw new Error("Token standard not supported " + tokenStandard);
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public static getInstance(actor: Actors): TokenAdapter {
    if (!instance) {
      instance = new TokenAdapter(actor);
    }
    return instance;
  }
}
