import { Viewport } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { LayoutProps } from '@/types/app/layout.types';

import BaseLayout from '@/components/layouts/Base';



import '../globals.css';
import { validateLocale } from '@/lib/locale-utils';

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
  const { locale: rawLocale = 'uk' } = params;
  const locale = validateLocale(rawLocale);

  setRequestLocale(locale);

  return (
    <BaseLayout locale={locale}>
      {children}
    </BaseLayout>
  );
}
