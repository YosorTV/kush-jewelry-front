import { FC } from 'react';

import { ProductsController, AnimatedTag } from '@/components/simple';
import CategoryFilterButton from '@/components/simple/CatagoryFilterButton';

import dynamic from 'next/dynamic';

interface ICatalogSection {
  title?: string;
  filterForm?: any;
}

const ProductList = dynamic(() => import('@/components/simple/ProductList'));

export const CatalogSection: FC<ICatalogSection> = async ({ title, ...rest }) => {
  return (
    <AnimatedTag tag='section' className='flex min-h-[640px] flex-col p-5 md:p-6'>
      <ProductsController title={title} />
      <CategoryFilterButton />
      <ProductList {...rest} />
    </AnimatedTag>
  );
};
