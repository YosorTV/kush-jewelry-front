'use client';

import { useCallback } from 'react';
import { Range } from 'react-range';

import { useFilters } from '@/store';

import { useCurrency } from '@/lib/hooks';
import { formatPrice } from '@/helpers/formatters';

import { RangeThumb, RangeTrack } from '@/components/elements';

export const RangeSlider = () => {
  const state = useFilters();
  const currency = useCurrency();

  const min = formatPrice(state.options.price[0], currency);
  const max = formatPrice(state.options.price[1], currency);

  const handleRangeChange = useCallback(
    (values: number[]) => {
      state.onFilter({ key: 'price', value: values });
    },
    [state]
  );

  return (
    <div className='flex w-full flex-col px-5'>
      <Range
        step={1}
        min={1}
        max={3000}
        values={state.options.price}
        onChange={handleRangeChange}
        renderTrack={({ props, children }) => (
          <RangeTrack props={props} max={Number(max)} min={Number(min)}>
            {children}
          </RangeTrack>
        )}
        renderThumb={({ props }) => <RangeThumb key={props.key} props={props} />}
      />
      <div className='mt-2 flex w-full justify-between'>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
