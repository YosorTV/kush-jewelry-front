'use client';

import { DeliveryForm, PeronalCheckoutForm } from '@/components/forms';
import { useCart } from '@/store';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { isFormIncomplete } from '@/helpers/validator';
import { getMe } from '@/services/api/get-me';
import { useTranslations } from 'next-intl';

export const CartDelivery = () => {
  const [user, setUser] = useState(null);

  const t = useTranslations();
  const cartStore = useCart();
  const session = useSession();

  const fetchProfileData = useCallback(async () => {
    if (session.data) {
      const { data } = await getMe({ token: session.data.accessToken });

      setUser(data);
    }

    return;
  }, [session?.data?.accessToken, getMe]);

  useEffect(() => {
    if (session.status === 'authenticated' && !user) {
      fetchProfileData();
    }
  }, [session.status]);

  return (
    <div className='form-control w-full gap-y-5 pb-10'>
      <PeronalCheckoutForm data={user} title={t('cart.personal')} />
      <DeliveryForm data={user} title={t('cart.delivery')} />
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
