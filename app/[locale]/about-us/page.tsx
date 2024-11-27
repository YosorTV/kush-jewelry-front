import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AboutSection } from '@/components/complex';
import { PageLayout } from '@/components/layouts';
import { STRAPI_ENTRIES } from '@/helpers/constants';
import { getMetadata } from '@/services';
import { getAboutUsData } from '@/services/api/get-about-us';
import { PageProps } from '@/types/app/page.types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_ENTRIES.about, locale });

  return response;
}

export default async function AboutUs({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getAboutUsData({ locale });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='mt-20'>
      <AboutSection cover={data?.cover} title={data?.title} content={data?.story} subImage={data?.subImage} />
    </PageLayout>
  );
}
