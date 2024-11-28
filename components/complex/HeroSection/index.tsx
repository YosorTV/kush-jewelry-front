import { FC } from 'react';

import { NextLink, Title } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import AnimatedTag from '@/components/simple/AnimatedTag';
import { IHeroSection } from '@/types/components/complex/hero-section';

export const HeroSection: FC<IHeroSection> = ({ data }) => {
  return (
    <section className='group relative flex flex-col items-center justify-center'>
      <div className='relative h-dvh w-dvw'>
        <StrapiImage
          fill
          overlay
          priority
          sizes='100vw'
          src={data.image.url}
          formats={data.image.formats}
          alt={data.image.alternativeText}
          className='aspect-video h-full w-full animate-zoomOut object-cover transition-transform duration-300 ease-out'
        />
        <Title level='1' variant='subheading' className='absolute-center px-6 text-center text-base-300'>
          {data.title}
        </Title>
        <NextLink
          href={data?.link?.url}
          className='absolute-center link-hover link bottom-10 top-[90%] h-min w-svw !items-end text-base-300 underline-offset-8'
        >
          {data?.link?.text}
        </NextLink>
      </div>
      {data?.description && (
        <AnimatedTag tag='div' className='relative px-3 py-6 text-center leading-tight md:px-6 md:py-10'>
          <Title level='3' variant='subheading'>
            {data.description}
          </Title>
        </AnimatedTag>
      )}
    </section>
  );
};
