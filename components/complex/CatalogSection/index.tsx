import { ProductsController } from '@/components/simple';
import CategoryFilterButton from '@/components/simple/CatagoryFilterButton';
import { ProductList } from '@/components/simple/ProductList';

import { FC } from 'react';

interface ICatalogSection {
  title?: string;
  filterForm?: any;
}

export const CatalogSection: FC<ICatalogSection> = async ({ title, ...rest }) => {
  return (
    <section className='flex min-h-[640px] flex-col gap-y-2.5 p-2.5 md:p-5'>
      <ProductsController title={title} />
      <CategoryFilterButton />
      <ProductList {...rest} />
    </section>
  );
};
