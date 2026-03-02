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
import CartCheckout, { MonoIframeCheckoutData } from '@/components/simple/CartCheckout';
import CartList from '@/components/simple/CartList';
import CartDelivery from '@/components/simple/CartDelivery';
import CartSuccess from '@/components/simple/CartSuccess';

// LiqPay: was fetching {data, signature} for embed SDK
// Mono iframe: fetches {checkoutUrl, invoiceId, orderId} and renders iframe src={checkoutUrl}

export const ShoppingCart: FC<ShoppingCartProps> = ({ data, locale, currency }) => {
  const cartStore = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [monoCheckoutData, setMonoCheckoutData] = useState<MonoIframeCheckoutData | null>(null);

  // LiqPay liqPayData state — commented, replaced by monoWidgetConfig
  // const [liqPayData, setLiqPayData] = useState({ data: '', signature: '' });

  const fetchMonoCheckoutData = useCallback(async () => {
    const options = paymentDataAdapter({
      locale,
      currency,
      data: cartStore.cart,
      customer: cartStore.delivery,
      prePurchase: cartStore.prePurchase
    });

    try {
      const response = await paymentCreate(options);

      // Next route returns { success, data }, where data may already be checkout object
      // or a nested data wrapper depending on Strapi response shape.
      const raw = response?.data;
      const checkoutData = raw?.checkoutUrl ? raw : raw?.data;

      if (checkoutData?.checkoutUrl) {
        setMonoCheckoutData(checkoutData as MonoIframeCheckoutData);
      } else {
        console.error('Mono: unexpected response from payment/create', response);
      }
    } catch (err) {
      console.error('Mono fetchCheckoutData error:', err);
    }
  }, [currency, cartStore.cart, cartStore.delivery, cartStore.prePurchase, locale]);

  // LiqPay fetchLiqPayData — commented, replaced by fetchMonoWidgetConfig
  // const fetchLiqPayData = useCallback(async () => { ... }, [...]);

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
      fetchMonoCheckoutData();
    } else {
      setMonoCheckoutData(null);
      // LiqPay: setLiqPayData({ data: '', signature: '' }); — replaced by setMonoCheckoutData(null)
    }
  }, [cartStore.key, fetchMonoCheckoutData]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (cartStore.isOpen) {
      params.set('checkout', cartStore.key);
    } else {
      params.delete('checkout');
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [cartStore.isOpen, cartStore.key, searchParams, router]);

  const contentZone: Record<string, React.ReactNode> = {
    cart: <CartList data={data} currency={currency} />,
    delivery: <CartDelivery />,
    // LiqPay: checkout: <CartCheckout currency={currency} liqPayData={liqPayData} />
    checkout: (
      <CartCheckout
        checkoutData={monoCheckoutData}
        locale={locale}
      />
    ),
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
          <div className={cn('relative flex h-full w-full flex-col items-start p-2.5')}>
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
            <div className='flex min-h-0 w-full flex-1'>
              {contentZone[cartStore.key]}
            </div>
          </div>
        </Sidebar>
      </Portal>
    </>
  );
};
