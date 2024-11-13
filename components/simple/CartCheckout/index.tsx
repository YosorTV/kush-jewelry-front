'use client';

import { useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';

import { liqPayAdapter } from '@/adapters/payment';
import { formatPrice } from '@/helpers/formatters';
import { useRouter } from '@/lib';
import { paymentCallback } from '@/services/api/payment-update';
import { useCart } from '@/store';
import { CartItemType } from '@/types/store';
import { debounce } from 'lodash';

interface ICartCheckout {
  currency: number;
  liqPayData: { data: string; signature: string };
}

export const CartCheckout: FC<ICartCheckout> = ({ currency, liqPayData }) => {
  const locale = useLocale();
  const cartStore = useCart();
  const router = useRouter();
  const t = useTranslations('material');
  const { data: session } = useSession();

  const liqPayContainerRef = useRef<HTMLDivElement | null>(null);

  const products = useMemo(() => {
    return cartStore.cart.map((item: CartItemType) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      images: item.images,
      price: formatPrice(cartStore.totalPrice, currency).replace(/[^\d.,-]/g, ''),
      url: item.url,
      size: item?.size,
      material: `${t(item?.material)}`
    }));
  }, [cartStore.cart, locale, currency]);

  const debouncedCallback = useCallback(
    debounce(async ({ data, signature, paytype, status }) => {
      const result = await paymentCallback({
        data,
        signature,
        status,
        paytype,
        products,
        userId: Number(session?.user?.id) || null,
        customer: {
          ...cartStore.delivery,
          customer_city: cartStore.delivery.self ? '' : cartStore.delivery.novapostCity.label,
          customer_warehouse: cartStore.delivery.self ? '' : cartStore.delivery.novapostWarehouse.label,
          self_delivery: cartStore.delivery.self
        }
      });

      if (result.status === 200) {
        router.push(`/?checkout=success`);
        cartStore.globalReset();
        cartStore.setForm('success');
      }
    }, 1000),

    [cartStore.delivery, products, session]
  );

  useEffect(() => {
    if (liqPayData.data && liqPayData.signature) {
      if (liqPayContainerRef.current) {
        liqPayContainerRef.current.innerHTML = '';
      }

      LiqPayCheckout.init(liqPayAdapter(liqPayData)).on('liqpay.callback', debouncedCallback);
    }

    return () => {
      liqPayContainerRef.current = null;
    };
  }, [liqPayData]);

  return <div ref={liqPayContainerRef} className='w-full pb-10 pt-5' id='liqpay_checkout' />;
};
