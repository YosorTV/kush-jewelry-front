'use client';

import { Input, Title } from '@/components/elements';
import { useCart } from '@/store';
import { IDeliveryForm } from '@/types/store';
import { Session } from 'next-auth';
import { useLocale } from 'next-intl';
import { FC, useEffect } from 'react';

interface IPersonalCheckoutForm {
  data: Session['user'] | IDeliveryForm;
  title: string;
}

export const PeronalCheckoutForm: FC<IPersonalCheckoutForm> = ({ data, title = 'Особисті дані' }) => {
  const cartStore = useCart();
  const locale = useLocale();

  useEffect(() => {
    if (data) {
      cartStore.setDelivery('firstName', data.firstName || '');
      cartStore.setDelivery('lastName', data.lastName || '');
      cartStore.setDelivery('email', data.email || '');
      cartStore.setDelivery('phoneNumber', data.phoneNumber || '');
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    cartStore.setDelivery(name as keyof IDeliveryForm, value);
  };

  const firstName = cartStore.delivery.firstName ?? data?.firstName;
  const lastName = cartStore.delivery.lastName ?? data?.lastName;
  const email = cartStore.delivery.email ?? data?.email;
  const phoneNumber = cartStore.delivery.phoneNumber ?? data?.phoneNumber;

  return (
    <div className='form-control gap-y-3'>
      <Title level='2' className='w-full self-center text-center'>
        1.{title}
      </Title>
      <form className='form-control gap-y-6'>
        <Input
          id='name'
          name='firstName'
          label={locale === 'uk' ? "Ім'я" : 'Name'}
          defaultValue={firstName}
          onChange={handleChange}
          className='input checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-base cursor-pointer'
        />
        <Input
          id='lastName'
          name='lastName'
          defaultValue={lastName}
          label={locale === 'uk' ? 'Прізвисько' : 'Last name'}
          onChange={handleChange}
          className='input checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-base cursor-pointer'
        />
        <Input
          id='email'
          name='email'
          defaultValue={email}
          label={locale === 'uk' ? 'Пошта' : 'Email'}
          onChange={handleChange}
          className='input checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-base cursor-pointer'
        />
        <Input
          id='phone'
          autoComplete='off'
          value={phoneNumber}
          type='tel'
          name='phoneNumber'
          onChange={(v) => cartStore.setDelivery('phoneNumber', String(v))}
          label={locale === 'uk' ? 'Номер телефону' : 'Phone number'}
          className='input checked:fill-base-200'
          labelStyle='text-base-200 font-medium text-base cursor-pointer'
        />
      </form>
    </div>
  );
};
