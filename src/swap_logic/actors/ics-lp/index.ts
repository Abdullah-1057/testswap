import { Actor, HttpAgent } from "@dfinity/agent";
import icsLPActor from "./icsLP.type"
import { idlFactory } from "./icsLP.did";
export const createActor = ({
    agent,
    canisterId,
}: {
    agent: HttpAgent;
    canisterId: string;
}): icsLPActor => {
    return Actor.createActor(idlFactory, {
        agent,
        canisterId,
    });
};
