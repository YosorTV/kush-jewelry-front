'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';
import { IoNavigateCircleSharp } from 'react-icons/io5';

import { NextLink, Title } from '@/components/elements';
import { StrapiImage } from '@/components/simple';
import { Price } from '@/components/simple/Price';
import { cn } from '@/lib';

export const CategoryCard: FC<any> = ({ data, currency }) => {
  const t = useTranslations();

  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleShowOverlay = () => setShowOverlay(true);
  const handleHideOverlay = () => setShowOverlay(false);

  return (
    <motion.figure
      onHoverStart={handleShowOverlay}
      onHoverEnd={handleHideOverlay}
      className={cn(
        'embla__slide relative w-full cursor-grab overflow-hidden rounded-none border-2 border-transparent active:cursor-grabbing',
        showOverlay && 'border-white'
      )}
    >
      <NextLink
        href={`/catalog/${data.slug}`}
        className='relative z-20 flex items-center gap-x-2.5 bg-white font-semibold text-black'
      >
        <AnimatePresence mode='sync'>
          {showOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 z-10 flex items-center justify-center'
            >
              <IoNavigateCircleSharp className='z-20 mr-2 h-6 w-6 fill-base-300' />
              <span className='z-20 text-base-300'>{t('system.explore')}</span>
            </motion.div>
          )}
        </AnimatePresence>
        <div className='h-96 w-full lg:h-[512px]'>
          <StrapiImage
            fill
            priority
            loading='eager'
            overlay={showOverlay}
            formats={data?.images?.data?.[0]?.formats}
            src={data?.images?.data?.[0]?.url}
            alt={data?.images?.data?.[0]?.alternativeText}
            className='aspect-square h-full w-full object-cover'
          />
        </div>
        <div className='group absolute bottom-0 left-0 z-10 w-full bg-black/50 p-5'>
          <div className='flex flex-1 justify-between pt-2'>
            <Title level='3' className='text-lg font-medium uppercase text-white'>
              {data.title}
            </Title>
          </div>
          <div className='flex flex-col'>
            <p
              className={cn(
                'line-clamp-1 w-1/2 text-base font-medium text-white transition-all duration-300',
                showOverlay && 'w-full'
              )}
            >
              {data.description}
            </p>
            <div className='flex w-full items-center justify-between'>
              <Price
                className='!flex-row font-medium text-base-300'
                price={data?.price}
                sale={data?.sale}
                currency={currency}
              />
            </div>
          </div>
        </div>
      </NextLink>
    </motion.figure>
  );
};
