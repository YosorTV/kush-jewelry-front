'use client';

import { FC, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';

import { Lottie } from '@/components/elements/Lottie';
import { ProductCard } from '@/components/simple';

import { useSearch } from '@/store';

import { Product } from '@/types/components';

import lottieAnim from '@/public/LottieEmplyList.json';
import { cn } from '@/lib';

export const SearchContent: FC<{ currency: number }> = ({ currency }) => {
  const state = useSearch();
  const session = useSession();
  const t = useTranslations('system');

  const printProducts = (product: Product) => {
    return (
      <ProductCard
        currency={currency}
        session={session.data}
        key={product.id}
        product={product}
        className='col-span-1'
      />
    );
  };

  const printContent = useMemo(() => {
    if (state.isLoading) {
      return (
        <div className='absolute-center bg-transparent'>
          <span className='loading loading-infinity w-12' />
        </div>
      );
    }

    if (state.searchResult.length > 0 && !state.isLoading) {
      return state.searchResult.map(printProducts);
    }

    if (!state.searchResult.length && !state.isLoading) {
      return <Lottie text={t('emptyList')} src={lottieAnim} className='relative top-20' playerClassName='h-120 w-96' />;
    }

    return null;
  }, [state.isLoading, state.searchResult.length, t]);

  return (
    <div
      className={cn(
        'mt-10',
        state.searchResult.length > 0
          ? 'grid grid-cols-fluid gap-x-3 gap-y-6 lg:grid-cols-3 2xl:grid-cols-4'
          : 'flex h-full flex-col items-center justify-center gap-6'
      )}
    >
      {printContent}
    </div>
  );
};
