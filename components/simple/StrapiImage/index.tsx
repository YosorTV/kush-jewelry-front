'use client';

import { Image } from '@/components/elements';
import {
  IMAGE_SIZES,
  IMAGE_SIZES_CARD,
  IMAGE_SIZES_HERO,
  IMAGE_SIZES_THUMBNAIL,
  IMAGE_SIZES_GALLERY,
  IMAGE_SIZES_CAROUSEL,
  BLUR_PLACEHOLDER
} from '@/helpers/constants';
import { cn } from '@/lib';

import { IStrapiImageProps } from '@/types/components/simple/strapiImage.types';

export function StrapiImage({
  id,
  src,
  alt,
  formats,
  loading,
  className,
  containerClass,
  previewUrl,
  fill,
  height,
  width,
  priority = false,
  overlay = false,
  sizes = IMAGE_SIZES,
  imageType = 'default',
  disableTransition = false
}: Readonly<
  IStrapiImageProps & {
    imageType?: 'hero' | 'card' | 'thumbnail' | 'gallery' | 'carousel' | 'default';
    disableTransition?: boolean;
  }
>) {
  const imageFallback = `https://placehold.co/${width}x${height}`;

  console.log('previewUrl', previewUrl);
  console.log('thumbnail url', formats?.thumbnail?.url);

  const blurDataURL = formats?.thumbnail?.url ?? previewUrl ?? BLUR_PLACEHOLDER;

  // Auto-select appropriate sizes based on image type
  const getOptimizedSizes = () => {
    if (sizes !== IMAGE_SIZES) return sizes; // Use custom sizes if provided

    switch (imageType) {
      case 'hero':
        return IMAGE_SIZES_HERO;
      case 'card':
        return IMAGE_SIZES_CARD;
      case 'thumbnail':
        return IMAGE_SIZES_THUMBNAIL;
      case 'gallery':
        return IMAGE_SIZES_GALLERY;
      case 'carousel':
        return IMAGE_SIZES_CAROUSEL;
      default:
        return IMAGE_SIZES;
    }
  };

  // Optimize loading strategy based on image type
  const getLoadingStrategy = () => {
    if (priority) return undefined; // Let NextJS handle priority images
    if (imageType === 'hero') return 'eager';
    if (imageType === 'thumbnail') return 'eager';
    return loading || 'lazy';
  };

  const noTransition = disableTransition || imageType === 'carousel';

  return (
    <div
      className={cn(
        'relative h-full w-full',
        !noTransition && 'transition-all duration-300 ease-linear',
        containerClass
      )}
    >
      <Image
        id={id}
        src={src ?? imageFallback}
        alt={alt}
        formats={formats}
        priority={priority || imageType === 'hero'}
        loading={priority ? undefined : getLoadingStrategy()}
        blurDataURL={blurDataURL}
        fill={fill}
        sizes={!fill ? getOptimizedSizes() : undefined}
        height={!fill ? height : undefined}
        width={!fill ? width : undefined}
        disableTransition={noTransition}
        className={cn(!noTransition && 'transition-opacity duration-300', fill && 'object-cover', className)}
        unoptimized={!src}
      />
      {overlay && (
        <div className='pointer-events-none absolute inset-0 z-0 bg-black/70 transition-all duration-300 ease-linear' />
      )}
    </div>
  );
}
