interface AssetInfo {
    native_token: {
        denom: string;
    };
}

interface Asset {
    info: AssetInfo;
    amount: string;
}

export interface LPResponseModel {
    assets: Asset[];
    total_share: string;
}

