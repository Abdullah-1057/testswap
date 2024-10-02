import { HttpAgent, Identity } from "@dfinity/agent";
import { createActor as createTokensAndPoolsActor } from "./tokensAndPools";
import { createActor as createPriceHistoryActor } from "./priceHistory";
import { createBaseStorageActor, createStorageActor } from "./transaction";
import { createActor as createICRC1Actor } from "./icrc-1";
import { createActor as createDIP20Actor } from "./dip20";
import { createActor as createExtActor } from "./ext";
import { createActor as createInfoActor } from "./ics-info";
import { createActor as createIcsLPActor } from "./ics-lp";
import {
  createActor as createAirdropVaultActor,
} from "./airdropVault"
import { DEFAULT_HOST } from "../constant";


export class Actors {

  private agent: HttpAgent;

  constructor(agent?: HttpAgent) {
    if (agent) {
      this.agent = agent;
    } else {
      this.agent = new HttpAgent({
        fetch: window.fetch.bind(window),
        host: DEFAULT_HOST,
        retryTimes: 10,
      });
    }
  }

  public withIdentity(identity: Identity) {
    this.agent.replaceIdentity(identity);
    return this;
  }

  public withoutIdentity() {
    return this;
  }

  public createTokensAndPoolsActor() {
    return createTokensAndPoolsActor({
      agent: this.agent,
    });
  }

  public createPriceHistoryActor() {
    return createPriceHistoryActor({
      agent: this.agent,
    });
  }

  public createBaseStorageActor() {
    return createBaseStorageActor({
      agent: this.agent,
    });
  }

  public createStorageActor({ canisterId }: { canisterId: string }) {
    return createStorageActor({
      agent: this.agent,
      canisterId,
    });
  }

  public createICRC1Actor({ canisterId }: { canisterId: string }) {
    return createICRC1Actor({
      agent: this.agent,
      canisterId,
    });
  }

  public createDIP20Actor({ canisterId }: { canisterId: string }) {
    return createDIP20Actor({
      agent: this.agent,
      canisterId,
    });
  }

  public createExtActor({ canisterId }: { canisterId: string }) {
    return createExtActor({
      agent: this.agent,
      canisterId,
    });
  }

  public createInfoActor() {
    return createInfoActor({
      agent: this.agent,
    });
  }

  public createIcsLPActor({ canisterId }: { canisterId: string }) {
    return createIcsLPActor({
      agent: this.agent,
      canisterId,
    });
  }

  public createAirdropVaultActor({ canisterId }: { canisterId: string }) {
    return createAirdropVaultActor({
      agent: this.agent,
      canisterId,
    });
  }
}
