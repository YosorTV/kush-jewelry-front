import { PropsWithChildren } from 'react';
import { Viewport } from 'next';

import { LOCALES } from '@/helpers/constants';

import './globals.css';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

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

export default function RootLayout({ children }: PropsWithChildren) {
  return children;
}
