'use client';

import { FC } from 'react';

import { Title } from '@/components/elements';
import { CartItemProps } from '@/types/components';
import { IoAddCircle, IoRemoveCircle, IoTrash } from 'react-icons/io5';
import { Price } from '../Price';
import { StrapiImage } from '../StrapiImage';

export const CartItem: FC<CartItemProps> = ({ data, currency, onAdd, onRemove, onDelete, t }) => {
  return (
    <div className='group card image-full relative !z-10 h-80 w-full overflow-hidden rounded-none'>
      <figure className='overflow-hidden !rounded-none transition-all duration-300 ease-in-out'>
        <StrapiImage
          sizes='100vw'
          src={data?.images.url}
          alt={data?.images.alt}
          width={data?.images?.formats?.medium?.width}
          height={data?.images?.formats?.medium?.height}
          containerClass='w-full'
          className='aspect-square h-full w-full object-center transition-all'
        />
        <button
          onClick={onDelete}
          type='button'
          className='absolute right-4 top-4 z-10 h-6 w-6 text-base-300 hover:fill-red-500'
        >
          <IoTrash height={32} width={32} className='h-6 w-6 fill-base-300 hover:fill-red-500' />
        </button>
      </figure>
      <div className='card-body mt-auto flex flex-col'>
        <div className='flex flex-col gap-y-2.5 !text-base-300'>
          <Title level='4' className='text-base-300'>
            {data?.name}
          </Title>
          <p className='whitespace-pre-line break-words normal-case text-base-300'>
            {t('cart.size', { number: data.size })}
          </p>
          <p className='whitespace-pre-line break-words normal-case text-base-300'>
            {t('material.title')}: {t(`material.${data.material}`)}
          </p>
          <div className='flex h-min w-36 items-center gap-x-2'>
            <p className='w-min text-base-300'>{t('cart.quantity', { number: data?.quantity })}</p>
            <div className='mr-auto flex items-center gap-x-1.5'>
              <button className='btn-circle h-min w-auto' onClick={onRemove}>
                <IoRemoveCircle height={6} width={6} />
              </button>
              <button className='btn-circle h-min w-auto' onClick={onAdd}>
                <IoAddCircle height={6} width={6} />
              </button>
            </div>
          </div>

          <div className='flex w-min items-baseline gap-x-2'>
            <p className='whitespace-nowrap normal-case text-base-300'>{t('cart.price')}</p>
            <Price currency={currency} price={data.unit_amount} className='!text-sm text-base-300' />
          </div>
        </div>
      </div>
    </div>
  );
};
