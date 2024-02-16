"use client";

import CSSLoader from "../components/CSSLoader";
import Card from "../components/Card";
import Kpi from "../components/Kpi";
import Table from "../components/Table";
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from "../const/chains";
import { QueryAlliances } from "../lib/QueryAlliances";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Prices, QueryAndMergePrices } from "../models/Prices";
import { Kpis } from "../const/kpis";
import { LCD } from "../models/LCDConfig";
import TableState from "../models/TableState";
import { GetInflationEndpoint, ParseInflation } from "../lib/QueryInflation";
import { QueryLP } from "../lib/QueryLP";
import { Chain } from "../models/Chain";

export default function Home() {
  const params = useSearchParams();
  const router = useRouter();

  const [tableState, setTableState] = useState<TableState | null>(null);
  const [selectedChain, setSelectedChain] = useState<Chain | undefined>(undefined);
  const [prices, setPrices] = useState<Prices>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const selectedParamIsSupported = SUPPORTED_CHAINS[params.get("selected") as any];
    if (selectedParamIsSupported) {
      setSelectedChain(SUPPORTED_CHAINS[params.get("selected") as string]);
    } else {
      setSelectedChain(SUPPORTED_CHAINS[DEFAULT_CHAIN])
      router.push(`?selected=${SUPPORTED_CHAINS[DEFAULT_CHAIN].id}`);
    }
  }, [params])

  useEffect(() => {
    if (selectedChain) {
      setIsLoading(true);
      (async () => {
        // Load the prices only the first time a user lands on 
        // the page, then use the prices from the state.
        // 
        // NOTE: the variable is not being shadowed because otherwise 
        // the first load will result on 0 prices.
        const _prices = Object.keys(prices).length === 0 ? await QueryAndMergePrices() : prices;
        setPrices(_prices);

        // Query selectedChain alliances info
        const _allianceAssetRes = await QueryAlliances(selectedChain).catch(() => []);

        // Query chain info on parallel to speed up the loading time
        let chainInfoRes = await Promise.all([
          LCD.alliance.params(selectedChain.id),
          LCD.bank.supplyByDenom(selectedChain.id, selectedChain.bondDenom),
          GetInflationEndpoint(selectedChain.id),
        ]).catch((e) => {
          console.error(e)
          return []
        });

        // Query this info in parallel to speed up the loading time
        // because the requested data is independent from each other
        const [inflation, allianceCoins] = await Promise.all([
          ParseInflation(selectedChain.id, chainInfoRes[2]),
          QueryLP(selectedChain.allianceCoins)
        ])

        selectedChain.allianceCoins = allianceCoins;

        // If no error occured, set the data
        // otherwise, keep the default data
        if (chainInfoRes != undefined) {
          let tableState = new TableState(
            selectedChain,
            _allianceAssetRes,
            _prices,
            chainInfoRes[0].params,
            chainInfoRes[1],
            inflation,
          );
          setTableState(tableState)
        }
        setIsLoading(false);
      })();
    }
  }, [selectedChain]);

  return (
    <section className="w-full flex-col">
      <h1 className="head_text">
        <span className="terra_gradient">Explore Alliance</span>
      </h1>
      <span className="font-bold">Built by Big labs</span>
      <div className="info_text_bold mt-8">
        <h3>Alliance allows blockchains to trade yield with each other.</h3>
      </div>
      <div className="info_text mt-2">
        <h3>
          Learn more about Alliance{" "}
          <Link href="https://docs.alliance.terra.money/">
            <u>here</u>
          </Link>
        </h3>
      </div>
      <div className="info_text mt-2">
        <h3>
          <Link href="https://twitter.com/terra_money/status/1695426843787305313">
            <u>Stake</u>
          </Link>
          {" "}Alliance assets on Terra
        </h3>
      </div>
      <div className="flex flex-col pt-3 mt-12 overflow-auto">
        <div className="flex gap-3">
          {Kpis.map((kpi) => <Kpi key={kpi.id} kpi={kpi} data={prices[kpi.token]} />)}
        </div>
      </div>
      <div className="flex w-full flex-col lg:flex-row gap-3">
        <div className="w-full lg:w-6/6">
          <Card name="Assets">
            <Suspense fallback={<CSSLoader />}>
              <Table tableState={tableState} isLoading={isLoading} />
            </Suspense>
          </Card>
        </div>
      </div>
    </section>
  );
}
