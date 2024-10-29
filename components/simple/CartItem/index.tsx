'use client';

import { FC, useMemo } from 'react';

import { Title } from '@/components/elements';
import { formatPrice } from '@/helpers/formatters';
import { CartItemProps } from '@/types/components';
import { useLocale } from 'next-intl';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';
import { StrapiImage } from '../StrapiImage';

export const CartItem: FC<CartItemProps> = ({ data, currency, onAdd, onRemove, t }) => {
  const locale = useLocale();

  const quantityTitle = useMemo(() => {
    return locale === 'uk' ? 'Кількість:' : 'Quantity:';
  }, [locale]);

  const priceTitle = useMemo(() => {
    return locale === 'uk' ? 'Ціна за одиницю:' : 'Price for item:';
  }, [locale]);

  const sizeTitle = useMemo(() => {
    return locale === 'uk' ? 'Розмір:' : 'Size:';
  }, [locale]);

  return (
    <>
      <StrapiImage
        src={data?.images?.url}
        alt={data?.images?.alternativeText}
        formats={data?.images?.formats}
        loading='lazy'
        width={400}
        height={400}
        className='aspect-square rounded-none object-cover'
        containerClass='w-40'
      />
      <div className='flex flex-col'>
        <div className='flex flex-col gap-y-2.5'>
          <Title level='4'>{data?.name}</Title>
          {data?.size && (
            <p className='text-sm font-medium normal-case text-base-200'>
              {sizeTitle}&nbsp;{data?.size}
            </p>
          )}

          <div className='flex h-min items-center gap-x-2'>
            <p className='text-sm font-medium normal-case text-base-200'>
              {quantityTitle}&nbsp;{data?.quantity}
            </p>
            <div className='flex items-center gap-x-1.5'>
              <button className='btn-circle h-min w-auto' onClick={onRemove}>
                <IoRemoveCircle height={6} width={6} />
              </button>
              <button className='btn-circle h-min w-auto' onClick={onAdd}>
                <IoAddCircle height={6} width={6} />
              </button>
            </div>
          </div>

          {data.material && (
            <p className='text-sm font-medium normal-case text-base-200'>
              {t('material.title')}: {t(`material.${data.material}`)}
            </p>
          )}

          <p className='text-sm font-medium normal-case text-base-200'>
            {priceTitle}&nbsp;{formatPrice(data?.unit_amount, currency)}
          </p>
        </div>
      </div>
    </>
  );
};
