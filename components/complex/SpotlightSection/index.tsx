import { getLocale } from 'next-intl/server';

import { getCurrency } from '@/services';

import SpotlightCarousel from '@/components/simple/SpotlightCarousel';

export default async function SpotlightSection({ data }: any) {
  const locale = await getLocale();
  const currency = await getCurrency();

  return (
    <section className='relative flex h-auto flex-col bg-neutral'>
      {data?.products?.data?.length > 0 && (
        <SpotlightCarousel locale={locale} currency={currency} title={data.title} data={data.products.data} />
      )}
    </section>
  );
}
