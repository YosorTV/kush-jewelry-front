'use client';

import { cn } from '@/lib';
import { useCart } from '@/store';
import { FC } from 'react';

interface ISizeOptions {
  sizes: any[];
  data: any[];
  title: string;
}

export const SizeOptions: FC<ISizeOptions> = ({ sizes, title }) => {
  const state = useCart();

  const availableSizes = sizes.map(({ size }) => size).sort((a, b) => a - b);

  const printSize = (size: number) => {
    return (
      <label key={size} className='w-min'>
        <input type='radio' name='size' value={size} className='hidden' disabled={availableSizes.includes(size)} />
        <span
          onClick={() => state.onAdd({ key: 'size', value: size })}
          className={cn(
            'flex h-14 w-14 cursor-pointer items-center justify-center rounded-sm border-2 border-base-200 bg-base-100 p-2 font-semibold text-base-200 drop-shadow-md transition-all duration-300',
            state.formState.size === size && 'border-base-300 bg-neutral text-base-300',
            availableSizes.includes(size)
              ? 'hover:border-base-300 hover:bg-neutral hover:text-base-300'
              : 'cursor-not-allowed border-gray-500 bg-gray-500 opacity-50'
          )}
        >
          {size}
        </span>
      </label>
    );
  };

  return (
    <div className='flex flex-col gap-y-3'>
      <p className='text-lg font-semibold'>{title}</p>
      {availableSizes.length > 0 && <div className='flex flex-wrap gap-3'>{availableSizes.map(printSize)}</div>}
    </div>
  );
};
