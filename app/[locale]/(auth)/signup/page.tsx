import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMetadata, getSignUpData } from '@/services';

import { STRAPI_ENTRIES } from '@/helpers/constants';

import { SignUpForm } from '@/components/forms';
import { PageLayout } from '@/components/layouts';

import { PageProps } from '@/types/app/page.types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_ENTRIES.signup, locale });

  return response;
}

export default async function SignUpPage({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getSignUpData({ locale });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='auth-page_wrapper mt-20' cover={data.cover}>
      <SignUpForm locale={locale} cta={data.submitBtn} title={data.title} formFields={data.formFields} />
    </PageLayout>
  );
}
