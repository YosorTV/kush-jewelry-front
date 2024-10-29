'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { FC } from 'react';

import { useCart } from '@/store';

import { cn } from '@/lib';

import { animCart } from '@/assets/animations';
import { formatPrice, formatTotalAmount } from '@/helpers/formatters';

import { Title } from '@/components/elements';
import { Lottie } from '@/components/elements/Lottie';

import { CartItem } from '../CartItem';

import lottieAnim from '@/public/LottieEmpty.json';

export const CartList: FC<any> = ({ data, currency }) => {
  const cartStore = useCart();

  const { theme } = useTheme();
  const t = useTranslations();

  const { totalPrice } = formatTotalAmount(cartStore.cart);

  const printCartItem = (item: any) => (
    <motion.div key={item.id} className='flex flex-row-reverse items-center justify-between gap-x-2.5'>
      <CartItem
        data={item}
        t={t}
        currency={currency}
        onAdd={() => cartStore.onIncrease(item)}
        onRemove={() => cartStore.onRemove(item)}
      />
    </motion.div>
  );

  if (!cartStore.cart.length) {
    return (
      <motion.div
        initial={animCart.basket.initial}
        animate={animCart.basket.animate}
        exit={animCart.basket.exit}
        className='relative flex w-full flex-col items-center justify-center gap-y-4'
      >
        <Title level='2'>{data.emptyList}</Title>
        <Lottie src={lottieAnim} playerClassName={cn(theme === 'sunset' ? 'invert' : 'invert-0', 'opacity-75')} />
      </motion.div>
    );
  }

  return (
    <div className='relative flex w-full flex-col items-start gap-y-5'>
      <Title level='2' className='w-full self-center text-center'>
        {t('checkout.title')}
      </Title>
      <div className='divider my-0' />
      <div className='w-full'>{cartStore.cart.map(printCartItem)}</div>
      <div className='divider my-0' />
      <p className='ml-auto font-semibold text-base-200'>
        {t('checkout.total')}: {formatPrice(totalPrice, currency)}
      </p>
      <button
        onClick={() => cartStore.setForm('delivery')}
        className='btn btn-primary w-full !rounded-none text-base-100'
      >
        {t('checkout.delivery')}
      </button>
    </div>
  );
};
