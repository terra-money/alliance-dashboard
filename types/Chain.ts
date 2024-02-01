

export class Chain implements ChainModel {
    id: string;
    bondDenom: string;
    name: string;
    decimals: number;
    icon: string;
    allianceHub?: {
        contractAddress: string;
        denom: string;
    };
    allianceCoins: {
        [key: string]: AllianceCoin
    };
    constructor(model: ChainModel) {
        this.id = model.id;
        this.bondDenom = model.bondDenom;
        this.name = model.name;
        this.decimals = model.decimals;
        this.icon = model.icon;
        this.allianceCoins = {};
        this.allianceHub = model.allianceHub;

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

export interface ChainModel {
    id: string;
    bondDenom: string;
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
    icon?: string | string[];
    color?: string;
    hubContractAddr?: string;

    constructor(model: AllianceCoinModel) {
        this.name = model.name;
        this.icon = model.icon;
        this.color = model.color || "";
        this.hubContractAddr = model.hubContractAddr || "";
    }

    static fromAny(model: any): AllianceCoin {
        return new AllianceCoin(model);
    }
}

interface AllianceCoinModel {
    name: string;
    icon?: string | string[];
    color?: string;
    hubContractAddr?: string;
}