import { Viewport } from 'next';
import { getMessages, setRequestLocale } from 'next-intl/server';

import { LayoutProps } from '@/types/app/layout.types';

import BaseLayout from '@/components/layouts/Base';

import { auth } from '@/auth';

import { getCurrency, getLayoutData } from '@/services';
import { pageViewAction } from '@/services/actions/pageViewAction';
import { tikTokPageViewAction } from '@/services/actions/tikTokActions';
import { withMetaDataAction } from '@/services/actions/withMetaDataAction';

import '../globals.css';

export const viewport: Viewport = {
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'auto',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'light' },
    { media: '(prefers-color-scheme: dark)', color: 'sunset' }
  ]
};

export default async function GlobalLayout({ children, params }: LayoutProps) {
  const { locale = 'uk' } = params;

  setRequestLocale(locale ?? 'uk');

  const [data, messages, currency, session] = await Promise.all([
    getLayoutData({ locale }),
    getMessages(),
    getCurrency(),
    auth(),
    withMetaDataAction(pageViewAction),
    withMetaDataAction(tikTokPageViewAction)
  ]);

  return (
    <BaseLayout
      locale={locale}
      session={session}
      currency={currency}
      messages={messages}
      header={data?.header}
      footer={data?.footer}
      cart={data?.shoppingCart}
    >
      {children}
    </BaseLayout>
  );
}
