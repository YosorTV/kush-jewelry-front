import { Title } from '@/components/elements';
import { StrapiContentBlock, StrapiImage } from '@/components/simple';
import { IImageFormats } from '@/types/components';
import { BlocksContent } from '@strapi/blocks-react-renderer';
import { FC } from 'react';

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
      <div className='relative h-sm md:h-md'>
        <Title level='1' variant='heading' className='absolute-center z-10 text-base-300'>
          {title}
        </Title>
        <StrapiImage
          fill
          overlay
          priority
          formats={cover.formats}
          src={cover.url}
          alt={cover?.alternativeText}
          className='absolute aspect-auto h-full w-full object-cover'
        />
      </div>
      <div className='flex flex-col gap-5 py-5'>
        {content && (
          <section className='flex flex-1 flex-col gap-5'>
            <StrapiContentBlock content={content} imageClass='h-2md' />
          </section>
        )}
      </div>
    </article>
  );
};
