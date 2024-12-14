import { PageLayout } from '@/components/layouts';
import { StrapiBlockRender } from '@/components/simple';
import { STRAPI_ENTRIES } from '@/helpers/constants';

import { getCatalogData, getMetadata } from '@/services';

import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { userAgent } from 'next/server';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_ENTRIES.catalog, locale });

  return response;
}

export default async function Catalog({ params, searchParams }: PageProps) {
  const { locale } = params;
  const { device } = userAgent({ headers: headers() });

  const { data } = await getCatalogData({ locale });

  if (!data) {
    return notFound();
  }

  const heroData = {
    id: 0,
    __component: 'complex.hero-section',
    description: '',
    title: data?.title,
    image: data?.cover,
    sub_image: null as null,
    link: null as null
  };

  const updatedData = [heroData, ...data?.blocks];

  return (
    <PageLayout className='mt-20'>
      <StrapiBlockRender data={updatedData} device={device.type} {...searchParams} />
    </PageLayout>
  );
}
