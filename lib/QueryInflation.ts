import { Dec } from "@terra-money/feather.js";
import { LCD } from "../models/LCDConfig";
import { CarbonInflationRes } from "../const/chains";

// This is a very bad pattern but it will allow 
// to decrease a long standing call to the API
const INFLATION_CACHE: { [chainId: string]: Dec } = {};

// If carbon would have used the standard API this would haven't been necessary
export const GetInflationEndpoint = async (chainId: string): Promise<any> => {
    if (INFLATION_CACHE[chainId]) return Promise.resolve();


    if (chainId === "carbon-1") {
        let res = await fetch("https://api-insights.carbon.network/chain/inflation")
            .catch(_ => {
                return Promise.resolve({
                    result: {
                        inflationRate: "0"
                    }
                })
            });

        return res;
    }

    return LCD.mint.inflation(chainId);
};

export const ParseInflation = async (chainId: string, res: any): Promise<Dec> => {
    if (INFLATION_CACHE[chainId]) {
        return INFLATION_CACHE[chainId];
    }

    if (chainId === "carbon-1") {
        try {
            let carbonApiRes: { result: CarbonInflationRes } = await (res as any).json();
            // never let inflation go up #QQ...
            let inflation = new Dec(carbonApiRes.result.inflationRate);
            INFLATION_CACHE[chainId] = inflation;
            return inflation;
        }
        catch (e) {
            return new Dec(0);
        }
    }
    return res as Dec
}