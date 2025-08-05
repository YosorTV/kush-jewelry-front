'use client';

import { Image } from '@/components/elements';
import {
  IMAGE_SIZES,
  IMAGE_SIZES_CARD,
  IMAGE_SIZES_HERO,
  IMAGE_SIZES_THUMBNAIL,
  IMAGE_SIZES_GALLERY
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
  imageType = 'default'
}: Readonly<IStrapiImageProps & { imageType?: 'hero' | 'card' | 'thumbnail' | 'gallery' | 'default' }>) {
  const imageFallback = `https://placehold.co/${width}x${height}`;

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

  return (
    <div className={cn('relative h-full w-full transition-all duration-300 ease-linear', containerClass)}>
      <Image
        id={id}
        src={src ?? imageFallback}
        alt={alt}
        formats={formats}
        priority={priority || imageType === 'hero'}
        loading={priority ? undefined : getLoadingStrategy()}
        blurDataURL={previewUrl || formats?.thumbnail?.url}
        fill={fill}
        sizes={!fill ? getOptimizedSizes() : undefined}
        height={!fill ? height : undefined}
        width={!fill ? width : undefined}
        className={cn(
          // Add better default styles for responsive behavior
          'transition-opacity duration-300',
          fill && 'object-cover',
          className
        )}
        unoptimized={!src}
      />
      {overlay && (
        <div className='pointer-events-none absolute inset-0 z-0 bg-black/70 transition-all duration-300 ease-linear' />
      )}
    </div>
  );
}
