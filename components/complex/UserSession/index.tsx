import { FC } from 'react';

import { NextLink, Avatar } from '@/components/elements';
import { SignInLink, SignOutButton } from '@/components/simple';

import { IUserSession, StrapiLinkType } from '@/types/components';

export const UserSession: FC<IUserSession> = ({ cta, signOutTitle, session, sessionLinks = [], locale = 'uk' }) => {
  if (!session) {
    return <SignInLink url={cta.url} isExternal={cta.isExternal} text={cta.text} />;
  }

  const printMenuLink = (link: StrapiLinkType, index: number) => (
    <li tabIndex={index + 1} key={link.id}>
      <NextLink href={link.url} className='font-semibold normal-case hover:bg-none'>
        {link.text}
      </NextLink>
    </li>
  );

  return (
    <nav className='flex items-center justify-end gap-x-6'>
      <div className='dropdown dropdown-end'>
        <button role='button' tabIndex={0} className='flex w-full cursor-pointer items-center justify-center gap-5'>
          <Avatar firstName={session?.user?.firstName || session?.user?.username} lastName={session?.user?.lastName} />
        </button>
        <ul
          tabIndex={0}
          className='menu dropdown-content right-0 top-12 min-w-btn space-y-2.5 rounded-sm border border-t-0 border-info-content bg-base-100 shadow'
        >
          {sessionLinks.map(printMenuLink)}
          <li tabIndex={4}>
            <SignOutButton text={signOutTitle} locale={locale} />
          </li>
        </ul>
      </div>
    </nav>
  );
};
