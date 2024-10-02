import { Actor, HttpAgent } from "@dfinity/agent";
import type BaseStorageActorType from "./baseIndex.type";
import type StorageActorType from "./storage.type";

import { idlFactory as baseIdlFactory } from "./baseIndex.did";
import { idlFactory as storageIdlFactory } from "./storage.did";

/**
 * ICS transaction storage
 */
export const baseCanisterId = "g54jq-hiaaa-aaaag-qck5q-cai";

/**
 * description: Create actor instance
 */
export const createBaseStorageActor = ({
  agent,
}: {
  agent: HttpAgent;
}): BaseStorageActorType => {
  // Fetch root key for certificate validation during development
  if (process.env.NEXT_PUBLIC_DFX_NETWORK === "local") {
    agent.fetchRootKey();
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(baseIdlFactory, {
    agent,
    canisterId: baseCanisterId,
  });
};

export const createStorageActor = ({
  agent,
  canisterId,
}: {
  agent: HttpAgent;
  canisterId: string;
}): StorageActorType => {
  // Fetch root key for certificate validation during development
  if (process.env.NEXT_PUBLIC_DFX_NETWORK === "local") {
    agent.fetchRootKey();
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(storageIdlFactory, {
    agent,
    canisterId,
  });
};
