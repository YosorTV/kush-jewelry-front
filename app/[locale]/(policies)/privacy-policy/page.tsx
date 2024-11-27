import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { RuleSection } from '@/components/complex/RuleSection';
import { PageLayout } from '@/components/layouts';

import { STRAPI_ENTRIES } from '@/helpers/constants';

import { getMetadata } from '@/services';
import { getPolicyData } from '@/services/api/get-policy';

import { PageProps } from '@/types/app/page.types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_ENTRIES.policy, locale });

  return response;
}

export default async function PrivacyPolicy({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getPolicyData({ locale });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='mt-20'>
      {data?.content && <RuleSection content={data?.content} title={data?.title} />}
    </PageLayout>
  );
}
