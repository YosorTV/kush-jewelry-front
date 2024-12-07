'use client';

import { FC } from 'react';
import { signOut } from 'next-auth/react';

import { cn } from '@/lib';

import { ROOT } from '@/helpers/constants';

import { ISignOutButton } from '@/types/components/simple';

export const SignOutButton: FC<ISignOutButton> = ({ text, icon, className, locale = 'uk' }) => {
  return (
    <button
      type='button'
      onClick={() => signOut({ redirect: true, callbackUrl: `${ROOT}${locale}` })}
      className={cn('font-semibold capitalize underline-offset-8 hover:bg-none', className)}
    >
      <span className='flex items-center'>
        {icon && <span className='mr-2'>{icon}</span>}
        {text}
      </span>
    </button>
  );
};
