import { FC } from 'react';
import { LogoIcon } from '@/assets/icons';
import { cn } from '@/lib';

interface TLogo {
  className?: string;
  width?: number;
  height?: number;
}

export const Logo: FC<TLogo> = ({ className, width = 160, height = 42 }) => {
  return (
    <LogoIcon width={width} height={height} className={cn('absolute-center -z-10 fill-base-200 py-1', className)} />
  );
};
