"use client";

import { Alliance, AllianceParams, AllianceParamsResponse, TotalSupply, TotalSupplyAmount } from "@/types/ResponseTypes";
import { headers, supportedChains } from "@/const/Variables";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { getAdditionalYield, getIcon, getLsdUsdValue, getTakeRate, toLocaleString } from "@/const/AllianceFunctions";
import LoadingComponent from "./LoadingComponent";

export default function Table({ values, usdValues }: { values: Alliance[]; usdValues: any }) {
  const params = useSearchParams();
  const totalRewardWeight = useMemo<number>(() => {
    let total = 0;

    values.forEach((v) => {
      total += parseFloat(v.reward_weight);
    });

    return total;
  }, [values]);
  const [data, setData] = useState<{
    chainParams: AllianceParams;
    totalSupply: TotalSupply;
    currentChain: any;
  }>({
    chainParams: {
      last_take_rate_claim_time: "",
      reward_delay_time: "",
      take_rate_claim_interval: "",
    },
    totalSupply: {
      amount: "",
      denom: "",
    },
    currentChain: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      if (values.length > 0) {
        const chain = supportedChains[params.get("selected") ?? "carbon"];

        try {
          const chainParams = await fetch(`${chain.lcd}/terra/alliances/params`);
          const params = (await chainParams.json()) as AllianceParamsResponse;
          const totalSupply = await fetch(`${chain.lcd}/cosmos/bank/v1beta1/supply/by_denom?denom=${chain.denom}`);
          const supply = (await totalSupply.json()) as TotalSupplyAmount;

          setData({
            chainParams: params.params,
            totalSupply: supply.amount,
            currentChain: chain,
          });
        } catch (error) {
          setData({
            chainParams: {
              last_take_rate_claim_time: "",
              reward_delay_time: "",
              take_rate_claim_interval: "",
            },
            totalSupply: {
              amount: "",
              denom: "",
            },
            currentChain: chain,
          });
        }
      }

      setLoading(false);
    })();
  }, [params, values]);

  return (
    <LoadingComponent isLoading={loading} values={values}>
      <table className="w-full h-full border-collapse mb-3">
        <thead>
          <tr className="table_row">
            {headers.map((v) => (
              <th key={v.title} className="small min-w-8r md:min-w-full">
                <div className="justify-start lg:justify-center flex items-center gap-1">
                  {v.title}
                  {v.tooltip ? (
                    <Tooltip content={v.tooltip}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-5 h-5">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                    </Tooltip>
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values.map((row) => (
            <tr key={row.denom}>
              <td className="flex justify-start lg:justify-center pt-4">
                <Tooltip content={supportedChains[params.get("selected") ?? "carbon"].alliance_coins[row.denom]?.name}>
                  <img src={`${getIcon(row, data.currentChain?.name?.toLowerCase())}`} alt="Coin image" width={45} height={45} />
                </Tooltip>
              </td>
              <td className="text-left lg:text-right pt-4">{toLocaleString(parseInt(row.total_tokens) / 1_000_000)}</td>
              <td className="text-left lg:text-right pt-4">
                ${toLocaleString(getLsdUsdValue(row, data.currentChain?.name?.toLowerCase(), usdValues))}
              </td>
              <td className="text-left lg:text-right pt-4">{toLocaleString(getTakeRate(row, data.chainParams?.take_rate_claim_interval) * 100)}%</td>
              <td className="text-left lg:text-right pt-4">{toLocaleString(parseFloat(row.reward_weight) * 100)}%</td>
              <td className="text-left lg:text-right pt-4">
                {toLocaleString(
                  getAdditionalYield(
                    row,
                    data.totalSupply?.amount,
                    data.currentChain?.name?.toLowerCase(),
                    data.currentChain?.inflation,
                    totalRewardWeight,
                    data.chainParams?.take_rate_claim_interval,
                    usdValues,
                    data.currentChain?.decimals
                  )
                )}
                %
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </LoadingComponent>
  );
}
