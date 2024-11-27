import { NextLink } from '@/components/elements';
import { Avatar } from '@/components/elements/Avatar';
import { SignInLink } from '@/components/simple';
import { SignOutButton } from '@/components/simple/SignOutButton';
import { StrapiLinkType } from '@/types/components';

export default function UserSession({ cta, signOutTitle, session, sessionLinks = [] }: any) {
  if (!session) {
    return <SignInLink {...cta} />;
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
            <SignOutButton text={signOutTitle} />
          </li>
        </ul>
      </div>
    </nav>
  );
}
