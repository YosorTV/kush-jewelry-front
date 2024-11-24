import { motion } from 'framer-motion';

type MotionTagType = keyof typeof motion;

export interface IAnimatedTag {
  tag: MotionTagType;
  className?: string;
}
