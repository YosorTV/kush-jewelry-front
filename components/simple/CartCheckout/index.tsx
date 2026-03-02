// LiqPay CartCheckout — commented out, replaced by MonoPay iframe below
// (original LiqPay embed component preserved for reference)
//
// 'use client';
// import { liqPayAdapter } from '@/adapters/payment'; // LiqPay
// const CartCheckout: FC<{ currency: number; liqPayData: { data: string; signature: string } }> = ...
// LiqPayCheckout.init(liqPayAdapter(liqPayData)).on('liqpay.callback', handlePaymentCallback);
// export default CartCheckout;

'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { useCart } from '@/store';

export interface MonoIframeCheckoutData {
  checkoutUrl: string;
  invoiceId?: string;
  orderId?: number;
  monoWidgetConfig?: {
    keyId: string;
    signature: string;
    requestId: string;
    payloadBase64: string;
  } | null;
}

interface ICartCheckout {
  checkoutData: MonoIframeCheckoutData | null;
  locale?: string;
}

// inputs {checkoutData}, renders mono iframe checkout, handles iframe postMessage events
const CartCheckout: FC<ICartCheckout> = ({ checkoutData, locale = 'uk' }) => {
  const cartStore = useCart();
  const [frameError, setFrameError] = useState<string | null>(null);
  const [widgetError, setWidgetError] = useState<string | null>(null);
  const cardPaymentHint = locale === 'en' ? 'Pay with card' : 'Оплата карткою';
  const monoPayHint = locale === 'en' ? 'Or pay with mono button' : 'Або сплатіть кнопкою mono';

  const handleFrameMessage = useCallback((event: MessageEvent) => {
    if (!event?.origin?.includes('monobank.ua')) return;

    let data: { message?: string; value?: string } = {};
    try {
      data = typeof event.data === 'string' ? JSON.parse(event.data || '{}') : (event.data || {});
    } catch (error) {
      console.warn('Mono iframe message parse warning:', error);
      return;
    }

    if (data.message === 'close-button') {
      cartStore.setForm('delivery');
    }

    if (data.message === 'monopay-link' && data.value) {
      globalThis.window.location.href = data.value;
    }
  }, [cartStore]);

  useEffect(() => {
    if (!checkoutData?.checkoutUrl) {
      return;
    }

    setFrameError(null);
    globalThis.window.addEventListener('message', handleFrameMessage, false);
    return () => globalThis.window.removeEventListener('message', handleFrameMessage, false);
  }, [checkoutData?.checkoutUrl, handleFrameMessage]);

  useEffect(() => {
    const config = checkoutData?.monoWidgetConfig;
    if (!config?.keyId || !config?.signature || !config?.requestId || !config?.payloadBase64) return;

    const mountWidget = () => {
      const container = globalThis.document.getElementById('monopay-button-container');
      if (!container || !globalThis.window?.MonoPay) return false;

      try {
        globalThis.window.MonoPay.destroy?.();
        container.innerHTML = '';

        const { button } = globalThis.window.MonoPay.init({
          keyId: config.keyId,
          signature: config.signature,
          requestId: config.requestId,
          payloadBase64: config.payloadBase64,
          ui: { buttonType: 'pay', theme: 'dark', corners: 'rounded' },
          callbacks: {
            onSuccess: () => {
              cartStore.resetDelivery();
              cartStore.setForm('success');
            },
            onError: (error: unknown) => {
              const message = error instanceof Error ? error.message : 'MonoPay button failed';
              setWidgetError(message);
              console.error('MonoPay button error:', error);
            },
          },
        });

        container.appendChild(button);
        return true;
      } catch (error) {
        console.error('MonoPay button init error:', error);
        setWidgetError('MonoPay button is unavailable for this terminal.');
        return false;
      }
    };

    setWidgetError(null);
    if (mountWidget()) {
      return () => globalThis.window.MonoPay?.destroy?.();
    }

    const interval = setInterval(() => {
      if (mountWidget()) clearInterval(interval);
    }, 250);

    return () => {
      clearInterval(interval);
      globalThis.window.MonoPay?.destroy?.();
    };
  }, [checkoutData?.monoWidgetConfig, cartStore]);

  if (!checkoutData?.checkoutUrl) {
    return (
      <div className='flex h-full w-full items-center justify-center py-16'>
        <span className='loading loading-spinner loading-lg text-base-200' />
      </div>
    );
  }

  return (
    <div className='flex h-full min-h-0 w-full flex-col items-center justify-center gap-y-4 pb-2 pt-3'>
      <p className='text-center text-base font-medium text-base-300'>{cardPaymentHint}</p>
      <iframe
        id='payFrame'
        title='monopay'
        src={checkoutData.checkoutUrl}
        allow='payment *'
        className='h-full min-h-[576px] w-full rounded-3xl border-0'
      />
      <p className='text-center text-sm text-base-300'>{monoPayHint}</p>
      <div id='monopay-button-container' className='w-full' />
      {frameError && (
        <p className='max-w-md text-center text-sm text-error'>{frameError}</p>
      )}
      {widgetError && (
        <p className='max-w-md text-center text-sm text-warning'>{widgetError}</p>
      )}
    </div>
  );
};

export default CartCheckout;
