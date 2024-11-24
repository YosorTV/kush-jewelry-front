import { getLocale } from 'next-intl/server';
import { FC } from 'react';

import { cn } from '@/lib';

import { Title } from '@/components/elements';

import { getProductsData } from '@/services';

import { PaginateController } from '../PaginateController';
import ProductListGroup from '../ProductListGroup';
import AnimatedTag from '../AnimatedTag';

interface IProductsList {
  title?: string;
  className?: string;
  [key: string]: string;
}

export const ProductList: FC<IProductsList> = async ({ className, title, ...rest }) => {
  const locale = await getLocale();

  const { data, meta } = await getProductsData({ locale, ...rest });

  const isLastPage = meta?.pagination?.page === meta?.pagination?.pageCount || !data.length;

  return (
    <AnimatedTag tag='section' className={cn('relative mt-5 flex h-max flex-col justify-between gap-y-5', className)}>
      {title && (
        <Title level='3' variant='subheading' className='text-2xl uppercase text-base-200 xs:text-4xl lg:text-5xl'>
          {title}
        </Title>
      )}
      <ProductListGroup data={data} className='grid-cols-fluid lg:grid-cols-3 2xl:grid-cols-4' />
      <PaginateController disabled={isLastPage} total={meta?.pagination?.total} perPage={meta?.pagination?.pageSize} />
    </AnimatedTag>
  );
};
