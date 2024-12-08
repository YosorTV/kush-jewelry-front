import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProfileForm } from '@/components/forms';

import { auth } from '@/auth';
import { Title } from '@/components/elements';
import { getProfileData } from '@/services';
import { getMe } from '@/services/api/get-me';
import { PageProps } from '@/types/app/page.types';
import { getTranslations } from 'next-intl/server';
import { AnimatedTag } from '@/components/simple';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { locale } = props.params;

  return {
    title: {
      default: `KUSH | ${locale === 'uk' ? 'ПРОФІЛЬ' : 'PROFILE'}`,
      template: '%s | KUSH'
    }
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const { locale } = params;

  const session = await auth();
  const t = await getTranslations('system');

  const [profilePage, me] = await Promise.all([
    getProfileData({ locale, token: session.accessToken }),
    getMe({ token: session.accessToken })
  ]);

  if (!profilePage.data || !me.data) {
    return notFound();
  }

  return (
    <AnimatedTag tag='section' className='mt-20 w-full bg-info-content p-5'>
      <Title level='2' variant='subheading' className='my-5 whitespace-nowrap text-center'>
        {t('profile')}
      </Title>
      <div className='divider' />
      <ProfileForm data={profilePage.data.formFields} state={me.data} locale={locale} token={session.accessToken} />
    </AnimatedTag>
  );
}
