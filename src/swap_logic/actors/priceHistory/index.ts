import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./priceHistory.did";
import { type _SERVICE as ActorType } from "./priceHistory.type";

export const canisterId = "moe7a-tiaaa-aaaag-qclfq-cai";

export const createActor = ({ agent }: { agent: HttpAgent }): ActorType => {
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};
