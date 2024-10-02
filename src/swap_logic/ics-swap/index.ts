import { Principal } from "@dfinity/principal";
import { Actors } from "../actors";
import IcsSwapActor from "./interface";

let instance: IcsPoolSwapService | undefined;

export class IcsPoolSwapService {
    private actor: IcsSwapActor;

    constructor({ actor }: { actor: IcsSwapActor }) {
        this.actor = actor;
    }

    public async getQuote(quoteInput: {
        'amountIn': string,
        'zeroForOne': boolean,
        'amountOutMinimum': string,
    }): Promise<bigint> {

        const result = await this.actor.quote(quoteInput);
        if ("ok" in result) {
            return result.ok;
        }
        else if ("err" in result) {
            throw new Error(JSON.stringify(result.err));
        }

        throw new Error("Unknown error");
    }

    public async swap(swapInput: {
        'amountIn': string,
        'zeroForOne': boolean,
        'amountOutMinimum': string,
    }) {
        const result = await this.actor.swap(swapInput);
        if ("ok" in result) {
            return result.ok;
        }
        else if ("err" in result) {
            throw new Error(JSON.stringify(result.err));
        }

        throw new Error("Unknown error");
    }

    public async getTokenAmountState(): Promise<{
        'swapFee0Repurchase': bigint,
        'token0Amount': bigint,
        'swapFeeReceiver': string,
        'token1Amount': bigint,
        'swapFee1Repurchase': bigint,
    }> {
        const result = await this.actor.getTokenAmountState();
        if ("ok" in result) {
            return result.ok;
        }
        else if ("err" in result) {
            throw new Error(JSON.stringify(result.err));
        }
        throw new Error("Unknown error");
    }

    public async getUserUnusedBalance(
        principal: Principal
    ): Promise<{ balance0: bigint; balance1: bigint; }> {
        const result = await this.actor.getUserUnusedBalance(
            principal
        );
        if ("ok" in result) {
            return result.ok;
        }
        else if ("err" in result) {
            throw new Error(JSON.stringify(result.err));
        }

        throw new Error("Unknown error");
    }

    public async depositFrom(depositInput: {
        'fee': bigint,
        'token': string,
        'amount': bigint,
    }) {
        const result = await this.actor.depositFrom(depositInput);
        if ("ok" in result) {
            return result.ok;
        }
        else if ("err" in result) {
            throw new Error(JSON.stringify(result.err));
        }
    }

    public async withdraw(withdrawInput: {
        'fee': bigint,
        'token': string,
        'amount': bigint
    }) {
        const result = await this.actor.withdraw(withdrawInput);
        if ("ok" in result) {
            return result.ok;
        }
        else if ("err" in result) {
            throw new Error(JSON.stringify(result.err));
        }

        throw new Error("Unknown error");
    }

    public async getMetadata() {
        const result = await this.actor.metadata();
        if ("ok" in result) {
            return result.ok;
        }
        else if ("err" in result) {
            throw new Error(JSON.stringify(result.err));
        }

        throw new Error("Unknown error");
    }


    public static getInstance(
        canisterId: string,
        actors: Actors
    ) {
        if (!instance) {
            instance = new IcsPoolSwapService({
                actor: actors.createIcsLPActor({
                    canisterId
                })
            });
        }
        return instance;
    }
}