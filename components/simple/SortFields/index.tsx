'use client';

import { FC } from 'react';

import { Input } from '@/components/elements';

import { ISortFields, TSortField } from '@/types/components';
import { useTranslations } from 'next-intl';
import { useFilters } from '@/store';

export const SortFields: FC<ISortFields> = ({ data }) => {
  const t = useTranslations('sort');
  const state = useFilters();

  const handleChange = (name: string) => {
    state.onFilter({ key: 'sortBy', value: name });
  };

  const printSortField = (field: TSortField) => (
    <Input
      type='radio'
      name='sort'
      key={field.id}
      id={field.id as string}
      value={field.name}
      label={t(field.label)}
      checked={state.options.sortBy === field.name}
      onChange={() => handleChange(field.name)}
      className='radio checked:bg-base-200'
      labelStyle='text-base-200 font-medium text-lg cursor-pointer'
      containerClass='flex-row flex-row-reverse justify-end items-center gap-x-6'
    />
  );

  return data.map(printSortField);
};
