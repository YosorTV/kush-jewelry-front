import { completeLookAdapter } from '@/adapters/product';
import { auth } from '@/auth';
import Carousel from '@/components/elements/Carousel';
import { ProductCard } from '@/components/simple';
import { getCurrency, getProductsData } from '@/services';
import { Product } from '@/types/components';
import { getTranslations } from 'next-intl/server';
import { FC } from 'react';

interface ICompleteLook {
  locale: string;
  category: string;
  currency: number;
}

export const CompleteLook: FC<ICompleteLook> = async ({ locale, category }) => {
  const { data: products } = await getProductsData({ locale });
  const t = await getTranslations('system');
  const session = await auth();
  const currency = await getCurrency();

  const data = completeLookAdapter({ products, category });

  const printProduct = (product: Product) => {
    return (
      <ProductCard
        t={t}
        currency={currency}
        session={session}
        key={product.id}
        product={product}
        imgClassName='h-80 md:h-96'
        className='embla__slide cursor-grab active:cursor-grabbing'
      />
    );
  };

  return (
    <Carousel
      format='standart'
      title={t('look')}
      titleClass='text-base-200 py-6 xs:py-3 pl-3 md:pl-0'
      className='w-svw px-5 pb-10'
      options={{ loop: true, align: 'start' }}
    >
      {data.map(printProduct)}
    </Carousel>
  );
};
