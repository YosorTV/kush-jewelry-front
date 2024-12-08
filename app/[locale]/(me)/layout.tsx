import { auth } from '@/auth';
import { PageLayout } from '@/components/layouts';
import { ProfileSidebar } from '@/components/simple';

import { getProfileLayoutData } from '@/services/api/get-profile-layout';

import { LayoutProps } from '@/types/app/layout.types';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function ProfileLayout({ children, params: { locale } }: Readonly<LayoutProps>) {
  const session = await auth();

  const t = await getTranslations('system');

  const { data } = await getProfileLayoutData({ locale, token: session?.accessToken });

  if (!data) {
    return notFound();
  }

  return (
    <PageLayout>
      <section className='flex w-full flex-grow justify-between'>
        <ProfileSidebar links={data.navigation} signOutTitle={t('signOut')} />
        {children}
      </section>
    </PageLayout>
  );
}
