import { Coin, Dec } from "@terra-money/feather.js";
import { AllianceAsset, AllianceParams } from "@terra-money/feather.js/dist/client/lcd/api/AllianceAPI";
import { Chain } from "./Chain";
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from "../const/chains";
import { Prices } from "./Prices";


export default class TableState {
    private _totalRewardWeight: number = 0;

    constructor(
        public selectedChain: Chain,
        public allianceAssets: AllianceAsset[] | undefined,
        public prices: Prices,
        public chainParams: AllianceParams | undefined,
        public totalSupply: Coin | undefined,
        public inflation: Dec
    ) {
        this.selectedChain = selectedChain;
        this.allianceAssets = allianceAssets
        this.prices = prices;
        this.chainParams = chainParams;
        this.totalSupply = totalSupply;
        this.inflation = inflation;
    }

    static default = (selectedChain?: Chain) => {
        return new TableState(
            selectedChain ?? SUPPORTED_CHAINS[DEFAULT_CHAIN],
            undefined,
            {},
            undefined,
            undefined,
            new Dec(0)
        );
    }

    // If total reward weight is 0, calculate it
    // Otherwise, return the cached value
    getTotalRewardWeight = () => {
        if (this._totalRewardWeight === 0) {
            this._totalRewardWeight = this.allianceAssets?.reduce((curr, prevBalance) => {
                return curr + parseFloat(prevBalance.reward_weight);
            }, 0) ?? 0;
        }

        return this._totalRewardWeight;
    }

    getAllianceAssetName = (denom: string): string => {
        return this.selectedChain.allianceCoins[denom]?.name
    }

    getTotalTokens = (denom: string): string => {
        const totalTokens = this.allianceAssets?.find((asset) => asset.denom === denom)?.total_tokens;
        if (totalTokens === undefined) {
            return "-"
        }

        return this._toLocalString(parseInt(totalTokens) / 1_000_000);
    }

    getTotalValueStaked = (denom: string): string => {
        const priceKey = this.selectedChain.allianceCoins[denom]?.priceKey;
        console.log("priceKey",priceKey)
        if (priceKey === undefined) {
            return "-"
        }
        console.log(this.prices)
        const usdPrice = this.prices[priceKey]?.usd;
        console.log("usdPrice",usdPrice)
        if (usdPrice === undefined) {
            return "-"
        }

        const totalTokens = this.allianceAssets?.find((asset) => asset.denom === denom)?.total_tokens;
        console.log("totalTokens",totalTokens)
        if (totalTokens === undefined) {
            return "-"
        }

        
        //  toLocaleString(getLsdUsdValue(row, tableState.selectedChain?.id, prices))
        return this._toLocalString(usdPrice * (parseInt(totalTokens) / 1_000_000))
    }

    private _toLocalString(n: number): string {
        return n.toLocaleString("en-US", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        });
    }
}