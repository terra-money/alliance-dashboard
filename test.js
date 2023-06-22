const SECONDS_IN_YEAR = 31_536_000;

const getLsdUsdValue = (data) => {
  return data.totalLunaValueInUsd;
}

const getNativeUsdValue = (data) => {
  return (data.tokenValue * parseInt(data.totalSupply) / 1_000_000);
}

const lsdLosePerYear = (row) => {
  const usdStaked = getLsdUsdValue(row);

  return usdStaked * getTakeRate(row);
}

const getTakeRate = (data) => {
  return 1 - (1 - parseFloat(data.takeRate)) ** (SECONDS_IN_YEAR / parseInt(data.takeRateClaimInterval));
}

const annualRewardsToLunaStakers = (data) => {
  const usdNative = getNativeUsdValue(data);

  return (usdNative * data.inflation * (parseFloat(data.rewardWeight) / (1 + parseFloat(data.totalRewardWeight))));
}

const getAdditionalYield = (row) => {
  const usdStaked = getLsdUsdValue(row);

  return ((annualRewardsToLunaStakers(row) - lsdLosePerYear(row)) / usdStaked).toLocaleString('en-US');
}

const data = {
  inflation: 0.04,
  totalSupply: '1000000000000000',
  rewardWeight: '0.01',
  totalRewardWeight: '0.01',
  tokenValue: 0.006
}

console.log(annualRewardsToLunaStakers(data));

const data1 = {
  takeRate: '0.000000028581706446',
  takeRateClaimInterval: 300
}

console.log(getTakeRate(data1));

const data3 = {
  tokenValue: 0.006,
  totalLunaValueInUsd: 13_363.23,
  takeRate: '0.000000028581706446',
  takeRateClaimInterval: 300
}

console.log(lsdLosePerYear(data3));

const final = {
  inflation: 0.04,
  totalSupply: '180801927220819786',
  rewardWeight: '0.01',
  totalRewardWeight: '0.02',
  tokenValue: 0.005489635,
  totalLunaValueInUsd: 16_292.65,
  takeRate: '0.000000028581706446',
  takeRateClaimInterval: 300
}

console.log(getAdditionalYield(final));

const finalMigaloo = {
  inflation: 0.04,
  totalSupply: '180801927220819786',
  rewardWeight: '0.01',
  totalRewardWeight: '0.02',
  tokenValue: 0.005489635,
  totalLunaValueInUsd: 21_264.5,
  takeRate: '0.000000028581706446',
  takeRateClaimInterval: 300
}

console.log(getAdditionalYield(finalMigaloo));