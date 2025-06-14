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

  const imageProps = {
    src,
    alt: alt ?? "image",
    priority,
    quality: fill ? 100 : 99,
    placeholder: "blur" as PlaceholderValue,
    blurDataURL,
    className: cn("transition-opacity duration-300", className),
    loading,
  }

  return (
    <>
      {fill ? <NextImage {...imageProps} fill={fill} sizes={sizes} /> : <NextImage {...imageProps} height={height} width={width} />}
    </>
  );
};
