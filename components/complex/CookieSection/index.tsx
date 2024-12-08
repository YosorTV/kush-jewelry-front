'use client';

import { CircleX } from 'lucide-react';

import { useCookieConsent } from '@/lib/hooks';

import { Button } from '@/components/elements';
import { useTranslations } from 'next-intl';

export const CookieSection = () => {
  const { isVisible, acceptCookieConsent } = useCookieConsent();

  const t = useTranslations('system');

  if (!isVisible) return null;

  return (
    <div className='px-15 fixed bottom-0 left-0 z-50 flex min-h-8 w-full flex-col items-start bg-neutral pl-5 text-white transition-all duration-300 sm:flex-row sm:items-center sm:justify-between'>
      <p className='pb-2 pr-5 pt-2.5 text-xs sm:py-2.5 sm:pr-2.5'>{t('cookie')}</p>
      <div className='flex w-full items-baseline justify-between gap-x-5 sm:w-min sm:justify-end sm:pr-5'>
        <div className='flex whitespace-nowrap text-sm uppercase sm:mb-0'>
          <Button className='link-hover link' onClick={acceptCookieConsent}>
            {t('accept')}
          </Button>
        </div>

        <CircleX
          size={24}
          className='relative right-5 top-1.5 cursor-pointer sm:right-0'
          onClick={acceptCookieConsent}
        />
      </div>
    </div>
  );
};
