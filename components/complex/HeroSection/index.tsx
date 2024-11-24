import { NextLink, Title } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import AnimatedTag from '@/components/simple/AnimatedTag';
import { FC } from 'react';

export const HeroSection: FC<any> = ({ data }) => {
  return (
    <section className='group relative flex flex-col items-center justify-center'>
      <div className='relative h-2md w-full overflow-hidden md:h-2lg'>
        <StrapiImage
          fill
          overlay
          priority
          sizes='100vw'
          src={data.image.url}
          formats={data.image.formats}
          alt={data.image.alternativeText}
          className='aspect-square h-full w-full animate-zoomOut object-cover transition-transform duration-300 ease-out md:aspect-video'
        />
        <Title level='1' variant='subheading' className='absolute-center top-1/2 mx-auto w-full text-base-300'>
          {data.title}
        </Title>
        <NextLink
          href={data?.link?.url}
          className='absolute-center link-hover link inset-0 bottom-10 !items-end text-base-300 underline-offset-8'
        >
          {data?.link?.text}
        </NextLink>
      </div>
      <AnimatedTag tag='div' className='relative px-2.5 py-5 text-center leading-tight md:px-5 md:py-10'>
        <Title level='3' variant='subheading'>
          {data.description}
        </Title>
      </AnimatedTag>
    </section>
  );
};
