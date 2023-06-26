import { Pill } from '@/types/ResponseTypes';
import { Tooltip } from '@nextui-org/react';

export default function Pill({ pill, data }: { pill: Pill, data?: any }) {
  const percentage = parseFloat(data?.change24h ?? '0');

  return (
    <div className="flex min-w-1/2 md:min-w-1/4 custom_card gap-3">
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
      <div className="flex flex-col w-full">
        <h2>${parseFloat(data?.usd ?? '0').toLocaleString('en-US')}</h2>
        <h3 className={`${percentage < 0 ? 'text-red-400' : 'text-green-500'}`}>
          {
            percentage < 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
            )
          }
          {percentage.toLocaleString('en-US')}%
        </h3>
      </div>
    </div>
  );
}