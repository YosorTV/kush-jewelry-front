import { FC } from 'react';
import { cn } from '@/lib';

import { MenuIcon } from 'lucide-react';

interface HamburgerProps {
  toggle: () => void;
  isOpened: boolean;
}

export const Hamburger: FC<HamburgerProps> = ({ toggle }) => {
  return (
    <button onClick={toggle} className={cn('relative top-0.5 bg-transparent')}>
      <MenuIcon height={28} width={28} className='h-7 w-7 text-base-200' />
    </button>
  );
};
