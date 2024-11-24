import { getMessages, setRequestLocale } from 'next-intl/server';

import { LayoutProps } from '@/types/app/layout.types';

import BaseLayout from '@/components/layouts/Base';

import { auth } from '@/auth';
import { getCurrency, getLayoutData } from '@/services';

import { LOCALES } from '@/helpers/constants';
import { Viewport } from 'next';

export const revalidate = 60;

export const viewport: Viewport = {
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'auto',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'light' },
    { media: '(prefers-color-scheme: dark)', color: 'sunset' }
  ]
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function GlobalLayout({ children, params }: LayoutProps) {
  const { locale = 'uk' } = params;

  setRequestLocale(locale ?? 'uk');

  const [data, messages, currency, session] = await Promise.all([
    getLayoutData({ locale }),
    getMessages(),
    getCurrency(),
    auth()
  ]);

  return (
    <BaseLayout
      currency={currency}
      locale={locale}
      session={session}
      messages={messages}
      header={data?.header}
      footer={data?.footer}
      cart={data?.shoppingCart}
    >
      {children}
    </BaseLayout>
  );
}
