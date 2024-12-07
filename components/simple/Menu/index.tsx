'use client';

import { FC, useEffect } from 'react';

import { Hamburger, Portal, Sidebar } from '@/components/elements';
import { motion } from 'framer-motion';
import { MenuNav } from './MenuNav';

import { usePathname } from '@/lib/navigation';
import { ListOfPages } from '../ListOfPages';

import { useMenu } from '@/store';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { TMenu } from '@/types/components/simple/menu.types';

export const Menu: FC<TMenu> = ({ pages, categories, authLink, collections, sessionLinks }) => {
  const menu = useMenu();
  const session = useSession();
  const pathname = usePathname();
  const params = useSearchParams();

  const category = params.get('categories');

  const handleToggle = () => menu.onToggle();

  useEffect(() => {
    menu.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, category]);

  return (
    <>
      <ListOfPages pages={pages?.data} categories={categories} collections={collections} className='hidden lg:flex' />
      <motion.div initial={false} animate={menu.isOpen ? 'open' : 'closed'} className='h-7 w-7 lg:hidden'>
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
