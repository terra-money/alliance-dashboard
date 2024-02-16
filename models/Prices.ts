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

// Query all prices from the different servers
// available and merge them into a single object
export const QueryAndMergePrices = async (): Promise<Prices> => {
    const pricesRes = await Promise.all([
        fetch("https://price.api.tfm.com/tokens/?limit=1500"),
        fetch("https://pisco-price-server.terra.dev/latest")
    ]);
    const [tfmPrices, terraOraclePrices]: [Prices, TerraPriceServerResponse] = await Promise.all([pricesRes[0].json(), pricesRes[1].json()]);
    const prices = terraOraclePrices.prices.reduce((acc, price) => {
        acc[price.denom] = {
            chain: "",
            change24h: 0,
            contract_addr: "",
            usd: price.price
        }
        return acc
    }, {} as Prices)

    return { ...tfmPrices, ...prices }
}