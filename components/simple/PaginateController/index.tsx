'use client';

import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';

import { useTranslations } from 'use-intl';

import { updateUrlParams, usePathname, useRouter } from '@/lib';

import { Button } from '@/components/elements';

import { IPaginateController } from '@/types/components';

export const PaginateController: FC<IPaginateController> = ({ total = 0, disabled = true, perPage = 5 }) => {
  const [pageSize, setPageSize] = useState<number>(perPage);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const t = useTranslations('system');

  const handleMore = () => {
    setPageSize((prevSize) => prevSize + pageSize);

    const url = updateUrlParams(pathname, params, 'pageSize', String(pageSize));

    router.replace(url, { scroll: false });
  };

  return (
    <div className='flex flex-col items-center justify-center pb-5'>
      {total ? (
        <span className='text-sm font-medium uppercase text-base-200'>{t('total', { number: total })}</span>
      ) : null}
      <Button className='btn-link' disabled={disabled} onClick={handleMore}>
        {t('loadMore')}
      </Button>
    </div>
  );
};
