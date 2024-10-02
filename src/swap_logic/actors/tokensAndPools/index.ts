import { Actor, HttpAgent } from "@dfinity/agent";
import type ActorType from "./tokensAndPools.type";
import { idlFactory } from "./tokensAndPools.did";

export const canisterId = "ggzvv-5qaaa-aaaag-qck7a-cai";

export const createActor = ({ agent }: { agent: HttpAgent }): ActorType => {
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};
