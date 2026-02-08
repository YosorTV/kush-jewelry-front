'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useRef, useCallback } from 'react';

import { liqPayAdapter } from '@/adapters/payment';
import { formatPrice } from '@/helpers/formatters';
import { useRouter } from '@/lib';
import { paymentCallback } from '@/services/api/payment-update';
import { useCart } from '@/store';
import { CartItemType } from '@/types/store';

interface ICartCheckout {
  currency: number;
  liqPayData: { data: string; signature: string };
}

const CartCheckout: FC<ICartCheckout> = ({ currency, liqPayData }) => {
  const cartStore = useCart();
  const router = useRouter();
  const t = useTranslations('material');
  const { data: session } = useSession();
  
  const liqPayContainerRef = useRef<HTMLDivElement | null>(null);
  const liqPayInstanceRef = useRef<any>(null);


  const getFormattedProducts = useCallback(() => {
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
  }, [cartStore.cart, cartStore.totalPrice, currency, t]);

  const handlePaymentCallback = useCallback(async ({ data, signature, paytype, status }:any) => {
      const payload = {
        data,
        signature,
        status,
        paytype,
        products: getFormattedProducts(),
        userId: Number(session?.user?.id) || null,
        customer: {
          firstName: cartStore.delivery.firstName,
          lastName: cartStore.delivery.lastName,
          email: cartStore.delivery.email,
          phone: cartStore.delivery.phoneNumber,
          customer_city: cartStore.delivery.self ? '' : cartStore.delivery.novapostCity.label,
          customer_warehouse: cartStore.delivery.self ? '' : cartStore.delivery.novapostWarehouse.label,
          self_delivery: cartStore.delivery.self
        }
      };

      const result = await paymentCallback(payload);

      if (result.data?.status === 200) {
        setTimeout(() => {
          cartStore.resetDelivery();
          cartStore.setForm('success');
          router.push('/?checkout=success');
        }, 300);
      }
  }, [cartStore, router, session?.user?.id, getFormattedProducts]);

  useEffect(() => {
    const initializeLiqPay = () => {
      if (!liqPayData?.data || !liqPayData?.signature || !liqPayContainerRef.current) {
        return;
      }

      // Clean up previous instance
      if (liqPayInstanceRef.current) {
        liqPayInstanceRef.current.destroy?.();
        liqPayInstanceRef.current = null;
      }

      // Clear container
      if (liqPayContainerRef.current) {
        liqPayContainerRef.current.innerHTML = '';
      }

      try {
        // Initialize new LiqPay instance
        liqPayInstanceRef.current = LiqPayCheckout.init(
          liqPayAdapter(liqPayData)
        ).on('liqpay.callback', handlePaymentCallback);
      } catch (error) {
        console.error('LiqPay initialization error:', error);
      }
    };

    initializeLiqPay();

    return () => {
      if (liqPayInstanceRef.current) {
        liqPayInstanceRef.current.destroy?.();
        liqPayInstanceRef.current = null;
      }
    };
  }, [liqPayData, cartStore.delivery]);

  return (
    <div 
      ref={liqPayContainerRef} 
      className='liqpay-theme h-full w-full overflow-hidden bg-info-content pb-10 pt-5' 
      id='liqpay_checkout'
      aria-label="LiqPay payment form"
    />
  );
};

export default CartCheckout;
