'use client';

import { FC } from 'react';

import CollectionCarousel from '@/components/simple/CollectionCarousel';
import AnimatedTag from '@/components/simple/AnimatedTag';

interface ICollectionSection {
  data: {
    title?: string;
    id: number | string;
    collections: {
      data: any[];
    };
  };
}

export const CollectionSection: FC<ICollectionSection> = ({ data }) => {
  const { title, collections } = data;

  return (
    <AnimatedTag tag='section' className='relative flex flex-col bg-neutral p-3 lg:p-6'>
      <CollectionCarousel
        autoScroll
        format='standart'
        title={title}
        titleClass='!text-white pb-3 lg:pb-6'
        className='pb-6'
        data={collections.data}
        slideClass='spotlight-img-carousel'
      />
    </AnimatedTag>
  );
};
