import { IImageProps } from '@/types/components';
import NextImage from 'next/image';
import { FC } from 'react';

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
  sizes = '(max-width:768px) 50vw, (max-width:968px) 70vw, (max-width:1200px) 100vw'
}) => {
  const blurDataURL = formats?.thumbnail?.url;

  if (fill) {
    return (
      <NextImage
        quality={100}
        sizes={sizes}
        src={src}
        fill={fill}
        priority={priority}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={formats && blurDataURL}
        alt={alt ?? 'image'}
        className={className}
      />
    );
  }

  return (
    <NextImage
      src={src}
      height={height}
      width={width}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={formats && blurDataURL}
      className={className}
      alt={alt ?? 'image'}
      priority={priority}
      quality={99}
      loading={loading}
    />
  );
};
