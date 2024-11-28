'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

import { animCart } from '@/assets/animations';
import { cn } from '@/lib';
import { useScrollLock } from '@/lib/hooks';
import { SidebarProps } from '@/types/components';

export const Sidebar: FC<PropsWithChildren<SidebarProps>> = ({ opened, position, children, onToggle }) => {
  useScrollLock(opened);

  return (
    <AnimatePresence mode='wait' presenceAffectsLayout>
      {opened && (
        <motion.div
          initial={animCart.fade.initial}
          animate={animCart.fade.animate}
          exit={animCart.fade.exit}
          onClick={onToggle}
          className='fixed left-0 top-0 z-20 h-screen w-full bg-black/50'
        >
          <motion.div
            layout='position'
            onClick={(e) => e.stopPropagation()}
            className={cn(
              'fixed top-0 h-screen w-full overflow-auto overflow-x-hidden bg-info-content p-2.5 scrollbar sm:w-3/4 md:w-2/3 xl:w-5/12',
              position === 'left' && 'left-0',
              position === 'right' && 'right-0'
            )}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
