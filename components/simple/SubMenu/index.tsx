import { FC } from 'react';

import { cormorant } from '@/assets/fonts';
import { cn } from '@/lib';

import { Title } from '@/components/elements';
import { MenuItem } from '../Menu/MenuItem';

import { TSubMenu } from '@/types/components/simple/subMenu.types';
import CollectionCarousel from '../CollectionCarousel';

const SubMenu: FC<TSubMenu> = ({ categoryTitle, categories, collections, collectionTitle }) => {
  return (
    <nav className='fixed top-20 z-30 flex h-130 w-svw gap-x-20 bg-info-content px-6'>
      <div className='relative top-5 z-30 flex flex-col gap-y-3'>
        {categoryTitle && (
          <Title level='5' className={cn('text-xl uppercase text-base-200', cormorant.className)}>
            {categoryTitle}
          </Title>
        )}
        {categories?.length > 0 && (
          <ul className='flex flex-col gap-y-4 py-1.5 capitalize text-base-200'>
            {categories.map((category: any) => (
              <MenuItem
                id={category.id}
                key={category.id}
                text={category.title}
                slug={category.slug}
                url={`/catalog?categories=${category.slug}`}
                isExternal={false}
              />
            ))}
          </ul>
        )}
      </div>
      {collections && collections.length > 0 && (
        <CollectionCarousel
          loop
          format='mini'
          data={collections}
          title={collectionTitle}
          fill='fill-base-200'
          titleClass='!text-xl py-5'
          slideClass='h-120 p-0'
          className='ml-auto w-full'
        />
      )}
    </nav>
  );
};

export default SubMenu;
