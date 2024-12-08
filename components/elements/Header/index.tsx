import { Logo } from '@/components/elements';
import { Menu } from '@/components/simple';
import { Search, ShoppingCart, UserSession } from '@/components/complex';

import { generateHeaderData } from '@/helpers';

import { HeaderProps } from '@/types/components';

export default function Header({ data, cart, session, locale, currency }: HeaderProps) {
  const collectionsData = generateHeaderData(data?.collectionTitle, data?.collections?.data);
  const categoryData = generateHeaderData(data?.categoryTitle, data?.categories?.data);
  const pagesData = generateHeaderData(data?.pagesTitle, data?.pages);

  return (
    <header className='fixed top-0 z-50 flex min-h-20 w-screen cursor-pointer items-center border-b border-info-content bg-base-100 px-5 drop-shadow-md lg:px-6'>
      <nav className='relative flex w-full items-center justify-between'>
        <Logo width={160} height={48} className='lg:absolute-center relative top-1.5 -z-10 block lg:w-full' />
        <div className='flex flex-1 flex-row-reverse items-center gap-x-6 lg:flex-row lg:items-center lg:justify-between'>
          <Menu
            pages={pagesData}
            authLink={data?.cta}
            sessionLinks={data?.sessionLinks}
            collections={collectionsData}
            categories={categoryData}
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
          </div>
        </div>
      </nav>
    </header>
  );
}
