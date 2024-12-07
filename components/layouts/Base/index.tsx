import { PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';

import Header from '@/components/elements/Header';
import Footer from '@/components/elements/Footer';

import { AutoLogoutProvider, ThemeProvider } from '@/components/providers';
import { ClientSideRender, Modal } from '@/components/complex';
import { WishlistNotification } from '@/components/simple';
import { ExternalScripts } from '@/components/scripts';

import { BaseLayoutProps } from '@/types/components';

import { cn } from '@/lib';
import { montserrat } from '@/assets/fonts';

export default function BaseLayout({
  children,
  locale,
  header,
  footer,
  session,
  messages,
  currency,
  cart
}: PropsWithChildren<BaseLayoutProps>) {
  return (
    <html lang={locale} className={cn(montserrat.className, 'scroll-smooth scrollbar')}>
      <ExternalScripts />
      <body className='relative grid overflow-x-clip'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SessionProvider session={session}>
            <AutoLogoutProvider>
              <ThemeProvider>
                <Header data={header} currency={currency} cart={cart} locale={locale} session={session} />
                <main className='flex min-h-dvh flex-1 flex-col'>{children}</main>
                <Footer data={footer} sessionLinks={header?.sessionLinks} session={session} locale={locale} />
                <Modal id='my_modal_3'>
                  <WishlistNotification locale={locale} />
                </Modal>
                <div id='portal' className='z-50' />
                <ClientSideRender />
              </ThemeProvider>
            </AutoLogoutProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
