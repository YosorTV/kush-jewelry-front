import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { cn } from '@/lib';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: {
    before?: ReactNode;
    after?: ReactNode;
  };
}

export const Button: FC<IButton> = ({ icon, children, className, disabled, onClick, ...props }) => {
  const printButtonContent = () => (
    <span className='flex items-center'>
      {icon?.before && <span className='mr-2'>{icon.before}</span>}
      {children}
      {icon?.after && <span className='ml-2'>{icon.after}</span>}
    </span>
  );

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        className,
        !disabled && 'cursor-pointer',
        'btn no-animation m-0 rounded-none border-none bg-transparent p-0 font-semibold text-base-200 no-underline underline-offset-8 shadow-none outline-none transition-all hover:bg-transparent disabled:bg-transparent'
      )}
    >
      {printButtonContent()}
    </button>
  );
};
