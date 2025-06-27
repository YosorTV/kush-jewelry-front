import { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib';
import { title } from '@/lib/tailwind/variants';

import { ITitle, ITitleSizes, THeadingTag } from '@/types/components';

export const Title: FC<PropsWithChildren<ITitle>> = ({ level, className, children, variant, size, ...rest }) => {
  if (!children) return null;

  const HeadingTag = `h${level}` as THeadingTag;

  const levelSize = new Map<string, ITitleSizes>([
    ['1', '2xl'], // h1
    ['2', 'xl'], // h2
    ['3', 'lg'], // h3
    ['4', 'md'], // h4
    ['5', 'sm'], // h5
    ['6', 'xs'] // h6
  ]);

  const titleAttribute = typeof children === 'string' ? children : undefined;

  return (
    <HeadingTag
      id={rest.id}
      title={titleAttribute}
      className={cn(title({ size: size || levelSize.get(level), variant }), className)}
      {...rest}
    >
      {children}
    </HeadingTag>
  );
};
