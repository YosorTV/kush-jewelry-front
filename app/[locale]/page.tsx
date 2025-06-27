import { notFound } from 'next/navigation';

import { getHomeData, getMetadata } from '@/services';

import { PageLayout } from '@/components/layouts';
import { StrapiBlockRender } from '@/components/simple';

import { PageProps } from '@/types/app/page.types';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';
import { STRAPI_ENTRIES } from '@/helpers/constants';
import { Metadata } from 'next';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_ENTRIES.home, locale });

  return response;
}

export default async function Home({ params, searchParams }: PageProps) {
  const { locale } = params;

  const { device } = userAgent({ headers: headers() });

  const { data } = await getHomeData({ locale });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='mt-20'>
      <StrapiBlockRender data={data.blocks} device={device.type} {...searchParams} />
    </PageLayout>
  );
}
