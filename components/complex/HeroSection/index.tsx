import { NextLink, Title } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import { FC } from 'react';

export const HeroSection: FC<any> = ({ data }) => {
  return (
    <section className='group relative flex flex-col'>
      <div className='relative flex h-96 w-full overflow-hidden md:h-2md'>
        <StrapiImage
          fill
          priority
          className='aspect-video h-full w-full object-cover object-center-to-top transition-transform duration-300 ease-out'
          formats={data.image.formats}
          src={data.image.url}
          alt={data.image.alternativeText}
          sizes='100vw'
          overlay
        />
        <Title
          level='1'
          variant='subheading'
          className='absolute-center mx-a absolute flex h-full w-3/4 items-center justify-center whitespace-pre-line text-center !text-base-300'
        >
          {data.title}
        </Title>
        <NextLink
          href={data?.link?.url}
          className='absolute-x-center link-hover link bottom-10 z-10 !text-base-300 underline-offset-8'
        >
          {data?.link?.text}
        </NextLink>
      </div>
      <div className='relative px-2.5 py-5 text-center leading-tight md:py-10'>
        <Title level='3' variant='subheading'>
          {data.description}
        </Title>
      </div>
    </section>
  );
};
