export interface Alliance {
  denom: string;
  is_initialized: boolean;
  last_reward_change_item: string;
  reward_change_interval: string;
  reward_change_rate: string;
  reward_start_time: string;
  reward_weight: string;
  reward_weight_range: {
    max: string;
    min: string;
  };
  take_rate: string;
  total_tokens: string;
  total_validator_shares: string;
}

export interface Pagination {
  next_key: string;
  total: string;
}

export interface AllianceResponse {
  alliances: Alliance[];
  pagination: Pagination;
}

export interface AllianceParamsResponse {
  params: AllianceParams;
}

export interface AllianceParams {
  reward_delay_time: string;
  take_rate_claim_interval: string;
  last_take_rate_claim_time: string;
}

export interface TotalSupplyAmount {
  amount: TotalSupply;
}

export interface TotalSupply {
  denom: string;
  amount: string;
}

export interface Pill {
  id: number;
  name: string;
  symbol: string;
  token: string;
}

export interface Chain {
  name: string;
  lcd: string;
  inflation: number;
  denom: string;
  decimals: number;
  icon: string;
  alliance_coins: {
    [key: string]: {
      name: string;
      icon: string;
      color: string;
      hub_contract?: string;
    };
  };
}

interface Asset {
  native: string;
}

interface BalanceEntry {
  asset: Asset;
  balance: string;
}

interface DistributionEntry {
  asset: Asset;
  distribution: string;
}

export interface AllianceHubTotalStakedResponse {
  data: BalanceEntry[];
}

export interface AllianceHubRewardDistributionResponse {
  data: DistributionEntry[];
}
