'use client';

import { FC, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';

import { Lottie } from '@/components/elements/Lottie';
import { ProductCard } from '@/components/simple';
import { ProductCardSkeleton } from '@/components/skeletons';

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
        t={t}
        currency={currency}
        session={session.data}
        key={product.id}
        product={product}
        className='col-span-1'
      />
    );
  };

  const printContent = useMemo(() => {
    if (state.isLoading && !state.searchResult.length) {
      return <ProductCardSkeleton length={8} customGrid={false} />;
    }

    if (state.searchResult.length > 0 && !state.isLoading) {
      return state.searchResult.map(printProducts);
    }

    return <Lottie text={t('emptyList')} src={lottieAnim} className='relative top-20' playerClassName='h-96 w-96' />;
  }, [state.isLoading, state.searchResult.length, t]);

  return (
    <div
      className={cn(
        'mt-20 grid grid-cols-fluid gap-x-3 gap-y-6',
        state.searchResult.length > 0 ? 'lg:grid-cols-3 2xl:grid-cols-4' : ''
      )}
    >
      {printContent}
    </div>
  );
};
