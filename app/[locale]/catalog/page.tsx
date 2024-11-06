import { Title } from '@/components/elements';
import { PageLayout } from '@/components/layouts';
import { StrapiBlockRender, StrapiImage } from '@/components/simple';
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

  return (
    <PageLayout className='mt-16'>
      <div className='relative flex h-80 w-full overflow-hidden md:h-2md'>
        <StrapiImage
          fill
          priority
          className='hero-image'
          formats={data?.cover?.formats}
          src={data?.cover?.url}
          alt={data?.cover?.alternativeText}
          overlay
        />
        <Title
          level='1'
          variant='subheading'
          className='absolute-center mx-a absolute flex h-full w-3/4 items-center justify-center whitespace-pre-line text-center !text-base-300'
        >
          {data.title}
        </Title>
      </div>
      <StrapiBlockRender data={data.blocks} {...searchParams} />
    </PageLayout>
  );
}
