'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { getCurrency } from '@/services';

import { Lottie } from '@/components/elements/Lottie';
import { ProductCard } from '@/components/simple';

import { useSearch } from '@/store';

import { Product } from '@/types/components';

import lottieAnim from '@/public/LottieEmplyList.json';

export const SearchContent = () => {
  const state = useSearch();
  const t = useTranslations('system');
  const session = useSession();

  const [currency, setCurrency] = useState<number>(41);

  const fetchCurrency = async () => {
    const response = await getCurrency();

    setCurrency(response);
  };

  useEffect(() => {
    fetchCurrency();
  }, []);

  if (!state.searchResult.length && !state.isLoading) {
    return <Lottie text={t('emptyList')} src={lottieAnim} className='relative top-20' playerClassName='h-96 w-96' />;
  }

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

  return (
    <div className='mt-10 grid grid-cols-fluid gap-x-2.5 gap-y-5 lg:grid-cols-3 2xl:grid-cols-4'>
      {state.searchResult.map(printProducts)}
    </div>
  );
};
