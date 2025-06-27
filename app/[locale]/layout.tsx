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

  setRequestLocale(locale ?? 'uk');

  try {
    const [messages, session] = await Promise.all([
      getMessages().catch((): Record<string, any> => ({})),
      auth().catch((): null => null),
    ]);

    const [data, currency] = await Promise.allSettled([
      getLayoutData({ locale }),
      getCurrency(),
    ]);

    const layoutData = data.status === 'fulfilled' ? data.value : null;
    const currencyRate = currency.status === 'fulfilled' ? currency.value : 41;

    await Promise.allSettled([
      withMetaDataAction(pageViewAction).then(action => action()).catch(() => {}),
      withMetaDataAction(tikTokPageViewAction).then(action => action()).catch(() => {})
    ]);

    return (
      <BaseLayout
        locale={locale}
        session={session}
        currency={currencyRate}
        messages={messages}
        header={layoutData?.header}
        footer={layoutData?.footer}
        cart={layoutData?.shoppingCart}
      >
        {children}
      </BaseLayout>
    );
  } catch (error) {
    console.error('Layout error:', error);
    
    // Fallback layout with minimal functionality
    return (
      <html lang={locale}>
        <body>
          <div className="min-h-screen bg-base-100">
            <div className="container mx-auto p-4">
              <div className="alert alert-error mb-4">
                <span>Some features may be temporarily unavailable. Please refresh the page.</span>
              </div>
              {children}
            </div>
          </div>
        </body>
      </html>
    );
  }
}
