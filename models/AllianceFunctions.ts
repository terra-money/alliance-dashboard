import { AllianceAsset } from "@terra-money/feather.js/dist/client/lcd/api/AllianceAPI";
import { SUPPORTED_CHAINS } from "../const/chains";

const SUPPORTED_TOKENS = {} as any;
const SECONDS_IN_YEAR = 31_536_000;

export const getIcon = (row: AllianceAsset, chain: string) => {
  if (!chain) return "";

  const chainMapped = SUPPORTED_CHAINS[chain].allianceCoins[row.denom];
  return chainMapped ? chainMapped.icon : "";
};

export const getLsdUsdValue = (row: AllianceAsset, chain: string, usdValues: any): number => {
  if (!chain) return 1;

  const tokenName = SUPPORTED_CHAINS[chain]?.allianceCoins[row.denom]?.name;

  if (!tokenName) return 0;
  const value = usdValues[SUPPORTED_TOKENS[tokenName]];
  return ((value ? value.usd : 0) * parseInt(row.total_tokens)) / 1000_000;
};

const getNativeUsdValue = (totalSupplyAmount: number, chain: string, usdValues: any, decimals: number) => {
  const tokenName = SUPPORTED_CHAINS[chain]?.bondDenom;
  const value = usdValues[SUPPORTED_TOKENS[tokenName]];
  return ((value ? value.usd : 0) * totalSupplyAmount) / 10 ** decimals;
};

const lsdLosePerYear = (row: AllianceAsset, chain: string, takeRate: string, usdValues: any) => {
  const usdStaked = getLsdUsdValue(row, chain, usdValues);
  return usdStaked * getTakeRate(row, takeRate);
};

export const getTakeRate = (row: AllianceAsset, takeRate: string): number => {
  return 1 - (1 - parseFloat(row.take_rate)) ** (SECONDS_IN_YEAR / parseInt(takeRate));
};

const annualRewardsToLunaStakers = (
  row: AllianceAsset,
  totalSupplyAmount: number,
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
  row: AllianceAsset,
  totalSupplyAmount: number,
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
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};
