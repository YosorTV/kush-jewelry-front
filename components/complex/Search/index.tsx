'use client';

import { FC, useCallback, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';

import { useSearch } from '@/store';
import { useScrollLock } from '@/lib/hooks';

import { Button, Portal } from '@/components/elements';
import { SearchController } from './SearchController';
import { SearchContent } from './SearchContent';

type TSearch = {
  placeholder: string;
};

export const Search: FC<TSearch> = ({ placeholder }) => {
  const state = useSearch();

  useScrollLock(state.isOpen);

  const handleOpen = useCallback(() => {
    state.onToggle();
  }, [state.onToggle]);

  const handleClose = useCallback(() => {
    state.onReset();
  }, [state.onReset]);

  useEffect(() => {
    state.fetchCurrency();
  }, []);

  return (
    <>
      <Button onClick={handleOpen} type='button'>
        <IoSearchSharp className='h-6 w-6 fill-base-200' />
      </Button>

      <Portal selector='portal'>
        <SearchController onClose={handleClose} placeholder={placeholder}>
          <SearchContent currency={state.currency} />
        </SearchController>
      </Portal>
    </>
  );
};
