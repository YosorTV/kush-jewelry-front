'use client';

import { FC, useMemo, useState } from 'react';

import { useRouter } from '@/lib/navigation';

import { cn } from '@/lib';
import { useScreen } from '@/lib/hooks';
import { Product } from '@/types/components';
import { StrapiImage } from '../StrapiImage';

interface TAnimatedImage {
  product: Product;
  className?:string;
}

const AnimatedImage: FC<TAnimatedImage> = ({ product, className = 'sm:h-96 md:h-[400px] lg:h-[548px] xl:h-[600px]' }) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const router = useRouter();

  const { md } = useScreen();

  const [img1, img2] = useMemo(() => {
    return product?.images?.data || [];
  }, [product.images.data]);

  const handleRedirect = () => {
    router.push(`/catalog/${product.slug}`);
  };

  if (!img1 && !img2) return null;

  return (
    <div
      aria-hidden
      onClick={handleRedirect}
      onMouseEnter={() => md && setShowOverlay(true)}
      onMouseLeave={() => md && setShowOverlay(false)}
      className={cn('relative h-80', className)}
    >
      {[img1, img2].map((img, idx) => (
        <div
          key={idx}
          className={cn(
            'absolute inset-0 h-full w-full transform-gpu transition-opacity duration-300 ease-in-out',
            showOverlay === (idx === 1) ? 'opacity-100' : 'opacity-0',
            product.quantity === 0 && 'grayscale filter'
          )}
        >
          <StrapiImage
            priority
            loading='eager'
            src={img?.url}
            formats={img?.formats}
            alt={img?.alternativeText}
            previewUrl={img?.previewUrl}
            width={img?.formats?.large?.width ?? 500}
            height={img?.formats?.large?.height ?? 500}
            className='h-full w-full object-cover'
          />
        </div>
      ))}
    </div>
  );
};

export default AnimatedImage;
