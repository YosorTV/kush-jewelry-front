'use client';

import { FC } from 'react';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/lib';
import { usePathname } from '@/lib/navigation';

import { ROOT } from '@/helpers/constants';

import { NextLink } from '@/components/elements';

import { CategoryLinkType } from '@/types/components';

export const MenuItem: FC<CategoryLinkType> = ({ text, url, slug, isExternal, className }) => {
  const pathname = usePathname();
  const params = useSearchParams();

  const category = params.get('category');

  const isActive = url === ROOT ? pathname === url : pathname.startsWith(url) || category === slug;

  return (
    <li className={cn('group', { active: isActive }, className)}>
      <NextLink
        href={url}
        replace={isExternal}
        className='text-sm font-medium capitalize underline-offset-8 group-[.active]:text-base-200 group-[.active]:underline hover:text-base-200 hover:underline'
      >
        {text}
      </NextLink>
    </li>
  );
};
