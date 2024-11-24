import { FC } from 'react';
import { LogoIcon } from '@/assets/icons';
import { cn } from '@/lib';

interface TLogo {
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

export const Logo: FC<TLogo> = ({ className, width = 160, height = 42, onClick }) => {
  return (
    <LogoIcon onClick={onClick} width={width} height={height} className={cn('z-10 fill-base-200 py-1', className)} />
  );
};
