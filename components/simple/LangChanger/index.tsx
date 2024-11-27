'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { LOCALES } from '@/helpers/constants';
import { cn, createQueryString } from '@/lib';

export const LangChanger: FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();
  const locale = useLocale();

  const handleChange = () => {
    const { pathname, search } = window.location;
    const url = createQueryString(`${pathname}${search}`);

    router.replace(url, { scroll: true });
  };

  return (
    <div
      className={cn('dropdown dropdown-end dropdown-top dropdown-hover font-medium uppercase text-base-200', className)}
    >
      <span tabIndex={0} role='button' className='underline underline-offset-8'>
        {locale}
      </span>
      <ul tabIndex={0} className='menu dropdown-content z-[1] !w-min bg-base-100 p-2 shadow'>
        {LOCALES.map((lang) => (
          <li key={lang} onClick={handleChange} className='uppercase'>
            <span>{lang}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
