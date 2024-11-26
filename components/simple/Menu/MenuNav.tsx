'use client';

import { MenuItem } from './MenuItem';
import { CategoryLinkType, CollectionLinkType, StrapiLinkType } from '@/types/components';
import { FC } from 'react';
import { Title } from '@/components/elements';
import { cormorant } from '@/assets/fonts';
import { cn } from '@/lib';
import { LangChanger } from '../LangChanger';
import { ThemeChanger } from '../ThemeChanger';

type MenuNavProps = {
  pages: {
    title: string;
    data: StrapiLinkType[];
  };
  collections: {
    title: string;
    data: any[];
  };
  categories: {
    title: string;
    data: any[];
  };
};

export const MenuNav: FC<MenuNavProps> = ({ pages, categories, collections }) => {
  const printCategory = (item: CategoryLinkType) => (
    <MenuItem
      id={item.id}
      key={item.id}
      text={item.title}
      slug={item.slug}
      className='py-2.5'
      url={`/catalog?categories=${item.slug}`}
      isExternal={false}
    />
  );

  return (
    <div className='relative top-16 px-2.5 md:px-5'>
      <div className='flex flex-col gap-y-2.5'>
        <Title level='5' className={cn(cormorant.className, 'text-2xl capitalize')}>
          {pages.title}
        </Title>
        <ul>
          {pages.data.map((item: StrapiLinkType) => (
            <MenuItem
              id={item.id}
              key={item.id}
              text={item.text}
              url={item.url}
              className='py-2.5'
              isExternal={item.isExternal}
            />
          ))}
        </ul>
      </div>
      <div className='divider pr-5' />
      <div className='flex flex-col gap-y-2.5'>
        <Title level='5' className={cn(cormorant.className, 'text-2xl capitalize')}>
          {categories.title}
        </Title>
        <ul>{categories.data.map(printCategory)}</ul>
      </div>
      <div className='divider pr-5' />
      <div className='flex flex-col gap-y-2.5'>
        <Title level='5' className={cn(cormorant.className, 'text-2xl capitalize')}>
          {collections.title}
        </Title>
        <ul>
          {collections.data.map((item: CollectionLinkType) => (
            <MenuItem
              className='py-2.5'
              id={item.id}
              key={item.id}
              text={item.title}
              url={`/collection/${item.slug}`}
              isExternal={false}
            />
          ))}
        </ul>
        <div className='divider pr-5' />
        <div className='flex w-full pb-20'>
          <div className='col-start-2 flex gap-x-6 lg:hidden'>
            <ThemeChanger />
            <LangChanger className='dropdown-top' />
          </div>
        </div>
      </div>
    </div>
  );
};
