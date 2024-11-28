'use client';

import { FC, useEffect } from 'react';

import { Hamburger, Portal, Sidebar } from '@/components/elements';
import { motion } from 'framer-motion';
import { MenuNav } from './MenuNav';

import { usePathname } from '@/lib/navigation';
import { ListOfPages } from '../ListOfPages';

import { useMenu } from '@/store';
import { StrapiLinkType } from '@/types/components';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

type MenuProps = {
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
  sessionLinks: StrapiLinkType[];
  authLink: StrapiLinkType;
};

export const Menu: FC<MenuProps> = ({ pages, categories, authLink, collections, sessionLinks }) => {
  const menu = useMenu();
  const pathname = usePathname();
  const params = useSearchParams();
  const session = useSession();
  const category = params.get('categories');

  const handleToggle = () => menu.onToggle();

  useEffect(() => {
    menu.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, category]);

  return (
    <>
      <ListOfPages pages={pages?.data} categories={categories} collections={collections} className='hidden lg:flex' />
      <motion.div
        layout='position'
        initial={false}
        animate={menu.isOpen ? 'open' : 'closed'}
        className='z-20 h-auto w-min lg:hidden'
      >
        <Hamburger isOpened={menu.isOpen} toggle={handleToggle} />
        <Portal selector='portal'>
          <Sidebar opened={menu.isOpen} position='right' onToggle={handleToggle}>
            <MenuNav
              onToggle={handleToggle}
              pages={pages}
              categories={categories}
              authLink={authLink}
              session={session.data}
              sessionLinks={sessionLinks}
              collections={collections}
            />
          </Sidebar>
        </Portal>
      </motion.div>
    </>
  );
};
