export class AllianceBalanceEntry {
  asset: Asset;
  distribution: number;

  constructor(asset: Asset, distribution: string) {
    this.asset = asset;
    this.distribution = Number(distribution);
  }

  static fromAny(model: any): AllianceBalanceEntry {
    let asset = model.asset;
    let distribution = model.distribution;

    return new AllianceBalanceEntry(
      asset,
      distribution
    );
  }

  getDenom = () => {
    return this.asset.native ?? this.asset.cw20 as string;
  }
}

interface Asset {
  native?: string;
  cw20?: string;
}

export class AllianceHubRewardDistr {
  asset: Asset;
  balance: number;

  constructor(asset: Asset, balance: string) {
    this.asset = asset;
    this.balance = Number(balance);
  }

  static fromAny(model: any): AllianceHubRewardDistr {
    let asset = model.asset;
    let balance = model.balance;

    return new AllianceHubRewardDistr(
      asset,
      balance
    );
  }
  
  getDenom = () => {
    return this.asset.native ?? this.asset.cw20 as string;
  }
}