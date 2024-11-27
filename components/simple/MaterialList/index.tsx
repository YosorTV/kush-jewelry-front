'use client';

import { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useFilters } from '@/store';

import { Input } from '@/components/elements';

type TMaterial = {
  id: number;
  title: string;
  value: string;
};

export const MaterialList = ({ data }: any) => {
  const state = useFilters();

  const t = useTranslations('material');

  const handleMaterialChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = target;
    const { materials } = state.options;

    const newMaterials = checked ? [...materials, value] : materials.filter((material) => material !== value);

    state.onFilter({ key: 'materials', value: newMaterials });
  };

  const printMaterialList = (el: TMaterial) => (
    <Input
      key={el.id}
      id={String(el.id)}
      name='material'
      label={t(el.value)}
      type='checkbox'
      value={el.value}
      checked={state.options?.materials?.includes(el.value)}
      onChange={handleMaterialChange}
      className='checkbox checked:fill-base-200'
      labelStyle='text-base-200 font-medium text-lg cursor-pointer'
      containerClass='flex-row flex-row-reverse justify-end items-center gap-x-3'
    />
  );

  return <div className='form-control gap-y-3'>{data.map(printMaterialList)}</div>;
};
