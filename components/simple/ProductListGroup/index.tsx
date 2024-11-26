import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

import { cn } from '@/lib';

import { Lottie } from '@/components/elements/Lottie';

import { Product } from '@/types/components';
import { ProductCard } from '../ProductCard';

import { auth } from '@/auth';
import lottieAnim from '@/public/LottieEmplyList.json';
import { getCurrency } from '@/services';

interface IProductListGroup {
  data: Product[];
  className?: string;
}

const ProductListGroup: FC<IProductListGroup> = async ({ data, className = 'grid-cols-fluid ' }) => {
  const currency = await getCurrency();
  const session = await auth();
  const t = await getTranslations('system');

  const printProduct = (product: Product) => {
    return (
      <ProductCard
        t={t}
        session={session}
        key={product.id}
        product={product}
        currency={currency}
        className='col-span-1'
      />
    );
  };

  if (!data?.length) {
    return (
      <Lottie text={t('emptyList')} src={lottieAnim} className='relative my-6 gap-y-5' playerClassName='h-96 w-96' />
    );
  }

  return <div className={cn('mb-5 grid min-h-80 gap-x-2.5 gap-y-5', className)}>{data.map(printProduct)}</div>;
};

export default ProductListGroup;
