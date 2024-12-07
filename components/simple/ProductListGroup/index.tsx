import { FC } from 'react';
import { getTranslations } from 'next-intl/server';

import { cn } from '@/lib';

import { auth } from '@/auth';
import { getCurrency } from '@/services';

import { Lottie } from '@/components/elements';
import { ProductCard } from '@/components/simple';

import { IProductListGroup, Product } from '@/types/components';

import lottieAnim from '@/public/LottieEmplyList.json';

export const ProductListGroup: FC<IProductListGroup> = async ({ data, className = 'grid-cols-fluid ' }) => {
  const session = await auth();
  const currency = await getCurrency();
  const t = await getTranslations('system');

  if (!data?.length) {
    return (
      <Lottie text={t('emptyList')} src={lottieAnim} className='relative my-6 gap-y-6' playerClassName='h-96 w-96' />
    );
  }

  const printProduct = (product: Product) => {
    return (
      <ProductCard session={session} key={product.id} product={product} currency={currency} className='col-span-1' />
    );
  };

  return <div className={cn('mb-5 grid min-h-80 gap-x-3 gap-y-6', className)}>{data.map(printProduct)}</div>;
};
