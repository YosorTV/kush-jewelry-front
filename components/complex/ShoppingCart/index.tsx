'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { IoArrowBack } from 'react-icons/io5';
import { BsFillBagFill } from 'react-icons/bs';

import { useCart } from '@/store';

import { Button, Portal, Sidebar, Badge } from '@/components/elements';

import { cn, useRouter } from '@/lib';
import { paymentCreate } from '@/services';

import { CloseIcon } from '@/assets/icons';
import { paymentDataAdapter } from '@/adapters/payment';

import { ShoppingCartProps } from '@/types/components/complex';
import CartCheckout from '@/components/simple/CartCheckout';
import CartList from '@/components/simple/CartList';
import CartDelivery from '@/components/simple/CartDelivery';
import CartSuccess from '@/components/simple/CartSuccess';

export const ShoppingCart: FC<ShoppingCartProps> = ({ data, locale, currency }) => {
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
      customer: cartStore.delivery,
      prePurchase: cartStore.prePurchase
    });

    const response = await paymentCreate(options);

    if (response?.data) {
      setLiqPayData(response.data);
    }
  }, [currency, cartStore.cart, cartStore.delivery, cartStore.prePurchase]);

  const handleToggle = useCallback(() => {
    cartStore.onToggle();
  }, [cartStore.onToggle]);

  const handleBack = useCallback(() => {
    if (cartStore.key === 'cart') {
      handleToggle();
    } else if (cartStore.key === 'delivery') {
      cartStore.setForm('cart');
    } else if (cartStore.key === 'checkout') {
      cartStore.setForm('delivery');
    } else {
      handleToggle();
    }
  }, [cartStore.key, cartStore.setForm, handleToggle]);

  useEffect(() => {
    if (cartStore.key === 'checkout') {
      fetchLiqPayData();
    } else {
      setLiqPayData({ data: '', signature: '' });
    }
  }, [cartStore.key]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (cartStore.isOpen) {
      params.set('checkout', cartStore.key);
    } else {
      params.delete('checkout');
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [cartStore.isOpen, cartStore.key, searchParams, router]);

  const contentZone = {
    cart: <CartList data={data} currency={currency} />,
    delivery: <CartDelivery />,
    checkout: <CartCheckout currency={currency} liqPayData={liqPayData} />,
    success: <CartSuccess />
  };

  return (
    <>
      <Button
        onClick={handleToggle}
        className='relative flex cursor-pointer items-center gap-x-2 border-none bg-none text-lg font-medium outline-none'
      >
        {cartStore.cart.length > 0 && <Badge counter={cartStore.cart.length} />}
        <BsFillBagFill height={24} width={24} className='h-6 w-6 fill-base-200' />
      </Button>

      <Portal selector='portal'>
        <Sidebar position='right' onToggle={handleToggle} opened={cartStore.isOpen}>
          <div className={cn('relative flex w-full flex-col items-start p-2.5')}>
            <div className='flex w-full items-end justify-between'>
              <Button
                type='button'
                onClick={handleBack}
                className='!text-xs underline-offset-8 hover:underline md:!text-sm'
                icon={{ before: <IoArrowBack className='h-6 w-6 fill-base-200' /> }}
              />

              <Button
                type='button'
                onClick={handleToggle}
                className='!text-xs underline-offset-8 hover:underline md:!text-sm'
                icon={{ before: <CloseIcon className='h-6 w-6 fill-base-200' /> }}
              />
            </div>
            {contentZone[cartStore.key]}
          </div>
        </Sidebar>
      </Portal>
    </>
  );
};
