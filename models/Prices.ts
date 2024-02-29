import { LCD } from "./LCDConfig"

export interface TerraPriceServerResponse {
    created_at: string,
    prices: Array<{
        denom: string,
        price: number,
    }>
}

export interface Prices {
    [key: string]: {
        chain: string
        change24h: number
        contract_addr: string
        usd: number
    }
}

// Used to calculate the price of ampROAR
interface ErisLSDResponse {
    exchange_rate: string;

    // total_ustake: string;
    // total_utoken: string;
    // unlocked_coins: any[];
    // unbonding: string;
    // available: string;
    // tvl_utoken: string;
}

// Query all prices from the different servers
// available and merge them into a single object
export const QueryAndMergePrices = async (): Promise<Prices> => {
    const pricesRes = await Promise.all([
        fetch("https://price.api.tfm.com/tokens/?limit=1500"),
        fetch("https://pisco-price-server.terra.dev/latest"),
        // ampRoar Smart Contract
        LCD.wasm.contractQuery("terra1vklefn7n6cchn0u962w3gaszr4vf52wjvd4y95t2sydwpmpdtszsqvk9wy", { "state": {} }),
    ]);
    const [tfmPrices, terraOraclePrices]: [Prices, TerraPriceServerResponse] = await Promise.all([pricesRes[0].json(), pricesRes[1].json()]);
    let prices = terraOraclePrices.prices.reduce((acc, price) => {
        acc[price.denom] = {
            chain: "",
            change24h: 0,
            contract_addr: "",
            usd: price.price
        }
        return acc
    }, {} as Prices)

    // Quick fix for the AMPROAR price because 
    // there is no way to recover the price from 
    // any of the different Price Providers in
    // the oracle feeder.
    prices = parseRoarPrice(prices, pricesRes[2] as ErisLSDResponse);
    console.log(prices)
    return { ...tfmPrices, ...prices }
}

const parseRoarPrice = (prices: Prices, roarRes: ErisLSDResponse): Prices => {
    let roarPrice = prices["ROAR"]?.usd ?? 0;

    prices["AMPROAR"] = {
        chain: "",
        change24h: 0,
        contract_addr: "",
        usd: parseFloat(roarRes.exchange_rate) * roarPrice,
    }

    return prices;
}