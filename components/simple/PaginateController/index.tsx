'use client';

import { FC, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'use-intl';

import { usePathname, useRouter } from '@/lib';

import { Button } from '@/components/elements';

import { IPaginateController } from '@/types/components';

const PaginateController: FC<IPaginateController> = ({ total = 0, disabled = true, perPage = 8 }) => {
  const t = useTranslations('system');

  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const handleMore = useCallback(() => {
    const updatedParams = new URLSearchParams(params.toString());
    updatedParams.set('pageSize', String(perPage + 4));

    const newUrl = `${pathname}/?${updatedParams.toString()}`;

    router.replace(newUrl, { scroll: false });
  }, [pathname, router, params]);

  return (
    <div className='flex flex-col items-center justify-center gap-y-2.5 py-10'>
      {total ? (
        <span className='text-xs font-medium uppercase text-base-200'>{t('total', { number: total })}</span>
      ) : null}
      <Button className='btn-link uppercase' disabled={disabled} onClick={handleMore}>
        {t('loadMore')}
      </Button>
    </div>
  );
};

export default PaginateController;
