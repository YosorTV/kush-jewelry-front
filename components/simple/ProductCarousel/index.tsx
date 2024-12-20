'use client';

import { FC } from 'react';

import { Zoom } from '@/components/elements';

import Carousel from '@/components/elements/Carousel';
import { StrapiImage } from '../StrapiImage';

type PropType = {
  data: any[];
};

export const ProductCarousel: FC<PropType> = ({ data }) => {
  const printProductSlide = (image: any) => {
    return (
      <li key={image.id} className='embla__slide hover:cursor-grab active:cursor-grabbing'>
        <Zoom>
          <StrapiImage
            formats={image.formats}
            alt={image.alternativeText}
            src={image.url}
            height={image.height}
            width={image.width}
            className='aspect-square h-full w-full object-cover sm:h-[468px]'
          />
        </Zoom>
      </li>
    );
  };

  return (
    <Carousel
      autoScroll
      format='standart'
      total={data.length}
      options={{ loop: data.length > 3 }}
      titleClass='pt-1.5 md:py-0 text-white'
      className='w-svw px-5 pb-5 xl:hidden xl:px-6'
      fill='fill-white'
    >
      {data.map(printProductSlide)}
    </Carousel>
  );
};
