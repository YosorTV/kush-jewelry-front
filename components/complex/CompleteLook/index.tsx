import { Session } from 'next-auth';
import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

import Carousel from '@/components/elements/Carousel';
import { ProductCard } from '@/components/simple';

import { Product } from '@/types/components';

import { completeLookAdapter } from '@/adapters/product';

interface ICompleteLook {
  category: string;
  currency: number;
  session: Session;
  products: any[];
}

export const CompleteLook: FC<ICompleteLook> = async ({ products, currency, category, session }) => {
  const t = await getTranslations('system');

  const data = completeLookAdapter({ products, category });

  const printProduct = (product: Product) => {
    return (
      <ProductCard
        t={t}
        currency={currency}
        session={session}
        key={product.id}
        product={product}
        imgClassName='h-112 sm:h-120'
        className='embla__slide cursor-grab active:cursor-grabbing'
      />
    );
  };

  return (
    <Carousel
      title={t('look')}
      format='standart'
      total={data.length}
      className='w-svw px-3 md:px-6'
      titleClass='text-base-200 !text-xl md:py-5 py-2.5'
      options={{ loop: true, align: 'start' }}
    >
      {data.map(printProduct)}
    </Carousel>
  );
};
