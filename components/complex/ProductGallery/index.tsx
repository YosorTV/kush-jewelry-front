'use client';

import { useMemo } from 'react';

import { ProductCarousel, StrapiImage } from '@/components/simple';

import { Zoom } from '@/components/elements';

import { getImgGrid } from '@/lib';

import { useScreen } from '@/lib/hooks';

export const ProductGallery = ({ images = [] }: { images: any[] }) => {
  const { xl } = useScreen();

  const gallery = getImgGrid({ images });

  const printImage = (image: any) => {
    return (
      <li key={image.id} id={image.id} className='h-full overflow-clip'>
        <Zoom>
          <StrapiImage
            priority
            src={image.url}
            width={image.width}
            height={image.height}
            formats={image.formats}
            alt={image.alternativeText}
            className='aspect-square h-[468px] w-full cursor-pointer object-cover'
          />
        </Zoom>
      </li>
    );
  };

  const printGallery = useMemo(() => {
    if (xl) {
      return <ul className='grid w-full grid-cols-fluid gap-3 md:grid-cols-2'>{gallery.map(printImage)}</ul>;
    } else {
      return <ProductCarousel data={images} options={{ loop: true }} containerClass='lg:hidden w-svw' />;
    }
  }, [xl, gallery, images]);

  return (
    <section className='w-full bg-neutral xl:w-[50svw] xl:bg-transparent' aria-label='Product gallery'>
      {printGallery}
    </section>
  );
};
