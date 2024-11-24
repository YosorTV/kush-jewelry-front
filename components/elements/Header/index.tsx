import { Search } from '@/components/complex';
import { ShoppingCart } from '@/components/complex/ShoppingCart';
import { Logo } from '@/components/elements';
import { LangChanger, Menu, ThemeChanger } from '@/components/simple';

import UserSession from '@/components/complex/UserSession';

import { HeaderProps } from '@/types/components';

export default function Header({ data, cart, session, locale, currency }: HeaderProps) {
  const collectionsData = {
    title: data?.collectionTitle,
    data: data?.collections?.data ?? []
  };

  const categoryData = {
    title: data?.categoryTitle,
    data: data?.categories?.data ?? []
  };

  const pagesData = {
    title: data?.pagesTitle,
    data: data?.pages
  };

  return (
    <header className='fixed z-50 flex min-h-16 w-full cursor-pointer items-center border-b border-info-content bg-base-100 px-2.5 drop-shadow-md md:px-5'>
      <nav className='flex w-full items-center justify-between'>
        <div className='flex items-center'>
          <Menu pages={pagesData} collections={collectionsData} categories={categoryData} />
        </div>
        <Logo
          width={160}
          height={48}
          className='absolute-center inset-0 top-3 hidden w-svw items-center justify-center sm:flex'
        />
        <div className='flex items-center gap-x-6'>
          <Search placeholder={data?.searchTitle} />
          <ShoppingCart data={cart} locale={locale} currency={currency} />
          <UserSession
            cta={data?.cta}
            locale={locale}
            session={session}
            signOutTitle={data?.signOutTitle}
            sessionLinks={data?.sessionLinks}
          />
          <div className='hidden lg:flex lg:gap-x-6'>
            <LangChanger />
            <ThemeChanger />
          </div>
        </div>
      </nav>
    </header>
  );
}
