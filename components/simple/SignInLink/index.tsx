'use client';

import { FC } from 'react';

import { NextLink } from '@/components/elements';
import { cn } from '@/lib';
import { usePathname } from '@/lib/navigation';
import { UserIcon } from '@/assets/icons';

import { StrapiLinkType } from '@/types/components';

export const SignInLink: FC<StrapiLinkType> = ({ url, text = 'Login' }) => {
  const pathname = usePathname();

  const isActive = pathname.startsWith(url);

  return (
    <NextLink
      href={url}
      className={cn(
        'py-2.5 text-sm font-medium underline-offset-8 hover:text-base-200 hover:underline lg:text-base-200',
        isActive && 'text-base-200 underline'
      )}
    >
      <UserIcon />
    </NextLink>
  );
};
