import { FC } from 'react';

import { TbUsers } from 'react-icons/tb';
import { PiListDashesFill } from 'react-icons/pi';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import { FaRegHeart } from 'react-icons/fa';
import { StrapiLinkType } from '@/types/components';
import { SignOutButton } from '../SignOutButton';
import { NextLink } from '@/components/elements';

interface IProfileSidebar {
  links: StrapiLinkType[];
  signOutTitle?: string;
  locale: string;
}

type TIconVariant = 'profile' | 'orders' | 'favourites';

type IIconType = { [key in TIconVariant]: JSX.Element };

export const ProfileSidebar: FC<IProfileSidebar> = ({ links = [], locale, signOutTitle = 'Вийти' }) => {
  const IconByPath: IIconType = {
    profile: <TbUsers className='h-4 w-4 stroke-base-200' />,
    orders: <PiListDashesFill className='h-4 w-4 fill-base-200' />,
    favourites: <FaRegHeart className='h-4 w-4 fill-base-200' />
  };

  const getIconVariant = (url: string): TIconVariant | null => {
    if (url.includes('profile')) return 'profile';
    if (url.includes('orders')) return 'orders';
    if (url.includes('favourites')) return 'favourites';
    return null;
  };

  const printLink = (link: StrapiLinkType) => {
    const iconVariant = getIconVariant(link.url);

    return (
      <li key={link.id} className='flex h-12 w-full items-center'>
        <NextLink
          href={link.url}
          className='link-hover flex items-center gap-x-2 font-semibold uppercase text-base-200 !underline-offset-8 hover:bg-none'
        >
          {iconVariant && IconByPath[iconVariant]}
          {link.text}
        </NextLink>
      </li>
    );
  };

  return (
    <nav className='mt-32 hidden w-max min-w-[300px] px-6 lg:block'>
      <ul className='flex flex-col gap-y-3'>
        {links.length > 0 && links?.map(printLink)}
        <li className='flex h-12 w-full items-center'>
          <SignOutButton
            locale={locale}
            text={signOutTitle}
            className='link-hover flex items-center gap-x-2 font-semibold uppercase text-base-200 hover:bg-none'
            icon={<RiLogoutBoxRLine className='h-4 w-4 fill-base-200' />}
          />
        </li>
      </ul>
    </nav>
  );
};
