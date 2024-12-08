import { MenuItem } from './MenuItem';
import { CategoryLinkType, CollectionLinkType, StrapiLinkType } from '@/types/components';
import { FC } from 'react';
import { Button, NextLink, Title } from '@/components/elements';
import { cormorant } from '@/assets/fonts';
import { cn } from '@/lib';
import { SiteSettings } from '../SiteSettings';
import { Session } from 'next-auth';
import { IoClose } from 'react-icons/io5';

type MenuNavProps = {
  session: Session;
  onToggle: () => void;
  authLink: StrapiLinkType;
  sessionLinks: StrapiLinkType[];
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

export const MenuNav: FC<MenuNavProps> = ({
  pages,
  categories,
  authLink,
  onToggle,
  session,
  collections,
  sessionLinks
}) => {
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

  const printPage = (item: StrapiLinkType) => (
    <MenuItem
      id={item.id}
      key={item.id}
      text={item.text}
      url={item.url}
      className='py-2.5'
      isExternal={item.isExternal}
    />
  );

  const printCollection = (item: CollectionLinkType) => (
    <MenuItem
      className='py-2.5'
      id={item.id}
      key={item.id}
      text={item.title}
      url={`/collection/${item.slug}`}
      isExternal={false}
    />
  );

  return (
    <div className='relative p-2.5'>
      <div className='form-control'>
        <div className='flex justify-between'>
          <Title level='5' className={cn(cormorant.className, 'text-2xl capitalize')}>
            {pages.title}
          </Title>
          <Button onClick={onToggle} type='button' className='r-0 relative'>
            <IoClose className='h-6 w-6 fill-base-200' />
          </Button>
        </div>
        <div className='form-control'>
          <ul>{pages.data.map(printPage)}</ul>
          {session?.accessToken ? (
            <ul>{sessionLinks?.map(printPage)}</ul>
          ) : (
            <NextLink
              href={authLink.url}
              className='py-2.5 text-sm font-medium underline-offset-8 hover:text-base-200 hover:underline lg:text-base-200'
            >
              {authLink.text}
            </NextLink>
          )}
        </div>
      </div>
      <div className='divider' />
      <div className='form-control'>
        <Title level='5' className={cn(cormorant.className, 'text-2xl capitalize')}>
          {categories.title}
        </Title>
        <ul>{categories.data.map(printCategory)}</ul>
      </div>
      <div className='divider' />
      <div className='form-control'>
        <Title level='5' className={cn(cormorant.className, 'text-2xl capitalize')}>
          {collections.title}
        </Title>
        <ul>{collections.data.map(printCollection)}</ul>
        <div className='divider' />
        <div className='flex w-full pb-20'>
          <SiteSettings className='col-start-2 flex gap-x-6 lg:hidden' />
        </div>
      </div>
    </div>
  );
};
