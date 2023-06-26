"use client";

import { Alliance, AllianceParams, TotalSupply } from "@/types/ResponseTypes";
import { supportedChains, supportedTokens } from "@/const/Variables";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Tooltip } from "@nextui-org/react";

const SECONDS_IN_YEAR = 31_536_000;

export default function Table({
  values,
  usdValues,
  chainParams,
  totalSupply,
  currentChain,
}: {
  values: Alliance[],
  usdValues: any,
  chainParams: AllianceParams,
  totalSupply: TotalSupply,
  currentChain: any
}) {
  const headers = ["Name", "Total Staked", "Total Value Staked", "Take Rate", "Reward Weight", "Additional Yield"];
  const params = useSearchParams();
  const totalRewardWeight = useMemo<number>(() => {
    let total = 0;

    values.forEach(v => {
      total += parseFloat(v.reward_weight);
    });

    return total;
  }, [values]);

  const getIcon = (row: Alliance) => {
    const chainMapped = supportedChains[params.get('selected') ?? 'carbon'][row.denom];
    return chainMapped ? chainMapped.icon : '';
  }

  const getLsdUsdValue = (row: Alliance): number => {
    const tokenName = supportedChains[params.get('selected') ?? 'carbon'][row.denom]?.name;

    if (!tokenName) return 0;

    const value = usdValues[supportedTokens[tokenName]];

    return ((value ? value.usd : 0) * parseInt(row.total_tokens) / 1_000_000);
  }

  const getNativeUsdValue = () => {
    const tokenName = supportedChains[params.get('selected') ?? 'carbon']?.denom;
    const value = usdValues[supportedTokens[tokenName]];

    return ((value ? value.usd : 0) * parseInt(totalSupply.amount) / 1_000_000);
  }

  const lsdLosePerYear = (row: Alliance) => {
    const usdStaked = getLsdUsdValue(row);

    return usdStaked * getTakeRate(row);
  }

  const getTakeRate = (row: Alliance): number => {
    return 1 - (1 - parseFloat(row.take_rate)) ** (SECONDS_IN_YEAR / parseInt(chainParams.take_rate_claim_interval));
  }

  const annualRewardsToLunaStakers = (row: Alliance) => {
    const usdNative = getNativeUsdValue();

    return (usdNative * currentChain.inflation * (parseFloat(row.reward_weight) / (1 + (totalRewardWeight))));
  }

  const getAdditionalYield = (row: Alliance) => {
    const usdStaked = getLsdUsdValue(row);

    return ((annualRewardsToLunaStakers(row) - lsdLosePerYear(row)) / usdStaked).toLocaleString('en-US');
  }

  return (
    values.length > 0 ? <table className="w-full h-full border-collapse mb-3">
      <thead>
        <tr className="table_row">
          {
            headers.map((v, i) => {
              return (
                <th key={v} className={`small ${i < 3 ? 'text-left' : 'text-right'} min-w-8r md:min-w-full`}>{v}</th>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          values.map(row => {
            return (
              <tr key={row.denom}>
                <td className="pt-4 min-w-8r md:min-w-full">
                  <Tooltip content={supportedChains[params.get('selected') ?? 'carbon'][row.denom]?.name}>
                    {
                      getIcon(row) ? <img
                        src={`${getIcon(row)}`}
                        alt='Coin image'
                        width={45}
                        height={45}
                      /> : null
                    }
                  </Tooltip>
                </td>
                <td className='text-left pt-4 min-w-8r md:min-w-full'>{(parseInt(row.total_tokens) / 1_000_000).toLocaleString('en-US')}</td>
                <td className='text-left pt-4 min-w-8r md:min-w-full'>${getLsdUsdValue(row).toLocaleString('en-US', {
                  maximumFractionDigits: 2
                })}</td>
                <td className='text-right pt-4 min-w-8r md:min-w-full'>{(getTakeRate(row) * 100).toLocaleString('en-US')}%</td>
                <td className='text-right pt-4 min-w-8r md:min-w-full'>{(parseFloat(row.reward_weight) * 100).toLocaleString('en-US')}%</td>
                <td className='text-right pt-4 min-w-8r md:min-w-full'>{getAdditionalYield(row)}%</td>
              </tr>
            )
          })
        }
      </tbody>
    </table> : <div>
      <p className="p-3 text-center font-bold font-inter">No data for the selected chain</p>
    </div>
  );
}