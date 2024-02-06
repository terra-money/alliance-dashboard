"use client";

import CSSLoader from "@/components/CSSLoader";
import Card from "@/components/Card";
import Graph from "@/components/Graph";
import LoadingComponent from "@/components/LoadingComponent";
import Pill from "@/components/Pill";
import Table from "@/components/Table";
import { MOCK_PRICES, defaultChain, pills, supportedChains } from "@/const/Variables";
import { QueryForAlliances } from "@/lib/AllianceQuery";
import { Alliance, AllianceResponse } from "@/types/ResponseTypes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Home() {
  const [usdValues, setUsdValues] = useState<any>();
  const [pillPrices, setPillPrices] = useState<any>(null);
  const [data, setData] = useState<Alliance[]>([]);
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!usdValues || !pillPrices) {
        setLoading(true);
        const result = await fetch("https://price.api.tfm.com/tokens/?limit=1500");
        const json = await result.json();
        setUsdValues({
          ...json,
          ...MOCK_PRICES,
        });

        const priceResult = await fetch("https://pisco-price-server.terra.dev/latest");
        const pillJson = await priceResult.json();
        setPillPrices(Object.fromEntries(pillJson.prices.map((p:any) => {
          return [p.denom, {
            usd: p.price
          }]
        })))
        setLoading(false);
      }

      const chain = supportedChains[params.get("selected") ?? defaultChain];
      let response = [];

      try {
        const resp = await QueryForAlliances(chain);
        response = [...resp.alliances];
      } catch {
        response = [...[]];
      }

      setData(response);
    })();
  }, [params]);

  return (
    <section className="w-full flex-col">
      <h1 className="head_text">
        <span className="terra_gradient">Explore Alliance</span>
      </h1>
      <span className="font-bold">Built by Big labs</span>
      <div className="info_text_bold mt-8">
        <h3>Alliance strengthens decentralized economies through the usage of Alliance assets.</h3>
      </div>
      <div className="info_text mt-2">
        <h3>
          Learn how to <Link href="https://medium.com/terra-money/how-to-stake-alliance-assets-a-step-by-step-guide-8e1b263830c2"><u>stake Alliance assets</u></Link>.
        </h3>
      </div>
      <div className="flex flex-col pt-3 pb-3 mt-12 overflow-auto">
        <LoadingComponent isLoading={loading} values={pillPrices}>
          <div className="flex gap-3">{pillPrices && pills.map((pill) => <Pill key={pill.id} pill={pill} data={pillPrices[pill.token]} />)}</div>
        </LoadingComponent>
      </div>
      <div className="flex w-full flex-col lg:flex-row gap-3">
        <div className="w-full lg:w-6/6">
          <Card name="Assets">
            <Suspense fallback={<CSSLoader />}>
              <Table usdValues={usdValues} values={data} />
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
