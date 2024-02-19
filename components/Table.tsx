"use client";
import { Tooltip } from "@nextui-org/react";
import LoadingComponent from "./LoadingComponent";
import { TableIcon } from "../components/TableIcon";
import TableState, {toLocalString} from "../models/TableState";
import { headers } from "../const/table";

interface TableProps {
  tableState: TableState | null;
  isLoading: boolean;
}

export default function Table({ tableState, isLoading}: TableProps) {
  return (
    <LoadingComponent isLoading={isLoading} values={tableState?.allianceAssets}>
      <table className="w-full h-full border-collapse mb-3">
        <thead>
          <tr className="table_row">
            <th></th>
            {headers.map((v) => (
              <th key={v.title} className="small min-w-8r md:min-w-full">
                <div className="justify-start lg:justify-center flex items-center gap-1">
                  {v.title}
                  {v.tooltip ? (
                    <Tooltip content={v.tooltip(tableState?.selectedChain.id)}>
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
              <td className="text-center lg:text-center pt-4">{toLocalString(tableState.getTotalTokens(row.denom))}</td>
              <td className="text-center lg:text-center pt-4">${toLocalString(tableState.getTotalValueStaked(row.denom))}</td>
              <td className="text-center lg:text-center pt-4">{toLocalString(tableState.getTakeRate(row.denom))}%</td>
              <td className="text-center lg:text-center pt-4">{toLocalString(parseFloat(row.reward_weight) * 100)}%</td>
              <td className="text-center lg:text-center pt-4">{toLocalString(tableState.getAdditionalYield(row.denom))}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </LoadingComponent>
  );
}
