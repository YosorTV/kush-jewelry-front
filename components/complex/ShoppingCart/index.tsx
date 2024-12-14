'use client';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';

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
import { useSearchParams } from 'next/navigation';
import { BsFillBagFill } from 'react-icons/bs';
import { IoArrowBack } from 'react-icons/io5';
import { Success } from '../Success';

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

    setLiqPayData(response);
  }, [currency, cartStore.cart, cartStore.delivery, cartStore.prePurchase]);

  useEffect(() => {
    if (cartStore.key === 'checkout') {
      fetchLiqPayData();
    }
  }, [cartStore.key]);

  const newParams = useMemo(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (cartStore.isOpen) {
      params.set('checkout', cartStore.key);
    } else {
      params.delete('checkout');
    }

    return params.toString();
  }, [cartStore.isOpen, cartStore.key, searchParams]);

  useEffect(() => {
    if (newParams) {
      router.replace(`?${newParams}`, { scroll: false });
    }
  }, [newParams, cartStore.isOpen]);

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

  const contentZone = {
    cart: <CartList data={data} currency={currency} />,
    delivery: <CartDelivery />,
    checkout: <CartCheckout currency={currency} liqPayData={liqPayData} />,
    success: <Success />
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
