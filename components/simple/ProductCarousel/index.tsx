'use client';

import { FC } from 'react';

import { Zoom } from '@/components/elements';

import Carousel from '@/components/elements/Carousel';
import { StrapiImage } from '../StrapiImage';

type PropType = {
  data: any[];
};

const DEFAULT_CAROUSEL_SIZE = 828;

export const ProductCarousel: FC<PropType> = ({ data }) => {
  const printProductSlide = (image: any, index: number) => {
    const width = image.formats?.large?.width ?? image.formats?.medium?.width ?? image.width ?? DEFAULT_CAROUSEL_SIZE;
    const height =
      image.formats?.large?.height ?? image.formats?.medium?.height ?? image.height ?? DEFAULT_CAROUSEL_SIZE;

    return (
      <li key={image.id} className='embla__slide isolate overflow-hidden hover:cursor-grab active:cursor-grabbing'>
        <Zoom key={image.id}>
          <div className='relative aspect-square h-full min-h-0 w-full overflow-hidden'>
            <StrapiImage
              key={image.id}
              formats={image.formats}
              alt={image.alternativeText}
              src={image.url}
              height={height}
              width={width}
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              imageType='carousel'
              className='aspect-square h-full max-h-[50dvh] w-full object-cover'
            />
          </div>
        </Zoom>
      </li>
    );
  };

  return (
    <Carousel
      autoScroll
      autoScrollOnMobile
      format='standart'
      total={data.length}
      options={{ loop: data.length > 3 }}
      titleClass='pt-1.5 md:py-0 text-white'
      className='w-svw px-5 pb-5 xl:hidden xl:px-6'
      fill='fill-white'
    >
      {data.map((img, i) => printProductSlide(img, i))}
    </Carousel>
  );
};
