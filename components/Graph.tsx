import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, ChartOptions, ChartData, Tooltip, Legend, TooltipItem } from 'chart.js';
import { useEffect, useState } from 'react';
import { Alliance } from '@/types/ResponseTypes';
import { supportedChains } from '@/const/Variables';
import { useSearchParams } from 'next/navigation';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Graph({ values }: { values: Alliance[] }) {
  const [valueByAsset, setValueByAsset] = useState<Map<string, number>>(new Map<string, number>());
  const [totalSupply, setTotalSupply] = useState<number>(1);
  const [colors, setColors] = useState<string[]>();
  const params = useSearchParams();

  const createLabel = (tooltipItems: TooltipItem<"doughnut">): string => {
    return `${((tooltipItems.parsed / totalSupply) * 100).toFixed(2)}%`;
  };

  useEffect(() => {
    let supply = 0;
    const map = new Map<string, number>();
    let curColors = new Array<string>();

    const chain = params.get('selected') ?? 'carbon';

    values?.map(val => {
      const intTokens = parseInt(val.total_tokens);
      supply += intTokens;
      map.set(supportedChains[chain][val.denom].name, intTokens);
      curColors.push(supportedChains[chain][val.denom].color);
    });

    setTotalSupply(supply);
    setValueByAsset(map);
    setColors(curColors);

  }, [values]);

  const data: ChartData<"doughnut"> = {
    labels: Array.from(valueByAsset.keys()),
    datasets: [{
      label: 'Total Percentage',
      data: Array.from(valueByAsset.values()),
      hoverOffset: 4,
      backgroundColor: colors
    }]
  };

  const options: ChartOptions = {
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      tooltip: {
        enabled: true,
        boxPadding: 10,
        padding: 15,
        callbacks: {
          label: createLabel
        }
      }
    }
  }

  return (
    values.length > 0 ? <Doughnut data={data} options={options} /> : <div>
      <p className="p-3 text-center font-bold font-inter">No data for the selected chain</p>
    </div>
  )
}