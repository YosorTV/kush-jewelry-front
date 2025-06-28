import { FC } from 'react';

import { getTranslations } from 'next-intl/server';

import { getProductsData } from '@/services';

import { Title } from '@/components/elements';
import { ProductListGroup } from '@/components/simple';

import { cn } from '@/lib';

import { IProductsList } from '@/types/components';
import PaginateController from '../PaginateController';

const ProductList: FC<IProductsList> = async ({ className, title, session, currency, ...rest }) => {
  const { data, meta } = await getProductsData({ locale: rest.locale, ...rest });

  const t = await getTranslations('system');

  const isLastPage = meta?.pagination?.page === meta?.pagination?.pageCount || !data.length;

  return (
    <section className={cn('relative mt-6 flex h-max flex-col justify-between gap-y-6', className)}>
      {title && (
        <Title level='3' variant='subheading' className='text-2xl uppercase text-base-200 xs:text-4xl lg:text-5xl'>
          {title}
        </Title>
      )}
      <ProductListGroup
        data={data}
        session={session ?? null}
        currency={currency ?? 41}
        t={t}
        className='grid-cols-fluid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
      />
      <PaginateController disabled={isLastPage} total={meta?.pagination?.total} perPage={meta?.pagination?.pageSize} />
    </section>
  );
};

export default ProductList;
