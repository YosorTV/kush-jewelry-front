'use client';

import { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useFilters } from '@/store';

import { Input } from '@/components/elements';

type TCategory = {
  id: string;
  text: string;
};

export const CategoryList = () => {
  const state = useFilters();

  const t = useTranslations('category');

  const categories: TCategory[] = [
    { id: `category-${1}`, text: 'rings' },
    { id: `category-${2}`, text: 'bracelets' },
    { id: `category-${3}`, text: 'necklaces' },
    { id: `category-${4}`, text: 'earrings' }
  ];

  const handleCategoryChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = target;
    const { categories } = state.options;

    const newCategories = checked ? [...categories, value] : categories.filter((category) => category !== value);

    state.onFilter({ key: 'categories', value: newCategories });
  };

  const printCategoryList = (el: TCategory) => (
    <Input
      key={el.id}
      id={el.id}
      name='category'
      label={t(el.text)}
      type='checkbox'
      value={el.text}
      checked={state.options.categories.includes(el.text)}
      onChange={handleCategoryChange}
      className='checkbox checked:fill-base-200'
      labelStyle='text-base-200 font-medium text-lg cursor-pointer'
      containerClass='flex-row flex-row-reverse justify-end items-center gap-x-3'
    />
  );

  return <div className='form-control gap-y-3'>{categories.map(printCategoryList)}</div>;
};
