import { PropsWithChildren } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';

import Header from '@/components/elements/Header';
import Footer from '@/components/elements/Footer';

import { ThemeProvider } from '@/components/providers';
import { ClientSideRender } from '@/components/complex';

import { BaseLayoutProps } from '@/types/components';

import { cn } from '@/lib';
import { montserrat } from '@/assets/fonts';
import { getCurrency, getLayoutData, getWishlistNotiifcation } from '@/services';
import { auth } from '@/auth';
import { getMessages } from 'next-intl/server';

export default async function BaseLayout({
  children,
  locale,
}: PropsWithChildren<BaseLayoutProps>) {
  const session = await auth();
  const messages = await getMessages();
  const currency = await getCurrency();
  const data = await getLayoutData({ locale });
  const { data: wishlistData } = await getWishlistNotiifcation({ locale });

  const { header, footer, shoppingCart } = data;

  return (
    <html lang={locale} className={cn(montserrat.className, 'scroll-smooth scrollbar')} suppressHydrationWarning>
      <body className='relative grid overflow-x-clip' suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SessionProvider session={session}>
            <ThemeProvider>
              <Header data={header} currency={currency} cart={shoppingCart} locale={locale} session={session} />
              <main className='flex min-h-dvh flex-col' suppressHydrationWarning>{children}</main>
              <Footer data={footer} sessionLinks={header?.sessionLinks} session={session} locale={locale} />
            </ThemeProvider>
            <ClientSideRender locale={locale} wishlistData={wishlistData} />
            <div id='portal' className='z-50' />
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
