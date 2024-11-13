'use client';

import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import { useLocale, useTranslations } from 'use-intl';

import { updateUrlParams, usePathname, useRouter } from '@/lib';

import { Button } from '@/components/elements';

import { IPaginateController } from '@/types/components';

export const PaginateController: FC<IPaginateController> = ({ total = 0, disabled = true, perPage = 8 }) => {
  const [pageSize, setPageSize] = useState<number>(perPage);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const t = useTranslations('system');
  const locale = useLocale();

  const handleMore = () => {
    setPageSize((prevSize) => prevSize + 4);
  };

  useEffect(() => {
    const url = updateUrlParams(pathname, params, 'pageSize', String(pageSize));
    router.replace(url, { locale, scroll: false });
  }, [pageSize, router, pathname, params, locale]);

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
