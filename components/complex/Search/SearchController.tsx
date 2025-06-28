/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, FC, ReactNode, useCallback, useEffect, useMemo } from 'react';
import { IoClose } from 'react-icons/io5';

import { useSearch } from '@/store';

import { childrenVariants, fadeVariants, searchVariants } from '@/assets/animations';
import { Button, Input, Logo } from '@/components/elements';
import { useLocale } from 'next-intl';

import { useDebounce } from '@/lib/hooks';
import { usePathname } from 'next/navigation';

interface TSearchController {
  onClose: () => void;
  placeholder: string;
  children: ReactNode;
}

export const SearchController: FC<TSearchController> = ({ onClose, children, placeholder = 'Search' }) => {
  const state = useSearch();
  const locale = useLocale();
  const pathname = usePathname();

  const name = useDebounce(state.searchValue, 500);

  const getProducts = useCallback(() => {
    state.fetchProducts({
      name,
      locale,
      page: '1',
      pageSize: '4'
    });
  }, [state, locale, name]);

  const handleSearch = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      state.onSearch(target.value);
    },
    [state.onSearch]
  );

  const handleMore = useCallback(
    (perPage = 8) => {
      state.fetchProducts({
        name,
        locale,
        page: '1',
        pageSize: String(perPage)
      });
    },
    [state, locale, name]
  );

  useEffect(() => {
    if (state.isOpen) {
      getProducts();
    }
  }, [name, locale, state.isOpen]);

  useEffect(() => {
    return () => {
      onClose();
    };
  }, [pathname]);

  const cta = useMemo(() => {
    return {
      title: locale === 'uk' ? 'Показати ще' : 'Load more',
      total: locale === 'uk' ? 'Всього' : 'Total'
    };
  }, [locale]);

  const isLastPage = state.meta.page === state.meta.pageCount || !state.searchResult.length;

  return (
    <AnimatePresence mode='sync'>
      {state.isOpen && (
        <motion.div
          initial='initial'
          animate='animate'
          exit='exit'
          variants={searchVariants}
          className='fixed left-0 top-0 z-20 h-screen w-full'
        >
          <motion.div className='absolute right-0 top-0 z-20 h-screen w-full overflow-y-auto bg-info-content p-8'>
            <motion.div
              initial='hidden'
              animate='visible'
              exit='hidden'
              variants={fadeVariants}
              className='grid w-full grid-cols-4 justify-center'
            >
              <Logo
                className='relative top-1 col-span-1 col-start-1 row-start-1 w-min cursor-pointer'
                onClick={onClose}
              />
              <Input
                name='search'
                placeholder={placeholder}
                className='w-full'
                type='search'
                containerClass='col-span-5 md:col-span-3 lg:col-span-2 pt-6 md:pt-0 col-start-1 md:col-start-2 md:row-start-1 md:pr-16 lg:pr-0 w-full'
                value={state.searchValue}
                isLoading={state.isLoading}
                onChange={handleSearch}
              />

              <Button onClick={onClose} type='button' className='col-span-1 col-start-5 row-start-1 md:col-start-6'>
                <IoClose className='h-6 w-6 fill-base-200' />
              </Button>
            </motion.div>
            <motion.div initial='initial' animate='visible' exit='hidden' variants={childrenVariants}>
              {children}
              {state.meta.total > 0 && !state.isLoading && (
                <div className='flex flex-col items-center justify-center py-6 pb-10 lg:pt-16'>
                  <span className='text-sm font-medium uppercase text-base-200'>
                    {cta.total} {state.meta.total}
                  </span>
                  <Button
                    className='btn-link'
                    disabled={isLastPage}
                    onClick={() => handleMore(state.meta.pageSize + 4)}
                  >
                    {cta.title}
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
