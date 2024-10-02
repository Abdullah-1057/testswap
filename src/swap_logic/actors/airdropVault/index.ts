import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "./airdropVault.did";
import { Vault as ActorType } from "./airdropVault.type";
/**
 * description: Create actor instance
 */
export const createActor = ({
    agent,
    canisterId,
}: {
    agent: HttpAgent;
    canisterId: string;
}): ActorType => {
    // Fetch root key for certificate validation during development
    if (process.env.NEXT_PUBLIC_DFX_NETWORK === "local") {
        agent.fetchRootKey();
    }

    // Creates an actor with using the candid interface and the HttpAgent
    return Actor.createActor(idlFactory, {
        agent,
        canisterId,
    });
};
