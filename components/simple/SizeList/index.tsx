'use client';

import { ChangeEvent } from 'react';

import { useFilters } from '@/store';

import { Input } from '@/components/elements';

type TSize = {
  id: number;
  size: string;
  title: string;
};

export const SizeList = ({ data }: any) => {
  const state = useFilters();

  const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    const { sizes } = state.options;

    const newSizes = checked ? [...sizes, value] : sizes.filter((size) => size !== value);

    state.onFilter({ key: 'sizes', value: newSizes as string[] });
  };

  const printSizeList = (el: TSize) => {
    return (
      <Input
        key={el.id}
        id={el.size}
        name={el.size}
        label={el.size}
        type='checkbox'
        value={el.size}
        checked={state.options?.sizes?.includes(el.title)}
        onChange={handleSizeChange}
        className='checkbox checked:fill-base-200'
        labelStyle='text-base-200 font-medium text-lg cursor-pointer'
        containerClass='flex-row flex-row-reverse justify-end items-center gap-x-3'
      />
    );
  };

  return <div className='form-control gap-y-3'>{data.map(printSizeList)}</div>;
};
