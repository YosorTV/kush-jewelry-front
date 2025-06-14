import { FC } from 'react';
import { getTranslations } from 'next-intl/server';

import Carousel from '@/components/elements/Carousel';
import { ProductCard } from '@/components/simple';

import { completeLookAdapter } from '@/adapters/product';

import { ICompleteLook, Product } from '@/types/components';

export const CompleteLook: FC<ICompleteLook> = async ({ products, currency, category, session }) => {
  const t = await getTranslations('system');

  const data = completeLookAdapter({ products, category });

  const printProduct = (product: Product) => {
    return (
      <ProductCard
        currency={currency}
        session={session}
        key={product.id}
        product={product}
        className='embla__slide cursor-grab active:cursor-grabbing'
      />
    );
  };

  return (
    <Carousel
      title={t('look')}
      format='standart'
      total={data.length}
      className='w-dvw px-5 pb-10 md:px-6'
      titleClass='text-base-200 md:py-5 py-2.5'
      options={{ loop: true, align: 'start' }}
    >
      {data.map(printProduct)}
    </Carousel>
  );
};
