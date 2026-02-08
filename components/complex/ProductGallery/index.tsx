'use client';

import { useMemo } from 'react';

import { ProductCarousel, StrapiImage } from '@/components/simple';

import { Zoom } from '@/components/elements';

import { getImgGrid } from '@/lib';

import { useScreen } from '@/lib/hooks';

export const ProductGallery = ({ images = [] }: { images: any[] }) => {
  const { xl } = useScreen();

  const gallery = getImgGrid({ images });

  const printImage = (image: any, index: number) => {
    const width =
      image.formats?.large?.width ?? image.formats?.medium?.width ?? image.width ?? 828;
    const height =
      image.formats?.large?.height ?? image.formats?.medium?.height ?? image.height ?? 828;

    return (
      <li key={image.id} id={image.id} className='h-full overflow-clip'>
        <Zoom>
          <div className='relative aspect-square h-full w-full min-h-0 overflow-hidden'>
            <StrapiImage
              priority={index < 2}
              loading={index < 2 ? 'eager' : 'lazy'}
              src={image.url}
              width={width}
              height={height}
              formats={image.formats}
              alt={image.alternativeText}
              imageType='gallery'
              className='aspect-square h-full w-full cursor-pointer object-cover'
            />
          </div>
        </Zoom>
      </li>
    );
  };

  const printGallery = useMemo(() => {
    if (xl) {
      return <ul className='grid w-full grid-cols-fluid gap-3 md:grid-cols-2'>{gallery.map((img: any, i: number) => printImage(img, i))}</ul>;
    }

    return <ProductCarousel data={images} />;
  }, [xl, gallery, images]);

  return (
    <section className='w-full bg-neutral xl:w-[50svw] xl:bg-transparent' aria-label='Product gallery'>
      {printGallery}
    </section>
  );
};
