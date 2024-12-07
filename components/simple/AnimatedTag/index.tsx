'use client';

import { ComponentType, FC, HTMLAttributes, PropsWithChildren, RefAttributes, RefObject, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

import { revealAnimation } from '@/assets/animations/reveal';

import { IAnimatedTag } from '@/types/components/simple/animatedTag.types';

export const AnimatedTag: FC<PropsWithChildren<IAnimatedTag>> = ({ children, tag = 'div', ...props }) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as RefObject<Element>, { once: true });

  const MotionTag = motion[tag] as ComponentType<HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>>;

  return (
    <MotionTag {...revealAnimation(isInView)} ref={ref} {...props}>
      {children}
    </MotionTag>
  );
};
