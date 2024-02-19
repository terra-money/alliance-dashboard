import { Tooltip } from '@nextui-org/react';
import LoadingComponent from './LoadingComponent';

export interface KpiData {
  id: number;
  name: string;
  symbol: string;
  token: string;
}

export default function Kpi({ kpi, data }: { kpi: KpiData, data?: any }) {
  return (
    <div className="flex custom_card gap-3">
      <LoadingComponent isLoading={data === undefined} values={data}>
        <div className='flex items-center'>
          <Tooltip content={kpi.name}>
            <img
              src={kpi.symbol}
              alt='Coin image'
              width={45}
              height={45}
              className="object-contain"
            />
          </Tooltip>
        </div>
        <div className="flex items-center w-full">
          <h2>${parseFloat(data?.usd ?? '0').toLocaleString('en-US', {
            minimumFractionDigits: 4
          })}</h2>
        </div>
      </LoadingComponent>
    </div>
  );
}