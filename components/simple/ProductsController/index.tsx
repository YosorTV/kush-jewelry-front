'use client';

import { useTranslations } from 'next-intl';
import { RiListSettingsLine } from 'react-icons/ri';

import { useFilters } from '@/store';

import { Button, Portal, Sidebar, Title } from '@/components/elements';
import { FilterForm } from '@/components/forms';
import { useScreen } from '@/lib/hooks';
import { FC } from 'react';

interface IProductsController {
  title?: string;
}

export const ProductsController: FC<IProductsController> = ({ title }) => {
  const state = useFilters();
  const t = useTranslations('filter');

  const { md } = useScreen();

  return (
    <nav className='flex h-min w-full flex-row items-center justify-between gap-x-5 tracking-wider'>
      <Title level='2' variant='subheading'>
        {title}
      </Title>
      <div className='flex items-center gap-x-3 underline underline-offset-8'>
        <Button
          className='text-sm !font-medium md:text-xl'
          onClick={state.onToggle}
          icon={{ before: <RiListSettingsLine className='h-6 w-6 fill-base-200' /> }}
        >
          {md && t('title')}
        </Button>
        <Portal selector='portal'>
          <Sidebar opened={state.isOpen} onToggle={state.onToggle} position='right'>
            <FilterForm />
          </Sidebar>
        </Portal>
      </div>
    </nav>
  );
};
