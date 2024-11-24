import { NextLink, Title } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import AnimatedTag from '@/components/simple/AnimatedTag';
import { FC } from 'react';

export const HeroSection: FC<any> = ({ data }) => {
  return (
    <section className='group relative flex flex-col items-center justify-center'>
      <div className='relative h-md w-full overflow-hidden md:h-lg'>
        <StrapiImage
          fill
          overlay
          priority
          sizes='100vw'
          src={data.image.url}
          formats={data.image.formats}
          alt={data.image.alternativeText}
          className='animate-zoomOut aspect-square h-full w-full object-cover transition-transform duration-300 ease-out md:aspect-video'
        />
        <Title
          level='1'
          variant='subheading'
          className='absolute-center animate-reveal text-center text-base-300 opacity-0 md:whitespace-pre-line'
        >
          {data.title}
        </Title>
        <NextLink
          href={data?.link?.url}
          className='absolute-center animate-reveal link-hover link bottom-10 !items-end text-center text-base-300 underline-offset-8 opacity-0'
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
