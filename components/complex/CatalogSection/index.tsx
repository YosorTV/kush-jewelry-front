import { FC } from 'react';
import { Session } from 'next-auth';

import { ProductsController } from '@/components/simple';
import CategoryFilterButton from '@/components/simple/CatagoryFilterButton';
import ProductList from '@/components/simple/ProductList';

interface ICatalogSection {
  title?: string;
  filterForm?: any;
  currency?: number;
  session?: Session | null;
  device?: string;
}

export const CatalogSection: FC<ICatalogSection> = ({ title, session, currency, device = 'desktop', ...rest }) => {
  return (
    <section className='flex min-h-[640px] flex-col p-5 md:p-6'>
      <ProductsController title={title} />
      <CategoryFilterButton />
      <ProductList session={session} currency={currency} device={device} {...rest} />
    </section>
  );
};
