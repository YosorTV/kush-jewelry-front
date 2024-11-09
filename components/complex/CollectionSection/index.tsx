'use client';

import { FC } from 'react';

import CollectionCarousel from '@/components/simple/CollectionCarousel';

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
  const { id, title, collections } = data;

  return (
    <section
      key={id}
      className='relative flex flex-col bg-neutral p-2.5 !pt-0 hover:cursor-grab active:cursor-grabbing lg:p-5'
    >
      <CollectionCarousel
        format='standart'
        title={title}
        titleClass='!text-white pt-2.5'
        data={collections.data}
        slideClass='h-96'
      />
    </section>
  );
};
