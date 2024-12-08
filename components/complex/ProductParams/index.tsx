'use client';

import { MaterialOptions } from '@/components/simple/MaterialOptions';
import { SizeOptions } from '@/components/simple/SizeOptions';
import { usePathname } from '@/lib/navigation';
import { useCart } from '@/store';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useTranslations } from 'use-intl';

export const ProductParams: FC<PropsWithChildren<any>> = ({
  sizes = [],
  materials = [],
  availableSizes = [],
  children
}: any) => {
  const state = useCart();
  const t = useTranslations();
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      state.onReset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <section className='flex flex-col gap-y-6'>
      {materials && <MaterialOptions data={materials} title={t('material.title')} />}
      {availableSizes.length ? <SizeOptions data={sizes} sizes={availableSizes} title={t('size.title')} /> : null}
      {children}
    </section>
  );
};
