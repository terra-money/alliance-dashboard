'use client';

import Card from "@/components/Card";
import Graph from "@/components/Graph";
import Pill from "@/components/Pill";
import Table from "@/components/Table";
import { pills, supportedChains } from "@/const/Variables";
import { Alliance, AllianceParams, AllianceParamsResponse, AllianceResponse, TotalSupply, TotalSupplyAmount } from "@/types/ResponseTypes";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [usdValues, setUsdValues] = useState<any>();
  const [data, setData] = useState<{
    chainValues: Alliance[],
    chainParams: AllianceParams,
    totalSupply: TotalSupply,
    currentChain: any,
  }>({
    chainValues: [],
    chainParams: {
      last_take_rate_claim_time: '',
      reward_delay_time: '',
      take_rate_claim_interval: ''
    },
    totalSupply: {
      amount: '',
      denom: ''
    },
    currentChain: {}
  });
  const params = useSearchParams();

  useEffect(() => {
    ; (async () => {
      if (!usdValues) {
        const result = await fetch('https://price.api.tfm.com/tokens/?limit=1500');
        const json = await result.json();
        setUsdValues(json);
      }

      const chain = supportedChains[params.get('selected') ?? 'carbon'];

      try {
        const chainResponse = await fetch(`${chain.lcd}/terra/alliances?pagination.limit=100`);
        const resp = await chainResponse.json() as AllianceResponse;
        const chainParams = await fetch(`${chain.lcd}/terra/alliances/params`);
        const params = await chainParams.json() as AllianceParamsResponse;
        const totalSupply = await fetch(`${chain.lcd}/cosmos/bank/v1beta1/supply/by_denom?denom=${chain.denom}`);
        const supply = await totalSupply.json() as TotalSupplyAmount;

        setData({
          chainValues: resp.alliances,
          chainParams: params.params,
          totalSupply: supply.amount,
          currentChain: chain,
        });
      } catch (error) {
        setData({
          chainValues: [...[]],
          chainParams: {
            last_take_rate_claim_time: '',
            reward_delay_time: '',
            take_rate_claim_interval: ''
          },
          totalSupply: {
            amount: '',
            denom: ''
          },
          currentChain: chain,
        });
      }
    })()
  }, [params]);

  return (
    <section className='w-full flex-col'>
      <h1 className="head_text">
        <span className='terra_gradient'>Explore Alliance</span>
      </h1>
      <span className="font-bold">Powered by Big labs</span>
      <div className="flex pt-3 pb-3 gap-3 mt-12 overflow-auto">
        {
          usdValues && pills.map(pill => {
            return <Pill key={pill.id} asset={pill.symbol} data={usdValues[pill.token]} />
          })
        }
      </div>
      <div className="flex w-full flex-col lg:flex-row gap-3">
        <div className="w-full lg:w-4/6">
          <Card name="Assets">
            <Table
              values={data.chainValues}
              chainParams={data.chainParams}
              usdValues={usdValues}
              totalSupply={data.totalSupply}
              currentChain={data.currentChain}
            />
          </Card>
        </div>
        <div className="w-full lg:w-2/6">
          <Card name="Overview" className="flex flex-col items-center overflow-auto">
            <Graph values={data.chainValues} />
          </Card>
        </div>
      </div>
    </section>
  )
}
