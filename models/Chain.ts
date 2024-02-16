import { Dec } from "@terra-money/feather.js";


export class Chain implements ChainModel {
    id: string;
    bondDenom: string;
    bondDenomPriceKey: string;
    name: string;
    decimals: number;
    icon: string;
    allianceHub?: {
        contractAddress: string;
        denom: string;
    };
    allianceCoins: AllianceCoins;
    constructor(model: ChainModel) {
        this.id = model.id;
        this.bondDenom = model.bondDenom;
        this.name = model.name;
        this.decimals = model.decimals;
        this.icon = model.icon;
        this.allianceCoins = {};
        this.allianceHub = model.allianceHub;
        this.bondDenomPriceKey = model.bondDenomPriceKey

        for (const key in model.allianceCoins) {
            let coin = model.allianceCoins[key]
            this.allianceCoins[key] = AllianceCoin.fromAny(coin);
        }
    }

    hasAllianceHub = () => this.allianceHub !== undefined;
    getAllianceHubAddress = () => this.allianceHub?.contractAddress as string;
    getAllianceHubDenom = () => this.allianceHub?.denom as string;

    static fromAny(model: any): Chain {
        return new Chain(model);
    }
}

export interface AllianceCoins {
    [key: string]: AllianceCoin
}


export interface ChainModel {
    id: string;
    bondDenom: string;
    bondDenomPriceKey: string;
    name: string;
    decimals: number;
    icon: string;
    allianceHub?: {
        contractAddress: string;
        denom: string;
    };
    allianceCoins: {
        [key: string]: AllianceCoin
    }
}

export class AllianceCoin {
    name: string;
    priceKey?: string;
    icon?: string | string[];
    lpInfo?: {
        tokensDecimals: number[];
        // This two properties can be determined from the key and name but
        // that will lead to bad design so it's better to write them manually
        contractAddr: string;
        tokensPriceKey: string[];
        // this two properties must be computed from the contract request
        tokensAmount?: Dec[]; 
        totalShare?: Dec; 
    }

    constructor(model?: AllianceCoinModel) {
        this.name = model?.name || "";
        this.icon = model?.icon;
        this.priceKey = model?.priceKey;
        this.lpInfo = model?.lpInfo;
    }

    static fromAny(model: any): AllianceCoin {
        return Object.assign(new AllianceCoin(), model);
    }
}

interface AllianceCoinModel {
    name: string;
    icon?: string | string[];
    priceKey?: string;
    lpInfo?: {
        contractAddr: string;
        tokensPriceKey: string[];
        tokensDecimals: number[];
    }
}