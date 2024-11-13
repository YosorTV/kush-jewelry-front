'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { FC } from 'react';

import { useCart } from '@/store';

import { cn } from '@/lib';

import { animCart } from '@/assets/animations';
import { formatPrice, formatTotalAmount } from '@/helpers/formatters';

import { Input, Title } from '@/components/elements';
import { Lottie } from '@/components/elements/Lottie';

import { CartItem } from '../CartItem';

import lottieAnim from '@/public/LottieEmpty.json';

export const CartList: FC<any> = ({ data, currency }) => {
  const t = useTranslations();

  const cartStore = useCart();
  const { theme } = useTheme();

  const { totalPrice } = formatTotalAmount(cartStore.cart);

  const printCartItem = (item: any, index: number) => (
    <>
      <motion.div key={index} className='flex flex-row-reverse items-center justify-between gap-x-2.5'>
        <CartItem
          data={item}
          t={t}
          currency={currency}
          onAdd={() => cartStore.onIncrease(item)}
          onRemove={() => cartStore.onRemove(item)}
        />
      </motion.div>
      {index < cartStore.cart.length - 1 && <div className='divider my-0' />}
    </>
  );

  if (!cartStore.cart.length) {
    return (
      <motion.div
        initial={animCart.basket.initial}
        animate={animCart.basket.animate}
        exit={animCart.basket.exit}
        className='relative flex w-full flex-col items-center justify-center gap-y-5 py-5'
      >
        <Title level='2'>{data.emptyList}</Title>
        <Lottie src={lottieAnim} playerClassName={cn(theme === 'sunset' ? 'invert' : 'invert-0', 'opacity-75')} />
      </motion.div>
    );
  }

  const handleSubmit = () => {
    cartStore.setTotalPrice(cartStore.prePurchase ? totalPrice * 0.3 : totalPrice);
    cartStore.setForm('delivery');
  };

  return (
    <div className='relative flex w-full flex-col items-start gap-y-5 pb-10'>
      <Title level='2' className='w-full self-center text-center'>
        {t('checkout.title')}
      </Title>
      <div className='divider my-0' />
      <div className='flex w-full flex-col gap-y-6'>{cartStore.cart.map(printCartItem)}</div>
      <div className='divider my-0' />
      <div className='flex w-full justify-between'>
        <form>
          <Input
            id='np'
            type='checkbox'
            checked={cartStore.prePurchase}
            label={t('checkout.pre_purchase')}
            onChange={() => cartStore.onPrePurchase()}
            className='checkbox checked:fill-base-200'
            labelStyle='text-base-200 font-medium text-base cursor-pointer'
            containerClass='flex-row flex-row-reverse justify-end sm:justify-start items-center gap-x-3'
          />
        </form>
        <p className='font-semibold text-base-200'>
          {t('checkout.total')}: {formatPrice(cartStore.prePurchase ? totalPrice * 0.3 : totalPrice, currency)}
        </p>
      </div>
      <button onClick={handleSubmit} className='btn btn-primary w-full !rounded-none text-base-100'>
        {t('checkout.delivery')}
      </button>
    </div>
  );
};
