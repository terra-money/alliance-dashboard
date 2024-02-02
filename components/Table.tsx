"use client";
import { useEffect, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { getAdditionalYield, getTakeRate, toLocaleString } from "../models/AllianceFunctions";
import LoadingComponent from "./LoadingComponent";
import { AllianceAsset } from "@terra-money/feather.js/dist/client/lcd/api/AllianceAPI";
import { LCD } from "../models/LCDConfig";
import { TableIcon } from "../components/TableIcon";
import TableState from "../models/TableState";
import { Prices } from "../models/Prices";
import { Chain } from "../models/Chain";
import { headers } from "../const/table";

interface TableProps {
  allianceAssets: AllianceAsset[] | undefined;
  prices: Prices
  selectedChain: Chain;
}

export default function Table({ selectedChain, allianceAssets, prices }: TableProps) {
  const [tableState, setTableState] = useState<TableState>(TableState.default(selectedChain));

  useEffect(() => {
    (async () => {
      // Query the data on paralel to speed up the loading time
      const res = await Promise.all([
        LCD.alliance.params(selectedChain.id),
        LCD.bank.supplyByDenom(selectedChain.id, selectedChain.bondDenom),
        LCD.mint.inflation(selectedChain.id),
      ]).catch((e) => { console.error(e) });

      // If no error occured, set the data
      // otherwise, keep the default data
      if (res != undefined) {
        let tableState = new TableState(
          selectedChain,
          allianceAssets,
          prices,
          res[0].params,
          res[1],
          res[2],
        );
        setTableState(tableState)
      }
    })();
  }, [allianceAssets, selectedChain]);

  return (
    <LoadingComponent isLoading={tableState.allianceAssets === undefined} values={tableState.allianceAssets}>
      <table className="w-full h-full border-collapse mb-3">
        <thead>
          <tr className="table_row">
            <th></th>
            {headers.map((v) => (
              <th key={v.title} className="small min-w-8r md:min-w-full">
                <div className="justify-start lg:justify-center flex items-center gap-1">
                  {v.title}
                  {v.tooltip ? (
                    <Tooltip content={v.tooltip(tableState.selectedChain.id)}>
                      <img src="/images/info.svg" alt="Info" width={20} height={20} />
                    </Tooltip>
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableState?.allianceAssets?.map((row) => (
            <tr key={row.denom}>
              <td className="flex justify-start lg:justify-center pt-4"><TableIcon row={row} chain={tableState.selectedChain} /></td>
              <td className="text-center lg:text-center pt-4">{tableState.getAllianceAssetName(row.denom)}</td>
              <td className="text-center lg:text-center pt-4">{tableState.getTotalTokens(row.denom) }</td>
              <td className="text-center lg:text-center pt-4">${tableState.getTotalValueStaked(row.denom)}</td>
              <td className="text-center lg:text-center pt-4">
                {toLocaleString(getTakeRate(row, tableState.chainParams?.take_rate_claim_interval as string) * 100)}%
              </td>
              <td className="text-center lg:text-center pt-4">{toLocaleString(parseFloat(row.reward_weight) * 100)}%</td>
              <td className="text-center lg:text-center pt-4">
                {toLocaleString(
                  getAdditionalYield(
                    row,
                    tableState.totalSupply?.amount.toNumber() as number,
                    tableState.selectedChain?.id,
                    tableState.inflation.toNumber(),
                    tableState.getTotalRewardWeight(),
                    tableState.chainParams?.take_rate_claim_interval as string,
                    prices,
                    tableState.selectedChain?.decimals
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
