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
    <AnimatedTag
      tag='section'
      className='relative flex flex-col bg-neutral p-2.5 !pt-0 hover:cursor-grab active:cursor-grabbing lg:p-5'
    >
      <CollectionCarousel
        format='standart'
        title={title}
        titleClass='!text-white pt-1.5'
        data={collections.data}
        slideClass='h-96'
      />
    </AnimatedTag>
  );
};
