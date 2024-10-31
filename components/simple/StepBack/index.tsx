'use client';

import { useRouter } from '@/lib/navigation';
import { FC } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useTranslations } from 'use-intl';

import { Button } from '@/components/elements';
import { cn } from '@/lib';

interface IStepBack {
  className?: string;
}

export const StepBack: FC<IStepBack> = ({ className }) => {
  const router = useRouter();
  const t = useTranslations('system');

  const handleBack = () => router.back();

  return (
    <Button
      type='button'
      onClick={handleBack}
      className={cn(className, '!text-xs underline-offset-8 hover:underline md:!text-sm')}
      icon={{ before: <IoArrowBack className='h-4 w-4 fill-base-200 md:h-6 md:w-6' /> }}
    >
      {t('stepBack')}
    </Button>
  );
};
