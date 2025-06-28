import { notFound } from 'next/navigation';

import { getCurrency, getHomeData, getMetadata } from '@/services';

import { PageLayout } from '@/components/layouts';
import { StrapiBlockRender } from '@/components/simple';

import { PageProps } from '@/types/app/page.types';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import { STRAPI_ENTRIES } from '@/helpers/constants';
import { Metadata } from 'next';
import { validateLocale } from '@/lib/locale-utils';
import { auth } from '@/auth';
import ProductList from '@/components/simple/ProductList';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = props.params;
  const locale = validateLocale(rawLocale);

  const response = await getMetadata({ path: STRAPI_ENTRIES.home, locale });

  return response;
}

export default async function Home({ params, searchParams }: PageProps) {
  const { locale: rawLocale } = params;

  const locale = validateLocale(rawLocale);

  const { device } = userAgent({ headers: headers() });

  const { data } = await getHomeData({ locale });
  const currency = await getCurrency();
  const session = await auth();

  if (!data) {
    return notFound();
  }

  const { title } = data.blocks.find((block: any) => block.__component === 'complex.products');

  return (
    <PageLayout className='mt-20'>
      <StrapiBlockRender
        data={data.blocks}
        device={device.type}
        locale={locale}
        currency={currency}
        session={session}
        {...searchParams}
      />
      <ProductList title={title} session={session} currency={currency} className='px-5 md:px-6' {...params} />
    </PageLayout>
  );
}
