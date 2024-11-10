import { tv } from 'tailwind-variants';

import { cormorant } from '@/assets/fonts';
import { cn } from '@/lib/cn';

export const title = tv({
  base: 'text-base-200 font-medium break-words',
  variants: {
    variant: {
      heading: 'text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
      subheading: 'text-2xl xs:text-3xl md:text-4xl lg:text-5xl'
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
      '8xl': 'text-8xl'
    }
  },
  compoundVariants: [{ variant: ['heading', 'subheading'], className: cn(cormorant.className, 'uppercase') }]
});
