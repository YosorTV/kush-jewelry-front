import { Image } from '@/components/elements';
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
  fill = false,
  height = 600,
  width = 600,
  priority = false,
  overlay = false,
  sizes = '100vw'
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
        sizes={sizes}
        fill={fill}
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
