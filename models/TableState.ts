import { Coin, Dec } from "@terra-money/feather.js";
import { AllianceAsset, AllianceParams } from "@terra-money/feather.js/dist/client/lcd/api/AllianceAPI";
import { Chain } from "./Chain";
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from "../const/chains";
import { Prices } from "./Prices";

const SECONDS_IN_YEAR = 31_536_000;
export default class TableState {
    // Use the function to calculate the total reward weight
    // this is to avoid recalculating it every time it's called
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

    getTotalTokens = (denom: string): number => {
        const totalTokens = this.allianceAssets?.find((asset) => asset.denom === denom)?.total_tokens;
        if (totalTokens === undefined) {
            return 0
        }

        return parseInt(totalTokens) / 1_000_000;
    }

    getTotalValueStaked = (denom: string): number => {
        const isLP = this.selectedChain.allianceCoins[denom]?.lpInfo !== undefined;

        return isLP ? this._getTotalLPValueStaked(denom) : this._getTotalTokenValueStaked(denom);
    }

    private _getTotalLPValueStaked = (denom: string): number => {
        const lpInfo = this.selectedChain.allianceCoins[denom].lpInfo;

        if (lpInfo && lpInfo.tokensAmount && lpInfo.totalShare) {
            const tokenAmount = lpInfo.tokensAmount[0].div(10 ** lpInfo.tokensDecimals[0]);
            const tokenPrice = this.prices[lpInfo.tokensPriceKey[0]]?.usd;
            const stakedAmountToUSD = tokenAmount.mul(tokenPrice);

            const token1Amount = lpInfo.tokensAmount[1].div(10 ** lpInfo.tokensDecimals[1]);
            const token1Price = this.prices[lpInfo.tokensPriceKey[1]]?.usd;
            const stakedAmount1ToUSD = token1Amount.mul(token1Price);

            const totalTokens = this.allianceAssets?.find((asset) => asset.denom === denom)?.total_tokens;
            if (totalTokens === undefined) {
                return 0
            }
            const totalStakedTokensToAlliance = new Dec(totalTokens);
            const totalStakedSupply = lpInfo.totalShare;
            const totalStakedToUsd = stakedAmountToUSD.plus(stakedAmount1ToUSD);

            
            return totalStakedTokensToAlliance.div(totalStakedSupply).mul(totalStakedToUsd).toNumber();
        }

        return 0
    }

    private _getTotalTokenValueStaked = (denom: string): number => {
        const priceKey = this.selectedChain.allianceCoins[denom]?.priceKey;
        if (priceKey === undefined) {
            return 0
        }
        const usdPrice = this.prices[priceKey]?.usd;
        if (usdPrice === undefined) {
            return 0
        }

        const totalTokens = this.allianceAssets?.find((asset) => asset.denom === denom)?.total_tokens;
        if (totalTokens === undefined) {
            return 0
        }

        return usdPrice * (parseInt(totalTokens) / 1_000_000)
    }

    getTakeRate = (denom: string): number => {
        if (this.chainParams?.take_rate_claim_interval === undefined) {
            return 0
        }
        const takeRateClaimInterval = parseInt(this.chainParams.take_rate_claim_interval);
        const denomTakeRate = this.allianceAssets?.find((asset) => asset.denom === denom)?.take_rate;
        if (denomTakeRate === undefined) {
            return 0
        }
        const takeRate = 1 - (1 - parseFloat(denomTakeRate)) ** (SECONDS_IN_YEAR / takeRateClaimInterval);
        return takeRate * 100;
    };

    getAdditionalYield = (denom: string): number => {
        const asset = this.allianceAssets?.find((asset) => asset.denom === denom);
        if (asset === undefined) {
            return 0
        }
        const nativeTokenPrice = this.prices[this.selectedChain.bondDenomPriceKey]?.usd;
        const nativeTokenTotalSupply = new Dec(this.totalSupply?.amount);
        const nativeTokenMarketCap = new Dec(nativeTokenPrice).mul(nativeTokenTotalSupply).div(10 ** this.selectedChain.decimals);

        let totalAssetStakedInUSD = new Dec(this.getTotalValueStaked(denom));
        if (totalAssetStakedInUSD.isNaN()) {
            return 0
        }

        const assetRewardWeight = new Dec(asset.reward_weight);
        const annualRewardsToNativeStakers = nativeTokenMarketCap.mul(this.inflation)
            .mul(assetRewardWeight.div(1 + this.getTotalRewardWeight()));

        const lsdLosePerYear = totalAssetStakedInUSD.mul(this.getTakeRate(denom));
        const additionalYild = annualRewardsToNativeStakers.minus(lsdLosePerYear).div(totalAssetStakedInUSD).mul(100);

        return additionalYild.isNegative() ? additionalYild.plus(100).toNumber() : additionalYild.toNumber();
    }
}

export function toLocalString(n: number): string {
    return n.toLocaleString("en-US", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    });
}