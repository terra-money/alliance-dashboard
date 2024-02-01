import { Pill } from '@/types/ResponseTypes';
import { Tooltip } from '@nextui-org/react';

export default function Pill({ pill, data }: { pill: Pill, data?: any }) {
  return (
    <div className="flex custom_card gap-3">
      <div className='flex items-center'>
        <Tooltip content={pill.name}>
          <img
            src={pill.symbol}
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
    </div>
  );
}