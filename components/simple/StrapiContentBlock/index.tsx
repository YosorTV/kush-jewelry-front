'use client';

import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { FC } from 'react';

import { Blockquote, NextLink, Title } from '@/components/elements';

import { cn } from '@/lib';
import { IStrapiContentBlock } from '@/types/components/simple';
import { StrapiImage } from '../StrapiImage';

export const StrapiContentBlock: FC<IStrapiContentBlock> = ({ content, imageClass = 'h-full' }) => {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        list: ({ children }) => <ul className='px-10'>{children}</ul>,
        'list-item': ({ children }) => (
          <li className='list-decimal break-words text-sm text-base-200 md:text-base'>{children}</li>
        ),
        quote: ({ children }) => <Blockquote className='mx-5 font-semibold opacity-70'>{children}</Blockquote>,
        link: ({ children, url }) => (
          <NextLink href={url} className='px-0.5 text-blue-500 underline-offset-2 hover:underline'>
            {children}
          </NextLink>
        ),
        heading: ({ level, children }) => (
          <Title level={`${level}`} className='px-5'>
            {children}
          </Title>
        ),
        image: ({ image }) => {
          return (
            <StrapiImage
              src={image.url}
              alt={image.alternativeText}
              loading='lazy'
              height={image.height}
              width={image.width}
              priority={false}
              formats={image?.formats}
              previewUrl={image?.previewUrl}
              containerClass='h-96'
              overlay
              className={cn('aspect-video h-96 w-full object-cover object-center', imageClass)}
            />
          );
        },
        paragraph: ({ children }) => <p className='break-words px-5 text-sm text-base-200 md:text-base'>{children}</p>
      }}
    />
  );
};
