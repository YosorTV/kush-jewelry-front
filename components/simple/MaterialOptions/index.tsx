'use client';

import { cn } from '@/lib';
import { useCart } from '@/store';
import { useTranslations } from 'next-intl';
import { FC, useCallback, useEffect } from 'react';
import { ProductOption } from '../ProductOption';

interface IMaterialOptions {
  data?: any[];
  title?: string;
}

export const MaterialOptions: FC<IMaterialOptions> = ({ data = [], title }) => {
  const state = useCart();

  const t = useTranslations('material');

  useEffect(() => {
    if (data.length === 1) {
      state.onAdd({ key: 'material', value: data[0].value });
    }
  }, [data]);

  const isChecked = useCallback(
    (value: string) => {
      return state.formState.material === value || false;
    },
    [state.formState.material]
  );

  const printElement = ({ value, id }: any) => {
    return (
      <ProductOption
        key={id}
        id={`material-${id}`}
        name='material'
        checked={isChecked(value)}
        title={t(value.trim())}
        onChange={() => state.onAdd({ key: 'material', value })}
        className={isChecked(value) && 'underline'}
      />
    );
  };

  return (
    <div className='flex flex-col gap-y-3'>
      {title && <p className='text-lg font-semibold'>{title}</p>}
      {data.length > 0 && (
        <div className={cn('flex gap-5', data.length >= 4 ? 'flex-col' : 'flex-row')}>{data.map(printElement)}</div>
      )}
    </div>
  );
};
