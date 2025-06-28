import { FC } from 'react';

import { cn } from '@/lib';

import { Lottie } from '@/components/elements';
import { ProductCard } from '@/components/simple';

import { IProductListGroup } from '@/types/components';

import lottieAnim from '@/public/LottieEmplyList.json';

export const ProductListGroup: FC<IProductListGroup> = async ({
  data,
  session,
  currency,
  t,
  className = 'grid-cols-fluid '
}) => {
  if (!data?.length) {
    return (
      <Lottie text={t('emptyList')} src={lottieAnim} className='relative my-6 gap-y-6' playerClassName='h-96 w-96' />
    );
  }

  return (
    <div className={cn('mb-5 grid min-h-80 gap-x-3 gap-y-6', className)}>
      {data.map((product) => (
        <ProductCard key={product.id} session={session} product={product} currency={currency} className='col-span-1' />
      ))}
    </div>
  );
};
