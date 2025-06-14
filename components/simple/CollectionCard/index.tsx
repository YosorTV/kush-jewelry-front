'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FC, useState } from 'react';
import { IoNavigateCircleSharp } from 'react-icons/io5';

import { cn } from '@/lib';

import { NextLink, Title } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import { IImageFormats } from '@/types/components';

type TCollectioCard = {
  title: string;
  hintText?: string;
  slug: string;
  className?: string;
  textClassName?: string;
  img: {
    alternativeText?: string;
    url: string;
    formats: IImageFormats;
  };
};

export const CollectionCard: FC<TCollectioCard> = ({ img, className, title, hintText = 'Explore now', slug }) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleShowOverlay = () => setShowOverlay(true);
  const handleHideOverlay = () => setShowOverlay(false);

  return (
    <motion.figure
      className={cn(className, 'embla__slide relative cursor-grab active:cursor-grabbing')}
      onHoverStart={handleShowOverlay}
      onHoverEnd={handleHideOverlay}
    >
      <NextLink
        href={`/collection/${slug}`}
        className='z-20 flex h-full w-full flex-col items-center gap-x-3 font-semibold text-base-300'
      >
        <AnimatePresence mode='sync'>
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 z-10 flex items-center justify-center border-2 border-white'
            >
              <IoNavigateCircleSharp className='mr-2.5 h-6 w-6 fill-base-300' />
              {hintText}
            </motion.div>
          )}
        </AnimatePresence>
        <StrapiImage
          overlay={showOverlay}
          src={img?.url}
          alt={img?.alternativeText}
          formats={img?.formats}
          fill
          sizes='100vw'
          loading='lazy'
          className='aspect-[4/3] h-full w-full object-cover'
        />
        <Title
          level='4'
          variant='subheading'
          className={cn('absolute bottom-3 !text-2xl lg:bottom-1', showOverlay ? 'text-base-300' : 'text-black')}
        >
          {title}
        </Title>
      </NextLink>
    </motion.figure>
  );
};
