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
  sizes = '(max-width:768px) 100vw, (max-width:968px) 70vw, (max-width:1200px) 100vw'
}: Readonly<IStrapiImageProps>) {
  const imageFallback = `https://placehold.co/${width}x${height}`;

  return (
    <div className={cn('relative h-full w-full transition-all duration-300 ease-linear', containerClass)}>
      {fill ? (
        <Image
          id={id}
          src={src ?? imageFallback}
          alt={alt}
          formats={formats}
          fill={fill}
          priority
          blurDataURL={previewUrl}
          sizes={sizes}
          className={className}
          unoptimized={src ? false : true}
        />
      ) : (
        <Image
          id={id}
          src={src ?? imageFallback}
          alt={alt}
          loading={loading}
          height={height as number}
          width={width as number}
          formats={formats && formats}
          blurDataURL={previewUrl}
          priority={priority}
          className={className}
          sizes={sizes}
          unoptimized={src ? false : true}
        />
      )}
      {overlay && (
        <div className='pointer-events-none absolute inset-0 z-0 bg-black/70 transition-all duration-300 ease-linear' />
      )}
    </div>
  );
}
