import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { PropsWithChildren } from 'react';

import { montserrat } from '@/assets/fonts';
import { ClientSideRender } from '@/components/complex';
import Modal from '@/components/complex/Modal';
import { Footer } from '@/components/elements';
import Header from '@/components/elements/Header';
import { AutoLogoutProvider, ThemeProvider } from '@/components/providers';

import { ExternalScripts } from '@/components/scripts/ExternalScript';
import { WishlistNotification } from '@/components/simple/WishlistNotification';
import { cn } from '@/lib';
import { BaseLayoutProps } from '@/types/components';

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
    <html lang={locale} suppressHydrationWarning className={cn(montserrat.className, 'scroll-smooth scrollbar')}>
      <ExternalScripts />
      <body className='relative grid overflow-x-clip'>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SessionProvider session={session}>
              <Header data={header} currency={currency} cart={cart} locale={locale} session={session} />
              <main className='flex min-h-dvh flex-col'>
                <AutoLogoutProvider>{children}</AutoLogoutProvider>
              </main>
              <Footer data={footer} sessionLinks={header?.sessionLinks} session={session} locale={locale} />
              <div id='portal' className='z-50' />
              <Modal id='my_modal_3'>
                <WishlistNotification locale={locale} />
              </Modal>
              <ClientSideRender />
            </SessionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
