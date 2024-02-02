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

export const mergePrices = (tfmPrices: Prices, tpsr: TerraPriceServerResponse): Prices => {
    const prices = tpsr.prices.reduce((acc, price) => {
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