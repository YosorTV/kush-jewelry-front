'use client';

import { FC } from 'react';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/elements';

export const SignInProviders: FC<{ text: string; identifier: string }> = ({ text, identifier }) => {
  const handleGoogle = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  const actionProvider: any = {
    google: handleGoogle
  };

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <Button
        type='button'
        className='w-full rounded-none border-none !bg-transparent text-base text-base-200 outline-none hover:!bg-base-200 hover:text-base-100'
        onClick={actionProvider[identifier]}
      >
        {text}
      </Button>
    </div>
  );
};
