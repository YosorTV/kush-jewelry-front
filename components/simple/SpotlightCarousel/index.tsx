'use client';

import { FC } from 'react';

import { Product } from '@/types/components';

import { CategoryCard } from '@/components/elements';
import Carousel from '@/components/elements/Carousel';

type PropType = {
  data: Product[];
  title: string;
  currency: number;
  locale: string;
};

const SpotlightCarousel: FC<PropType> = ({ data = [], title, currency, locale }) => {
  const printSpotlightCard = (product: Product) => {
    return <CategoryCard data={product} key={product.id} currency={currency} locale={locale} />;
  };

  return (
    <Carousel
      autoScroll
      format='standart'
      title={title}
      total={data.length}
      options={{ startIndex: 0, loop: data.length > 3, align: 'start' }}
      titleClass='py-3 md:py-6 text-white'
      className='px-2.5 pb-3 lg:px-6 lg:pb-6'
      fill='fill-white'
    >
      {data.map(printSpotlightCard)}
    </Carousel>
  );
};

export default SpotlightCarousel;
