'use client';

import { Session } from 'next-auth';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

import { useCart } from '@/store';

import { Input, Title } from '@/components/elements';
import { NovaPostOptions } from '@/components/simple/NovaPostOptions';

interface IDeliveryForm {
  data: Session['user'];
  title: string;
}

export const DeliveryForm: FC<IDeliveryForm> = ({ data, title = 'Спосіб доставки' }) => {
  const t = useTranslations('cart');
  const cartStore = useCart();

  const warehouseOptions = {
    label: data?.warehouse ?? cartStore.delivery?.novapostWarehouse?.label,
    value: data?.warehouseID ?? cartStore.delivery?.novapostWarehouse?.value
  };

  const cityOptions = {
    label: data?.city ?? cartStore.delivery?.novapostCity?.label,
    value: data?.cityID ?? cartStore.delivery?.novapostCity?.value
  };

  const handleSelfDelivery = () => {
    cartStore.setDelivery('self', !cartStore.delivery.self);
    if (!cartStore.delivery.self) {
      cartStore.setDelivery('novapostCity', null);
      cartStore.setDelivery('novapostWarehouse', null);
    }
  };

  const handleNovaPostDelivery = () => {
    cartStore.setDelivery('self', false);
  };

  return (
    <form className='form-control gap-y-5 pt-2.5'>
      <Title level='2' className='w-full self-center text-center'>
        2.{title}
      </Title>
      <div className='flex flex-col gap-y-5 py-5 sm:flex-row sm:justify-between'>
        <Input
          id='np'
          type='checkbox'
          checked={!cartStore.delivery.self}
          label={t('novapost')}
          onChange={handleNovaPostDelivery}
          className='checkbox checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-base cursor-pointer'
          containerClass='flex-row flex-row-reverse justify-end sm:justify-start items-center gap-x-3'
        />

        <Input
          id='self'
          type='checkbox'
          checked={cartStore.delivery.self}
          label={t('self')}
          onChange={handleSelfDelivery}
          className='checkbox checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-base cursor-pointer'
          containerClass='flex-row flex-row-reverse justify-end items-center gap-x-3'
        />
      </div>

      {!cartStore.delivery.self && (
        <>
          <div className='divider my-0' />
          <div className='form-control gap-y-5'>
            <Title level='4'>{t('delivery_spot')}</Title>
            <NovaPostOptions
              warehouseOptions={warehouseOptions}
              cityOptions={cityOptions}
              onCityChange={(city) => cartStore.setDelivery('novapostCity', city)}
              onWarehouseChange={(warehouse) => cartStore.setDelivery('novapostWarehouse', warehouse)}
            />
          </div>
        </>
      )}
    </form>
  );
};
