"use client";

import CSSLoader from "../components/CSSLoader";
import Card from "../components/Card";
import Kpi from "../components/Kpi";
import Table from "../components/Table";
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from "../const/chains";
import { QueryAlliances } from "../lib/AllianceQuery";
import { AllianceAsset } from "@terra-money/feather.js/dist/client/lcd/api/AllianceAPI";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { mergePrices, Prices, TerraPriceServerResponse } from "../models/Prices";
import { Kpis } from "../const/kpis";

export default function Home() {
  const [prices, setPrices] = useState<Prices>({});
  const [data, setData] = useState<AllianceAsset[] | undefined>(undefined);
  const params = useSearchParams();
  const selectedChain = SUPPORTED_CHAINS[params.get("selected") ?? DEFAULT_CHAIN];

  useEffect(() => {
    setData(undefined);
    (async () => {
      // If prices are not loaded, load them from the API(s)
      // Otherwise, use the cached prices
      if (Object.keys(prices).length === 0) {
        const res = await Promise.all([
          fetch("https://price.api.tfm.com/tokens/?limit=1500"),
          fetch("https://pisco-price-server.terra.dev/latest")
        ]);
        const [tfmPrices, terraOraclePrices]: [Prices, TerraPriceServerResponse] = await Promise.all([res[0].json(), res[1].json()]);
        let prices = mergePrices(tfmPrices, terraOraclePrices);

        setPrices(prices);
      }

      const res = await QueryAlliances(selectedChain).catch(() => []);

      setData(res);
    })();
  }, [params]);

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
      <div className="flex flex-col pt-3 pb-3 mt-12 overflow-auto">
        <div className="flex gap-3">
          {Kpis.map((kpi) => <Kpi key={kpi.id} kpi={kpi} data={prices[kpi.token]} />)}
        </div>
      </div>
      <div className="flex w-full flex-col lg:flex-row gap-3">
        <div className="w-full lg:w-6/6">
          <Card name="Assets">
            <Suspense fallback={<CSSLoader />}>
              <Table prices={prices} allianceAssets={data} selectedChain={selectedChain} />
            </Suspense>
          </Card>
        </div>
        {/* <div className="w-full lg:w-2/6">
          <Card name="Overview" className="flex flex-col items-center overflow-auto">
            <Suspense fallback={<CSSLoader />}>
              <Graph values={data} />
            </Suspense>
          </Card>
        </div> */}
      </div>
    </section>
  );
}
