'use client';

import { Confetti } from '@/components/simple/Confetti';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Confetti className='h-screen w-screen' />
      {children}
    </>
  );
}
