import { Image } from '@/components/elements';
import { IMAGE_SIZES } from '@/helpers/constants';
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
  sizes = IMAGE_SIZES
}: Readonly<IStrapiImageProps>) {
  const imageFallback = `https://placehold.co/${width}x${height}`;

  return (
    <div className={cn('relative h-full w-full transition-all duration-300 ease-linear', containerClass)}>
      <Image
        id={id}
        src={src ?? imageFallback}
        alt={alt}
        formats={formats}
        priority={priority}
        loading={priority ? undefined : loading}
        blurDataURL={previewUrl}
        fill={fill}
        sizes={!fill ? sizes : undefined}
        height={!fill ? height : undefined}
        width={!fill ? width : undefined}
        className={className}
        unoptimized={!src}
      />
      {overlay && (
        <div className='pointer-events-none absolute inset-0 z-0 bg-black/70 transition-all duration-300 ease-linear' />
      )}
    </div>
  );
}
