import { Viewport } from 'next';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { LayoutProps } from '@/types/app/layout.types';

import BaseLayout from '@/components/layouts/Base';

import { auth } from '@/auth';

import { getCurrency, getLayoutData } from '@/services';

import '../globals.css';

export const viewport: Viewport = {
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' }
  ]
};

export default async function GlobalLayout({ children, params }: LayoutProps) {
  const { locale = 'uk' } = params;

  const [messages, session] = await Promise.allSettled([getMessages(), auth()]);
  const [data, currency] = await Promise.allSettled([getLayoutData({ locale }), getCurrency()]);

  const layoutData = data.status === 'fulfilled' ? data.value : null;
  const currencyRate = currency.status === 'fulfilled' ? currency.value : 41;

  if (messages.status === 'rejected' || session.status === 'rejected' || data.status === 'rejected' || currency.status === 'rejected') {
    return notFound();
  }
  
    return (
      <BaseLayout
        locale={locale}
        session={session.value}
        currency={currencyRate}
        messages={messages.value}
        header={layoutData?.header}
        footer={layoutData?.footer}
        cart={layoutData?.shoppingCart}
      >
        {children}
      </BaseLayout>
    );
}
