import { montserrat } from '@/assets/fonts';
import { ClientSideRender } from '@/components/complex';
import Modal from '@/components/complex/Modal';
import { Footer } from '@/components/elements';
import Header from '@/components/elements/Header';
import { AutoLogoutProvider, ThemeProvider } from '@/components/providers';

import { WishlistNotification } from '@/components/simple/WishlistNotification';
import { cn } from '@/lib';
import { BaseLayoutProps } from '@/types/components';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';

import Script from 'next/script';
import { PropsWithChildren } from 'react';

export default async function BaseLayout({
  children,
  locale,
  header,
  footer,
  session,
  messages,
  cart
}: PropsWithChildren<BaseLayoutProps>) {
  return (
    <html lang={locale} suppressHydrationWarning className={cn(montserrat.className, 'scroll-smooth scrollbar')}>
      <body className='relative grid overflow-x-clip'>
        <NextIntlClientProvider messages={messages}>
          <SessionProvider session={session}>
            <ThemeProvider>
              <Header data={header} shoppingCart={cart} locale={locale} session={session} />
              <main className='flex min-h-dvh flex-col'>
                <AutoLogoutProvider>{children}</AutoLogoutProvider>
              </main>
              <Footer data={footer} locale={locale} />
              <Modal id='my_modal_3'>
                <WishlistNotification locale={locale} />
              </Modal>
              <div id='portal' />
              <ClientSideRender />
            </ThemeProvider>
          </SessionProvider>
        </NextIntlClientProvider>
        <Script src='//static.liqpay.ua/libjs/checkout.js' strategy='beforeInteractive' async />
      </body>
    </html>
  );
}
