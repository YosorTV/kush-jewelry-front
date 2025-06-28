import { FC } from 'react';
import NextImage from 'next/image';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

import { cn } from '@/lib';
import { IImageProps } from '@/types/components';
import { IMAGE_SIZES } from '@/helpers/constants';

export const Image: FC<IImageProps> = ({
  src,
  height = 100,
  width = 100,
  className,
  alt,
  priority = false,
  fill = false,
  formats,
  loading,
  sizes = IMAGE_SIZES
}) => {
  const blurDataURL = formats?.thumbnail?.url;

  // Optimized quality based on use case
  const getOptimizedQuality = () => {
    if (priority) return 95; // High quality for critical images
    if (fill) return 85; // Good quality for hero/background images
    if (Number(width) <= 100 || Number(height) <= 100) return 70; // Lower quality for thumbnails
    return 80; // Default quality
  };

  const imageProps = {
    src,
    alt: alt ?? 'image',
    priority,
    quality: getOptimizedQuality(),
    placeholder: (blurDataURL ? 'blur' : 'empty') as PlaceholderValue,
    blurDataURL,
    className: cn(
      'transition-opacity duration-300',
      // Add object-fit for better responsive behavior
      fill && 'object-cover',
      className
    ),
    loading,
    // Add decoding hint for better performance
    decoding: priority ? ('sync' as const) : ('async' as const)
  };

  return (
    <>
      {fill ? (
        <NextImage {...imageProps} fill={fill} sizes={sizes} />
      ) : (
        <NextImage {...imageProps} height={height} width={width} />
      )}
    </>
  );
};
