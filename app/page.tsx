"use client";

import Card from "@/components/Card";
import Graph from "@/components/Graph";
import LoadingComponent from "@/components/LoadingComponent";
import Pill from "@/components/Pill";
import Table from "@/components/Table";
import { MOCK_PRICES, pills, supportedChains } from "@/const/Variables";
import { QueryForAlliances } from "@/lib/AllianceQuery";
import { Alliance, AllianceResponse } from "@/types/ResponseTypes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [usdValues, setUsdValues] = useState<any>();
  const [data, setData] = useState<Alliance[]>([]);
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!usdValues) {
        setLoading(true);
        const result = await fetch("https://price.api.tfm.com/tokens/?limit=1500");
        const json = await result.json();
        setUsdValues({
          ...json,
          ...MOCK_PRICES,
        });
        setLoading(false);
      }

      const chain = supportedChains[params.get("selected") ?? "carbon"];
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
        <h3>Alliance allows blockchains to trade yield with each other.</h3>
      </div>
      <div className="info_text mt-2">
        <h3>
          Learn more about Alliance{" "}
          <Link href="https://alliance.terra.money/">
            <u>here</u>
          </Link>
        </h3>
      </div>
      <div className="flex flex-col pt-3 pb-3 mt-12 overflow-auto">
        <LoadingComponent isLoading={loading} values={usdValues}>
          <div className="flex gap-3">{usdValues && pills.map((pill) => <Pill key={pill.id} pill={pill} data={usdValues[pill.token]} />)}</div>
        </LoadingComponent>
      </div>
      <div className="flex w-full flex-col lg:flex-row gap-3">
        <div className="w-full lg:w-4/6">
          <Card name="Assets">
            <Table usdValues={usdValues} values={data} />
          </Card>
        </div>
        <div className="w-full lg:w-2/6">
          <Card name="Overview" className="flex flex-col items-center overflow-auto">
            <Graph values={data} />
          </Card>
        </div>
      </div>
    </section>
  );
}
