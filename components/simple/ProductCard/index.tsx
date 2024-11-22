import { FC } from 'react';

import { NextLink, Title } from '@/components/elements';
import AnimatedImage from '@/components/simple/AnimatedImage';

import { cn, Link } from '@/lib';

import { ProductCardProps } from '@/types/components';
import { Price } from '../Price';
import { Wishlist } from '../Wishlist';

export const ProductCard: FC<ProductCardProps> = ({
  product,
  className,
  imgClassName,
  session = null,
  currency = 41,
  t
}) => {
  return (
    <figure className={cn('grid cursor-pointer overflow-hidden', className)}>
      <div className='relative'>
        <AnimatedImage product={product} className={imgClassName} />
        <span className='absolute left-0 top-0 z-[3] bg-neutral p-2 text-base-300'>{product.hintText}</span>
        {product.saleValue > 0 && (
          <span className='absolute left-0 top-12 z-[3] bg-neutral p-2 text-base-300'>-{product.saleValue}%</span>
        )}
        <Wishlist
          className='absolute !right-0 top-0 !z-[3]'
          session={session}
          locale={product.locale}
          productId={product.id}
          inWishlist={product?.inWishlist ?? false}
        />
      </div>
      <figcaption className='flex w-full flex-col pt-2.5'>
        <div className='flex min-h-6 flex-1 items-baseline justify-between'>
          <NextLink href={`/catalog/${product.slug}`}>
            <Title level='3' className='font-semibold'>
              {product.title}
            </Title>
          </NextLink>
          <Price currency={currency} price={product?.price} sale={product?.saleValue} />
        </div>
        <div
          className={cn(
            'flex min-h-6 w-full items-center justify-between',
            product?.collections?.data?.length > 0 ? 'justify-between' : 'justify-end'
          )}
        >
          {product?.collections?.data?.map((collection) => (
            <Link
              className='link-hover link flex gap-x-2 underline-offset-8'
              key={collection.slug}
              href={`/collection/${collection.slug}`}
            >
              {t('collection')}&nbsp;{collection.title}
            </Link>
          ))}
        </div>
      </figcaption>
    </figure>
  );
};
