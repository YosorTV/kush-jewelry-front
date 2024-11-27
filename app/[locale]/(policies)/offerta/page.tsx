import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PageLayout } from '@/components/layouts';

import { STRAPI_ENTRIES } from '@/helpers/constants';

import { getMetadata, getOffertaData } from '@/services';

import { OffertaSection } from '@/components/complex';
import { PageProps } from '@/types/app/page.types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_ENTRIES.offerta, locale });

  return response;
}

export default async function Offerta({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getOffertaData({ locale });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='mt-20'>
      {data?.content && <OffertaSection content={data.content} title={data.title} />}
    </PageLayout>
  );
}
