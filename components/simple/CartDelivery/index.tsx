'use client';

import { DeliveryForm, PeronalCheckoutForm } from '@/components/forms';
import { useCart } from '@/store';
import { useSession } from 'next-auth/react';

import { isFormIncomplete } from '@/helpers/validator';
import { useTranslations } from 'next-intl';

export const CartDelivery = () => {
  const cartStore = useCart();
  const session = useSession();
  const t = useTranslations();

  return (
    <div className='form-control w-full gap-y-5 pb-10'>
      <PeronalCheckoutForm data={session?.data?.user} title={t('cart.personal')} />
      <DeliveryForm data={session?.data?.user} title={t('cart.delivery')} />
      <div className='divider my-0' />
      <button
        disabled={isFormIncomplete(cartStore.delivery)}
        onClick={() => cartStore.setForm('checkout')}
        className='btn btn-primary w-full !rounded-none text-base-100 disabled:bg-slate-300/10'
      >
        {t('checkout.payments')}
      </button>
    </div>
  );
};
