import { LCD } from "../models/LCDConfig";
import { Chain } from "../models/Chain";
import { AllianceBalanceEntry, AllianceHubRewardDistr } from "../models/ResponseTypes";
import { AllianceAsset } from "@terra-money/feather.js/dist/client/lcd/api/AllianceAPI";


export const QueryAlliances = async (chain: Chain): Promise<AllianceAsset[]> => {
  let { alliances } = await LCD.alliance.alliances(chain.id);

  // If has an alliance hub defined it means that some of the assets are 
  // actuall delegated throught the hub contract. So it needs to account
  // for the rates of the hub contract per each coin.
  if (chain.hasAllianceHub()) {
    const allianceHubAsset = alliances.find((a) => a.denom === chain.getAllianceHubDenom()) as AllianceAsset;
    // Remove the hub asset from the list of alliances
    alliances.filter((a) => a.denom === chain.getAllianceHubDenom())
    const alliancesfromHub = await queryAllianceHubAssets(chain.getAllianceHubAddress(), allianceHubAsset);

    // Used to filter out any asset that is not available in
    // application's state to avoid broken assets in the list.
    alliances = alliances
      .concat(alliancesfromHub)
      .filter(alliance => chain.allianceCoins[alliance.denom] !== undefined);
  }

  return alliances;
};

const queryAllianceHubAssets = async (contractAddr: string, allianceHubAlliance: AllianceAsset): Promise<AllianceAsset[]> => {
  // Get the LCD client and query the contract for 
  // rewards distribution and staked balances in 
  // paralel to save time.
  const res = await Promise.all([
    LCD.wasm.contractQuery(contractAddr, { "reward_distribution": {} }),
    LCD.wasm.contractQuery(contractAddr, { "total_staked_balances": {} })
  ]) as any;

  // Parse the responses into the types we need.
  const rewardDistrRes: Array<AllianceBalanceEntry> = res[0].map(AllianceBalanceEntry.fromAny)
  const totalStakedRes: Array<AllianceHubRewardDistr> = res[1].map(AllianceHubRewardDistr.fromAny)

  const totalDistribution = rewardDistrRes
    .reduce((distribution, current) => {
      if (+current.distribution > 0) {
        return +current.distribution + distribution;
      } else {
        return distribution;
      }
    }, 0);

  const alliances: AllianceAsset[] = [];
  for (const distribution of rewardDistrRes) {
    if (distribution.distribution <= 0) {
      continue;
    }
    let totalStaked = totalStakedRes.find((res: any) => distribution.getDenom() === res.getDenom())?.balance ?? 0;
    // TODO: fix this at somepoint sWETH
    if (distribution.asset.native === "ibc/0E90026619DD296AD4EF9546396F292B465BAB6B5BE00ABD6162AA1CE8E68098") {
      // handle 8 decimals
      totalStaked = totalStaked / 100;
    }
    const a: AllianceAsset = {
      ...allianceHubAlliance,
      denom: distribution.getDenom(),
      reward_weight: "" + (+allianceHubAlliance.reward_weight * +distribution.distribution) / totalDistribution,
      total_tokens: totalStaked.toString(),
    };
    alliances.push(a);
  }


  return alliances;
};
