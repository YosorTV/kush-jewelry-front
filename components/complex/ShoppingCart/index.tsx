'use client';

import { FC, useCallback, useEffect, useState } from 'react';

import { useCart } from '@/store';

import { paymentDataAdapter } from '@/adapters/payment';
import { Button, Portal, Sidebar } from '@/components/elements';
import { Badge } from '@/components/elements/Badge';
import { CartList } from '@/components/simple';
import { CartCheckout } from '@/components/simple/CartCheckout';
import { CartDelivery } from '@/components/simple/CartDelivery';
import { cn } from '@/lib';
import { paymentCreate } from '@/services';
import { ShoppingCartProps } from '@/types/components/complex';
import { useTranslations } from 'next-intl';
import { BsFillBagFill } from 'react-icons/bs';
import { IoArrowBack } from 'react-icons/io5';
import { Success } from '../Success';

export const ShoppingCart: FC<ShoppingCartProps> = ({ data, locale, currency }) => {
  const t = useTranslations();
  const cartStore = useCart();

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
            <Button
              type='button'
              onClick={handleBack}
              className='!text-xs underline-offset-8 hover:underline md:!text-sm'
              icon={{ before: <IoArrowBack className='h-4 w-4 fill-base-200 md:h-6 md:w-6' /> }}
            >
              {t('system.stepBack')}
            </Button>
            {contentZone[cartStore.key]}
          </div>
        </Sidebar>
      </Portal>
    </>
  );
};
