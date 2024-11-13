'use client';

import { FC, useCallback, useEffect, useState } from 'react';

import { useCart } from '@/store';

import { paymentDataAdapter } from '@/adapters/payment';
import { CloseIcon } from '@/assets/icons';
import { Button, Portal, Sidebar } from '@/components/elements';
import { Badge } from '@/components/elements/Badge';
import { CartList } from '@/components/simple';
import { CartCheckout } from '@/components/simple/CartCheckout';
import { CartDelivery } from '@/components/simple/CartDelivery';
import { cn, useRouter } from '@/lib';
import { paymentCreate } from '@/services';
import { ShoppingCartProps } from '@/types/components/complex';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { BsFillBagFill } from 'react-icons/bs';
import { IoArrowBack } from 'react-icons/io5';
import { Success } from '../Success';

export const ShoppingCart: FC<ShoppingCartProps> = ({ data, locale, currency }) => {
  const t = useTranslations();
  const cartStore = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [liqPayData, setLiqPayData] = useState({
    data: '',
    signature: ''
  });

  const fetchLiqPayData = useCallback(async () => {
    const options = paymentDataAdapter({
      locale,
      currency,
      data: cartStore.cart,
      customer: cartStore.delivery
    });

    const response = await paymentCreate(options);

    setLiqPayData(response);
  }, [currency, cartStore.cart, cartStore.delivery]);

  useEffect(() => {
    if (cartStore.key === 'checkout') {
      fetchLiqPayData();
    }
  }, [cartStore.key]);

  useEffect(() => {
    const currentStep = cartStore.key;
    const newParams = new URLSearchParams(searchParams.toString());

    if (cartStore.isOpen) {
      newParams.set('checkout', currentStep);
      router.replace(`?${newParams.toString()}`);
    } else {
      newParams.delete('checkout');
      router.replace(`?${newParams.toString()}`);
    }
  }, [cartStore.isOpen, cartStore.key, router, searchParams]);

  const contentZone = {
    cart: <CartList data={data} currency={currency} />,
    delivery: <CartDelivery />,
    checkout: <CartCheckout currency={currency} liqPayData={liqPayData} />,
    success: <Success />
  };

  const handleToggle = () => cartStore.onToggle();

  const handleBack = () => {
    if (cartStore.key === 'cart') {
      handleToggle();
    } else if (cartStore.key === 'delivery') {
      cartStore.setForm('cart');
    } else if (cartStore.key === 'checkout') {
      cartStore.setForm('delivery');
    } else {
      handleToggle();
    }
  };

  return (
    <>
      <Button
        onClick={handleToggle}
        className='relative flex cursor-pointer items-center gap-x-2 border-none bg-none text-lg font-medium outline-none'
      >
        {cartStore.cart.length > 0 && <Badge counter={cartStore.cart.length} />}
        <BsFillBagFill className='h-6 w-6 fill-base-200' />
      </Button>

      <Portal selector='portal'>
        <Sidebar position='right' onToggle={handleToggle} opened={cartStore.isOpen}>
          <div className={cn('relative top-16 flex w-full flex-col items-start px-5')}>
            <div className='flex w-full justify-between pb-5'>
              <Button
                type='button'
                onClick={handleBack}
                className='!text-xs underline-offset-8 hover:underline md:!text-sm'
                icon={{ before: <IoArrowBack className='h-4 w-4 fill-base-200 md:h-6 md:w-6' /> }}
              >
                {t('system.stepBack')}
              </Button>
              <Button
                type='button'
                onClick={handleToggle}
                className='!text-xs underline-offset-8 hover:underline md:!text-sm'
                icon={{ before: <CloseIcon className='h-4 w-4 fill-base-200 md:h-6 md:w-6' /> }}
              />
            </div>
            {contentZone[cartStore.key]}
          </div>
        </Sidebar>
      </Portal>
    </>
  );
};
