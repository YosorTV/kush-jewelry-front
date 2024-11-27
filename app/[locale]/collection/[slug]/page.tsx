import { CollectionDetails } from '@/components/complex';
import { PageLayout } from '@/components/layouts';
import { getCollectionData, getCollectionMeta } from '@/services/api/get-collection';

import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale, slug } = props.params;

  const response = await getCollectionMeta({ locale, slug });

  return response;
}

export default async function Collection({ params }: PageProps) {
  const { locale, slug } = params;

  const { data } = await getCollectionData({ locale, slug });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='mt-20 min-h-screen'>
      <CollectionDetails
        title={data.title}
        content={data.description}
        cover={data.cover}
        products={data.products.data}
      />
    </PageLayout>
  );
}
