import { PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';

import Header from '@/components/elements/Header';
import Footer from '@/components/elements/Footer';

import { ThemeProvider } from '@/components/providers';
import { ClientSideRender, Modal } from '@/components/complex';
import { WishlistNotification } from '@/components/simple';

import { BaseLayoutProps } from '@/types/components';

import { cn } from '@/lib';
import { montserrat } from '@/assets/fonts';
import { ExternalScripts } from '@/components/scripts';
import { CookieSection } from '@/components/complex/CookieSection';
import { getCurrency, getLayoutData } from '@/services';
import { auth } from '@/auth';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function BaseLayout({
  children,
  locale,
}: PropsWithChildren<BaseLayoutProps>) {
  const messages = await getMessages();
  const session = await auth();
  const data = await getLayoutData({ locale });
  const currency = await getCurrency();

  if(!data) {
    return notFound();
  }

  const { header, footer, shoppingCart } = data;

  return (
    <html lang={locale} className={cn(montserrat.className, 'scroll-smooth scrollbar')}>
      <body className='relative grid overflow-x-clip'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SessionProvider session={session}>
            <ThemeProvider>
              <Header data={header} currency={currency} cart={shoppingCart} locale={locale} session={session} />
              <main className='flex min-h-dvh flex-col'>{children}</main>
              <Footer data={footer} sessionLinks={header?.sessionLinks} session={session} locale={locale} />
              <CookieSection />
              <Modal id='my_modal_3'>
                <WishlistNotification locale={locale} />
              </Modal> 
            </ThemeProvider>
            <div id='portal' className='z-50' />
            <div>
              <ClientSideRender />
              <ExternalScripts />
            </div>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
