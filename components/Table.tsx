"use client";
import { defaultChain, headers, supportedChains } from "@/const/Variables";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { getAdditionalYield, getLsdUsdValue, getTakeRate, toLocaleString } from "@/const/AllianceFunctions";
import LoadingComponent from "./LoadingComponent";
import { AllianceAsset, AllianceParams } from "@terra-money/feather.js/dist/client/lcd/api/AllianceAPI";
import { Coin, Dec } from "@terra-money/feather.js";
import { Chain } from "@/types/Chain";
import { LCD } from "@/const/LCDConfig";
import { TableIcon } from "@/components/TableIcon";

interface TableState {
  currentChain: Chain;
  chainParams: AllianceParams | undefined;
  totalSupply: Coin | undefined;
  inflation: Dec;
}
interface TableProps {
  values: AllianceAsset[] | undefined;
  usdValues: any
}

export default function Table({ values, usdValues }: TableProps) {
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [totalRewardWeight, setTotalRewardWeight] = useState(0);
  const [tableData, setTableData] = useState<TableState>({
    chainParams: undefined,
    totalSupply: undefined,
    inflation: new Dec(0),
    currentChain: supportedChains[defaultChain],
  });

  useEffect(() => {
    if (values !== undefined) {
      let _totalRewardWeight = values?.reduce((curr, prevBalance) => {
        return curr + parseFloat(prevBalance.reward_weight);
      }, 0);
      setTotalRewardWeight(_totalRewardWeight);

      (async () => {
        setLoading(true);
        // Set the default chain and check if the user has selected a chain
        // if the selected chain is available in the supported chains, use that
        // otherwise keep using the default chain.
        let chain = supportedChains[defaultChain];
        const selectedParam = params.get("selected");
        if (selectedParam !== null) {
          let _chain = supportedChains[selectedParam];
          if (_chain !== undefined) {
            chain = _chain;
          }
        }
        // Query the data on paralel to speed up the loading time
        const res = await Promise.all([
          LCD.alliance.params(chain.id),
          LCD.bank.supplyByDenom(chain.id, chain.bondDenom),
          LCD.mint.inflation(chain.id),
        ]).catch((e) => { console.error(e) });

        // If no error occured, set the data
        // otherwise, keep the default data
        if (res != undefined) {
          setTableData({
            currentChain: chain,
            chainParams: res[0].params,
            totalSupply: res[1],
            inflation: res[2],
          });
        }
        setLoading(false);
      })();
    }
  }, [params, values]);

  return (
    <LoadingComponent isLoading={loading} values={values}>
      <table className="w-full h-full border-collapse mb-3">
        <thead>
          <tr className="table_row">
            <th></th>
            {headers.map((v) => (
              <th key={v.title} className="small min-w-8r md:min-w-full">
                <div className="justify-start lg:justify-center flex items-center gap-1">
                  {v.title}
                  {v.tooltip ? (
                    <Tooltip content={v.tooltip(tableData.currentChain.id)}>
                      <img src="/images/info.svg" alt="Info" width={20} height={20} />
                    </Tooltip>
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values?.map((row) => (
            <tr key={row.denom}>
              <td className="flex justify-start lg:justify-center pt-4">
                <TableIcon row={row} chain={tableData.currentChain} />
              </td>
              <td className="text-center lg:text-center pt-4">
                {tableData.currentChain.allianceCoins[row.denom]?.name}
              </td>
              <td className="text-center lg:text-center pt-4">{toLocaleString(parseInt(row.total_tokens) / 1_000_000)}</td>
              <td className="text-center lg:text-center pt-4">
                ${toLocaleString(getLsdUsdValue(row, tableData.currentChain?.id, usdValues))}
              </td>
              <td className="text-center lg:text-center pt-4">
                {toLocaleString(getTakeRate(row, tableData.chainParams?.take_rate_claim_interval as string) * 100)}%
              </td>
              <td className="text-center lg:text-center pt-4">{toLocaleString(parseFloat(row.reward_weight) * 100)}%</td>
              <td className="text-center lg:text-center pt-4">
                {toLocaleString(
                  getAdditionalYield(
                    row,
                    tableData.totalSupply?.amount.toNumber() as number,
                    tableData.currentChain?.id,
                    tableData.inflation.toNumber(),
                    totalRewardWeight,
                    tableData.chainParams?.take_rate_claim_interval as string,
                    usdValues,
                    tableData.currentChain?.decimals
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
