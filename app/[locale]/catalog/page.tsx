import { HeroSection } from '@/components/complex';
import { PageLayout } from '@/components/layouts';
import { StrapiBlockRender } from '@/components/simple';
import { STRAPI_ENTRIES } from '@/helpers/constants';

import { getCatalogData, getMetadata } from '@/services';

import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_ENTRIES.catalog, locale });

  return response;
}

export default async function Catalog({ params, searchParams }: PageProps) {
  const { locale } = params;

  const { data } = await getCatalogData({ locale });

  if (!data) {
    return notFound();
  }

  const heroData = {
    id: data.id,
    __component: 'complex.hero-section',
    description: '',
    title: data.title,
    image: data?.cover,
    sub_image: null as null,
    link: null as null
  };

  return (
    <PageLayout className='mt-20'>
      <HeroSection key={data.id} data={heroData} />
      <StrapiBlockRender data={data.blocks} {...searchParams} />
    </PageLayout>
  );
}
