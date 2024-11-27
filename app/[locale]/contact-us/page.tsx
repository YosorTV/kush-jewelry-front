import { ContactUsSection } from '@/components/complex/ContactUsSection';
import { PageLayout } from '@/components/layouts';
import { STRAPI_ENTRIES } from '@/helpers/constants';
import { getMetadata } from '@/services';
import { getContactUsData } from '@/services/api/get-contact-us';
import { PageProps } from '@/types/app/page.types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  const response = await getMetadata({ path: STRAPI_ENTRIES.contacts, locale });

  return response;
}

export default async function ContactUs({ params }: PageProps) {
  const { locale } = params;

  const { data } = await getContactUsData({ locale });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout className='mt-20'>
      <ContactUsSection data={data} />
    </PageLayout>
  );
}
