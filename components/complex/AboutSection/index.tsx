import { FC } from 'react';
import { BlocksContent } from '@strapi/blocks-react-renderer';

import { Title } from '@/components/elements';
import { StrapiContentBlock, StrapiImage, AnimatedTag } from '@/components/simple';

import { IImageFormats } from '@/types/components';

interface IAboutSection {
  title: string;
  content?: BlocksContent;
  cover: {
    formats: IImageFormats;
    url: string;
    alternativeText?: string;
  };
  subImage: {
    formats: IImageFormats;
    url: string;
    alternativeText?: string;
  };
}

export const AboutSection: FC<IAboutSection> = ({ title, cover, content }) => {
  return (
    <article className='flex flex-col'>
      <div className='relative h-2lg w-full overflow-hidden'>
        <StrapiImage
          fill
          overlay
          priority
          formats={cover.formats}
          src={cover.url}
          alt={cover?.alternativeText}
          className='absolute aspect-square h-full w-full animate-zoomOut object-cover object-top transition-transform duration-300 ease-out md:aspect-video'
        />
        <Title
          level='1'
          variant='subheading'
          className='absolute-center inset-0 w-svw whitespace-break-spaces text-center text-base-300'
        >
          {title}
        </Title>
      </div>
      {content && (
        <AnimatedTag tag='section' className='flex flex-1 flex-col gap-5 py-5'>
          <StrapiContentBlock content={content} imageClass='h-md' />
        </AnimatedTag>
      )}
    </article>
  );
};
