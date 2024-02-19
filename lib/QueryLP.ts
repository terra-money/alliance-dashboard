import { Dec } from "@terra-money/feather.js";
import { AllianceCoins } from "../models/Chain";
import { LCD } from "../models/LCDConfig";
import { LPResponseModel } from "../models/LPResponse";

// This function request the data for the smart contract in parallel,
// and then updates the allianceCoin object with the newly fetched data
// to be able to comput amount later on.
export const QueryLP = async (allianceCoin: AllianceCoins): Promise<AllianceCoins> => {
    const denomIndexes = new Array<string>();
    const promises = new Array<Promise<LPResponseModel>>();

    for (const [denom, coin] of Object.entries(allianceCoin)) {
        if (coin.lpInfo !== undefined) {
            promises.push(LCD.wasm.contractQuery(coin.lpInfo.contractAddr, { pool: {} }))
            denomIndexes.push(denom);
        }
    }
    const res = await Promise.all(promises)
        .catch((e) => {
            console.log("QueryLP error", e);
            return []
        });

    for (let i = 0; i < res.length; i++) {
        let poolRes = res[i];
        let coin = allianceCoin[denomIndexes[i]];

        let tokenAmount = new Dec(poolRes.assets[0].amount)
        let token1Amount = new Dec(poolRes.assets[1].amount)
        let totalShare = new Dec(poolRes.total_share);
        
        if (coin.lpInfo) {
            coin.lpInfo.totalShare = totalShare;
            coin.lpInfo.tokensAmount = [tokenAmount, token1Amount];
        }
        allianceCoin[denomIndexes[i]] = coin;
    }

    return allianceCoin;
};
