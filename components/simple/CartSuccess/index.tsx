'use client';

import { useCallback, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

import { useRouter } from '@/lib';
import { useCart } from '@/store';

const CartSuccess = () => {
  const cartStore = useCart();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('cart');

  const handleClose = useCallback(() => {
    cartStore.onToggle();
    router.push(`/${locale}`);
  }, [cartStore, locale, router]);

  useEffect(() => {
    return () => {
      cartStore.globalReset();
    };
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className='relative flex h-min w-full flex-col py-16'
    >
      <div className='flex flex-col items-center gap-y-10'>
        <motion.h3 className='text-base text-base-200' initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {t('thanks')}
        </motion.h3>

        <button
          onClick={handleClose}
          className='btn btn-primary w-full !rounded-none text-base-100 disabled:bg-slate-300/10'
        >
          {t('proceed')}
        </button>
      </div>
    </motion.div>
  );
};

export default CartSuccess;
