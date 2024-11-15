'use client';

import { useSearchParams } from 'next/navigation';
import { FC } from 'react';

import { useTranslations } from 'use-intl';

import { usePathname, useRouter } from '@/lib';

import { Button } from '@/components/elements';

import { IPaginateController } from '@/types/components';

export const PaginateController: FC<IPaginateController> = ({ total = 0, disabled = true, perPage = 8 }) => {
  const t = useTranslations('system');

  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const handleMore = () => {
    const updatedParams = new URLSearchParams(params.toString());
    updatedParams.set('pageSize', String(perPage + 4));

    const newUrl = `${pathname}/?${updatedParams.toString()}`;

    router.replace(newUrl, { scroll: false });
  };

  return (
    <div className='flex flex-col items-center justify-center py-10'>
      {total ? (
        <span className='text-sm font-medium uppercase text-base-200'>{t('total', { number: total })}</span>
      ) : null}
      <Button className='btn-link' disabled={disabled} onClick={handleMore}>
        {t('loadMore')}
      </Button>
    </div>
  );
};
