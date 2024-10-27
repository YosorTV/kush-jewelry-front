'use client';

import { Button } from '@/components/elements';
import { DeliveryForm, PeronalCheckoutForm } from '@/components/forms';
import { useCart } from '@/store';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

import { ROOT } from '@/helpers/constants';
import { isFormIncomplete } from '@/helpers/validator';
import { useRouter } from '@/lib';
import { getMe } from '@/services/api/get-me';
import { useTranslations } from 'next-intl';

export const CartDelivery = () => {
  const [user, setUser] = useState(null);

  const router = useRouter();
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

  const handleBack = () => {
    cartStore.setForm('cart');
    cartStore.resetDelivery();

    router.push(ROOT);
  };

  useEffect(() => {
    if (session.status === 'authenticated' && !user) {
      fetchProfileData();
    }
  }, [session.status]);

  return (
    <div className='form-control w-full px-5'>
      <Button onClick={handleBack} className='btn btn-link justify-start px-0 text-lg normal-case'>
        {t('system.stepBack')}
      </Button>
      <div className='form-control gap-y-2.5 py-10'>
        <PeronalCheckoutForm data={user} title={t('cart.personal')} />
        <div className='divider mb-2.5' />
        <DeliveryForm data={user} title={t('cart.delivery')} />
        <div className='divider' />
        <button
          disabled={isFormIncomplete(cartStore.delivery)}
          onClick={() => cartStore.setForm('checkout')}
          className='btn btn-primary w-full text-base-100 disabled:opacity-50'
        >
          {t('checkout.payments')}
        </button>
      </div>
    </div>
  );
};
