'use client';

import { FC } from 'react';

import { cn } from '@/lib';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';

import { cormorant } from '@/assets/fonts';
import { LottieProps } from '@/types/components';

export const Lottie: FC<LottieProps> = ({ src, text, className, playerClassName }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={cn('flex flex-col items-center justify-center gap-y-10', className)}
    >
      <motion.h1
        className={cn('text-2xl uppercase', cormorant.className)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {text}
      </motion.h1>
      <Player autoplay loop src={src} className={playerClassName} />
    </motion.div>
  );
};
