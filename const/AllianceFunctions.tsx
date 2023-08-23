import { Alliance } from "@/types/ResponseTypes";
import { supportedChains, supportedTokens } from "./Variables";

const SECONDS_IN_YEAR = 31_536_000;

export const getIcon = (row: Alliance, chain: string) => {
  if (!chain) return "";

  const chainMapped = supportedChains[chain].alliance_coins[row.denom];
  return chainMapped ? chainMapped.icon : "";
};

export const getLsdUsdValue = (row: Alliance, chain: string, usdValues: any): number => {
  if (!chain) return 1;

  const tokenName = supportedChains[chain].alliance_coins[row.denom]?.name;

  if (!tokenName) return 0;

  const value = usdValues[supportedTokens[tokenName]];
  return ((value ? value.usd : 0) * parseInt(row.total_tokens)) / 1000_000;
};

const getNativeUsdValue = (totalSupplyAmount: string, chain: string, usdValues: any, decimals: number) => {
  const tokenName = supportedChains[chain]?.denom;
  const value = usdValues[supportedTokens[tokenName]];
  return ((value ? value.usd : 0) * parseInt(totalSupplyAmount)) / 10 ** decimals;
};

const lsdLosePerYear = (row: Alliance, chain: string, takeRate: string, usdValues: any) => {
  const usdStaked = getLsdUsdValue(row, chain, usdValues);
  return usdStaked * getTakeRate(row, takeRate);
};

export const getTakeRate = (row: Alliance, takeRate: string): number => {
  return 1 - (1 - parseFloat(row.take_rate)) ** (SECONDS_IN_YEAR / parseInt(takeRate));
};

const annualRewardsToLunaStakers = (
  row: Alliance,
  totalSupplyAmount: string,
  chain: string,
  inflation: number,
  totalRewardWeight: number,
  usdValues: any,
  decimals: number
) => {
  const usdNative = getNativeUsdValue(totalSupplyAmount, chain, usdValues, decimals);
  return usdNative * inflation * (parseFloat(row.reward_weight) / (1 + totalRewardWeight));
};

export const getAdditionalYield = (
  row: Alliance,
  totalSupplyAmount: string,
  chain: string,
  inflation: number,
  totalRewardWeight: number,
  takeRate: string,
  usdValues: any,
  decimals: number
) => {
  const usdStaked = getLsdUsdValue(row, chain, usdValues);
  return (
    (100 *
      (annualRewardsToLunaStakers(row, totalSupplyAmount, chain, inflation, totalRewardWeight, usdValues, decimals) -
        lsdLosePerYear(row, chain, takeRate, usdValues))) /
    usdStaked
  );
};

export const toLocaleString = (val: number) => {
  return val.toLocaleString("en-US", {
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
  });
};
