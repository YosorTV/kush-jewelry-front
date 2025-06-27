import { FC } from 'react';

import { NextLink, Title } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import { IHeroSection } from '@/types/components/complex/hero-section';

export const HeroSection: FC<IHeroSection> = ({ data }) => {
  const height = data.image.formats.large.height;
  const width = data.image.formats.large.width;

  return (
    <section className='group relative flex flex-col items-center justify-center'>
      <div className='relative aspect-square md:aspect-video h-full w-full max-h-[82dvh]'>
        <StrapiImage
          overlay
          priority
          loading='eager'
          sizes='100vw'
          width={width}
          height={height}
          src={data.image.url}
          formats={data.image.formats}
          alt={data.image.alternativeText}
          className='aspect-square h-full w-full object-cover transition-transform duration-300 ease-out md:aspect-video'
        />
        {data?.title && (
          <Title level='1' variant='subheading' className='absolute-center px-6 text-center text-base-300'>
            {data.title}
          </Title>
        )}
        {data?.link && (
            <NextLink
              href={data?.link?.url}
              className='absolute-center link-hover link bottom-10 top-[90%] h-min w-svw !items-end text-base-300 underline-offset-8'
            >
              {data?.link?.text}
            </NextLink>
        )}
      </div>
      {data?.description && (
        <div className='relative px-5 py-6 text-center leading-tight md:px-6 md:py-10'>
          <Title level='3' variant='subheading'>
            {data.description}
          </Title>
        </div>
      )}
    </section>
  );
};
