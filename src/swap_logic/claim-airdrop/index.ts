import { Identity } from "@dfinity/agent";
import { Actors } from "../actors";
import { _SERVICE as ClaimAirdropActor } from "../actors/airdropVault/airdropVault.type"

let instance: ClaimAirdropService | undefined;

export class ClaimAirdropService {
    private actor: ClaimAirdropActor;

    constructor({ actor }: { actor: ClaimAirdropActor }) {
        this.actor = actor;
    }

    public async claimAirdrop() {
        const result = await this.actor.claim();
        if ("Ok" in result) {
            return result.Ok;
        }
        else if ("Err" in result) {
            throw new Error(JSON.stringify(result.Err));
        }

        throw new Error("Unknown error");
    }

    public static getInstance({
        canisterId,
        actors
    }: {
        canisterId: string
        actors: Actors
    }) {

        if (!instance) {
            instance = new ClaimAirdropService({
                actor: actors.createAirdropVaultActor({ canisterId })
            });
        }

        return instance;
    }

}