import { FC } from 'react';

import { SpotlightCarousel } from '@/components/simple';
import AnimatedTag from '@/components/simple/AnimatedTag';
import { getCurrency } from '@/services';
import { getLocale } from 'next-intl/server';

export const SpotlightSection: FC<any> = async ({ data }) => {
  const locale = await getLocale();
  const currency = await getCurrency();

  return (
    <AnimatedTag tag='section' className='relative flex h-auto flex-col bg-neutral'>
      {data?.products?.data?.length > 0 && (
        <SpotlightCarousel locale={locale} currency={currency} title={data.title} data={data.products.data} />
      )}
    </AnimatedTag>
  );
};
