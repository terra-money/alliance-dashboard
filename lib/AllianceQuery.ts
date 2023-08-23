import { supportedTokens } from "@/const/Variables";
import { Alliance, AllianceHubRewardDistributionResponse, AllianceHubTotalStakedResponse, AllianceResponse, Chain } from "@/types/ResponseTypes";

type AllianceQuery = (chain: Chain) => Promise<AllianceResponse>;

const DISTRIBUTION_QUERY = "eyJyZXdhcmRfZGlzdHJpYnV0aW9uIjoge319Cg%3D%3D";
const TOTAL_STAKED_QUERY = "ewogICJ0b3RhbF9zdGFrZWRfYmFsYW5jZXMiOiB7fQp9";

export const QueryForAlliances: AllianceQuery = async (chain: Chain): Promise<AllianceResponse> => {
  const chainResponse = await fetch(`${chain.lcd}/terra/alliances?pagination.limit=100`);
  const resp = (await chainResponse.json()) as AllianceResponse;

  if (chain.name === "Terra") {
    const allianceHubDenom = Object.keys(chain.alliance_coins).find((key: string) => chain.alliance_coins[key].hub_contract);
    if (allianceHubDenom) {
      const allianceHubInfo = chain.alliance_coins[allianceHubDenom];
      const allianceHubAlliance = resp.alliances.find((alliance) => alliance.denom === allianceHubDenom);
      if (allianceHubAlliance && allianceHubInfo.hub_contract) {
        const allianceHubSubAlliances = await QueryForAllianceHubAssets(chain.lcd, allianceHubInfo.hub_contract, allianceHubAlliance);
        resp.alliances.push(...allianceHubSubAlliances);
      }
    }
    resp.alliances = resp.alliances.filter((a) => a.denom !== allianceHubDenom);
  }
  return resp;
};

const QueryForAllianceHubAssets = async (lcd: string, allianceHubContract: string, allianceHubAlliance: Alliance): Promise<Alliance[]> => {
  const contractUrl = `${lcd}/cosmwasm/wasm/v1/contract/${allianceHubContract}/smart`;
  const totalStakedRes = (await (await fetch(`${contractUrl}/${TOTAL_STAKED_QUERY}`)).json()) as AllianceHubTotalStakedResponse;
  const rewardDistributionRes = (await (await fetch(`${contractUrl}/${DISTRIBUTION_QUERY}`)).json()) as AllianceHubRewardDistributionResponse;

  const totalDistribution = rewardDistributionRes.data.reduce((distribution, current) => {
    if (+current.distribution > 0) {
      return +current.distribution + distribution;
    } else {
      return distribution;
    }
  }, 0);

  const alliances: Alliance[] = [];
  for (const distribution of rewardDistributionRes.data) {
    if (+distribution.distribution <= 0) {
      continue;
    }
    let totalStaked = totalStakedRes.data.find((res) => distribution.asset.native === res.asset.native)?.balance ?? "0";
    if (distribution.asset.native === supportedTokens["rswth"]) {
      console.log(distribution.asset.native);
      totalStaked = "" + +totalStaked / 100;
    }
    const a: Alliance = {
      ...allianceHubAlliance,
      denom: distribution.asset.native,
      reward_weight: "" + (+allianceHubAlliance.reward_weight * +distribution.distribution) / totalDistribution,
      total_tokens: totalStaked,
    };
    alliances.push(a);
  }
  return alliances;
};
