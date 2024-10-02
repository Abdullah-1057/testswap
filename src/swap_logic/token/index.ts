import { TokenStandard, TokenAdapter } from "./tokenAdapter";
import { TokenInfo as TokenInfoResponse } from "./interface/ITokenInfo";
import { PriceHistoryService } from "../priceHistory";
import { Actors } from "../actors";
import { Principal } from "@dfinity/principal";

let instance: TokenService | undefined;

export class TokenService {
    private readonly tokenAdapter: TokenAdapter;
    private readonly priceHistoryService: PriceHistoryService;
    constructor({
        tokenAdapter,
        priceHistoryService
    }: {
        tokenAdapter: TokenAdapter;
        priceHistoryService: PriceHistoryService;
    }) {
        this.tokenAdapter = tokenAdapter;
        this.priceHistoryService = priceHistoryService;
    }

    public async getLogo({
        canisterId,
        standard,
    }: {
        canisterId: string;
        standard: string;
    }): Promise<string> {
        const tokenStandardService =
            await this.tokenAdapter.createTokenAdapter({
                tokenStandard: standard as TokenStandard,
                canisterId,
            });
        if (!tokenStandardService) {
            return "";
        }
        const logo = await tokenStandardService.getLogo();
        return logo;
    }

    public async getTokenByCanisterId({
        canisterId,
    }: {
        canisterId: string;
    }): Promise<TokenInfoResponse> {
        const tokenPriceInfo = await this.priceHistoryService.getToken({
            canisterId,
        });
        const token = await this.tokenAdapter.createTokenAdapter({
            tokenStandard: tokenPriceInfo.standard as TokenStandard,
            canisterId,
        });

        if (!token) {
            throw new Error("Token not found");
        }

        const {
            volumeUSD1d,
            volumeUSD7d,
            totalVolumeUSD,
            name,
            address,
            priceUSD,
            standard,
            symbol,
            priceUSDChange,
        } = tokenPriceInfo;



        const totalSupply = await token.totalSupply();
        const marketCap = totalSupply * priceUSD;

        return {
            volumeUSD1d,
            volumeUSD7d,
            totalVolumeUSD,
            name,
            address,
            priceUSD,
            standard,
            symbol,
            marketCap,
            priceUSDChange,
        };
    }
    public async getBalanceByCanisterIdAndPID({
        canisterId,
        pid,
        standard,
    }: {
        canisterId: string;
        pid: string | {
            owner: Principal;
            subaccount: [] | [Uint8Array | number[]];
        };
        standard: TokenStandard;
    }): Promise<number | null> {
        // const token = await this.getTokenByCanisterId({ canisterId });

        // if (!token) {
        //     throw new Error("Token not found");
        // }

        const tokenStandardService =
            await this.tokenAdapter.createTokenAdapter({
                tokenStandard: standard as TokenStandard,
                canisterId: canisterId,
            });

        if (!tokenStandardService) {
            throw new Error("Token standard not supported");
        }

        const balance = await tokenStandardService.balanceOf(pid);

        return balance;
    }

    public async transfer(input: {
        tokenCanisterId: string;
        to: {
            owner: Principal;
            subaccount: [] | [Uint8Array | number[]]
        },
        amount: bigint,
        fee: [bigint] | [],
        memo: [Uint8Array | number[]] | [],
        from_subaccount: [] | [Uint8Array | number[]],
        created_at_time: [bigint] | []
    }): Promise<bigint> {
        const tokenPriceInfo = await this.priceHistoryService.getToken({
            canisterId: input.tokenCanisterId,
        });
        const token = await this.tokenAdapter.createTokenAdapter({
            tokenStandard: tokenPriceInfo.standard as TokenStandard,
            canisterId: input.tokenCanisterId,
        });

        if (!token) {
            throw new Error("Token not found");
        }
        return await token.transfer(input);
    }

    public async getFee({
        canisterId,
        tokenStandard,
    }: {
        canisterId: string;
        tokenStandard: TokenStandard;
    }): Promise<bigint> {
        const token = await this.tokenAdapter.createTokenAdapter({
            tokenStandard,
            canisterId,
        });

        if (!token) {
            throw new Error("Token not found");
        }

        return await token.getFee();
    }

    public async approve(input: {
        'fee': [] | [bigint],
        'memo': [] | [Uint8Array | number[]],
        'from_subaccount': [] | [Uint8Array | number[]],
        'created_at_time': [] | [bigint],
        'amount': bigint,
        'expected_allowance': [] | [bigint],
        'expires_at': [] | [bigint],
        'spender': {
            'owner': Principal,
            'subaccount': [] | [Uint8Array | number[]],
        },
        canisterId: string;

    }) {
        const tokenPriceInfo = await this.priceHistoryService.getToken({
            canisterId: input.canisterId,
        });
        const token = await this.tokenAdapter.createTokenAdapter({
            tokenStandard: tokenPriceInfo.standard as TokenStandard,
            canisterId: input.canisterId,
        });

        if (!token) {
            throw new Error("Token not found");
        }

        return await token.approve(input);
    }



    public static getInstance(actor: Actors): TokenService {
        if (!instance) {
            instance = new TokenService({
                tokenAdapter: TokenAdapter.getInstance(actor),
                priceHistoryService: PriceHistoryService.getInstance(),
            });
        }

        return instance;

    }
}
