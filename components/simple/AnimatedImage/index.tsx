'use client';

import { FC, useCallback, useMemo, useState } from 'react';

import { useRouter } from '@/lib/navigation';

import { cn } from '@/lib';
import { useScreen } from '@/lib/hooks';
import { Product } from '@/types/components';
import { StrapiImage } from '../StrapiImage';

interface TAnimatedImage {
  product: Product;
  className?: string;
}

const AnimatedImage: FC<TAnimatedImage> = ({ product, className  }) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const router = useRouter();

  const { md } = useScreen();

  const [img1, img2] = useMemo(() => {
    return product?.images?.data || [];
  }, [product.images.data]);

  const handleRedirect = useCallback(() => {
    router.push(`/catalog/${product.slug}`);
  }, [product.slug, router]);

  const imgSizeByScreen = useMemo(() => {
    const defaultWidth = 1000;
    const defaultHeight = 500;

    return {
      sm: {
        width: img1?.formats?.large?.width ?? defaultWidth,
        height: img1?.formats?.large?.height ?? defaultHeight,
      },
      xl: {
        width: img1?.width ?? defaultWidth,
        height: img1?.height ?? defaultHeight,
      }
    }
  }, [img1, img2]);

 
  return (
    <div
      aria-hidden
      onClick={handleRedirect}
      onMouseEnter={() => md && setShowOverlay(true)}
      onMouseLeave={() => md && setShowOverlay(false)}
      className={cn(
        'relative h-full w-full cursor-pointer max-h-[640px]',
        'aspect-square',
        className,
      )}
    >
      {[img1, img2].map((img, idx) => {
        return (
          <div
            key={idx}
            className={cn(
              'absolute inset-0 h-full w-full transform-cpu overflow-hidden transition-opacity duration-300 ease-in-out',
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
              width={imgSizeByScreen['xl'].width}
              height={imgSizeByScreen['xl'].height}
              previewUrl={img?.previewUrl || img?.formats?.thumbnail?.url}
              className='aspect-square h-full w-full overflow-hidden object-cover'
            />
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedImage;
