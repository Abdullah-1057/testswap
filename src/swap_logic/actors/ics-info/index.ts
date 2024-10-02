import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./info.did";
import ActorType from "./info.type";

export const infoCanisterId = "k37c6-riaaa-aaaag-qcyza-cai";
export const createActor = ({ agent }: { agent: HttpAgent }): ActorType => {
  // Fetch root key for certificate validation during development
  if (process.env.NEXT_PUBLIC_DFX_NETWORK === "local") {
    agent.fetchRootKey();
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId: infoCanisterId,
  });
};
