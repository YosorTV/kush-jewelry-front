'use client';

import { FC, PropsWithChildren, useMemo } from 'react';

import { cn } from '@/lib';
import { EmblaOptionsType } from 'embla-carousel';
import AutoScroll from 'embla-carousel-auto-scroll';
import Autoplay from 'embla-carousel-autoplay';

import { CarouselControllers } from '@/elements/Carousel/CarouselControllers';
import { CarouselTitle } from '@/elements/Carousel/CarouselTitle';
import { useAutoScroll, useScreen } from '@/lib/hooks';
import useEmblaCarousel from 'embla-carousel-react';

interface EmblaCarouselProps {
  title?: string;
  total: number;
  options?: EmblaOptionsType;
  className?: string;
  autoScroll?: boolean;
  /** When true, auto-scroll runs on mobile too (e.g. ProductCarousel is mobile-only) */
  autoScrollOnMobile?: boolean;
  autoplay?: boolean;
  titleClass?: string;
  fill?: string;
  format: 'standart' | 'mini';
}

const Carousel: FC<PropsWithChildren<EmblaCarouselProps>> = ({
  title,
  options,
  children,
  className,
  autoScroll = false,
  autoScrollOnMobile = false,
  autoplay = false,
  total,
  titleClass = 'text-base-300',
  fill = 'fill-base-200',
  format = 'standart'
}) => {
  const { xl } = useScreen();

  // Auto-scroll: desktop (xl) always when autoScroll; mobile only when autoScrollOnMobile (e.g. ProductCarousel)
  const effectiveAutoScroll = autoScroll && (xl || autoScrollOnMobile);

  const autoScrollPlugin = useMemo(
    () =>
      AutoScroll({
        playOnInit: false,
        startDelay: 1000,
        stopOnMouseEnter: false,
        stopOnInteraction: true,
        stopOnFocusIn: true
      }),
    []
  );

  const autoPlayPlugin = useMemo(
    () =>
      Autoplay({
        playOnInit: false,
        delay: 1000,
        stopOnMouseEnter: true,
        stopOnInteraction: true
      }),
    []
  );

  const plugins = useMemo(() => {
    const list = [];

    // Always add plugin when autoScroll is requested so it works after resize to desktop
    if (autoScroll) list.push(autoScrollPlugin);
    if (autoplay) list.push(autoPlayPlugin);

    return list;
  }, [autoScroll, autoplay, autoScrollPlugin, autoPlayPlugin]);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const isAvailableControllers = useMemo(() => {
    const showByFormat = {
      standart: total > 3,
      mini: total > 2
    };

    if (xl) {
      return showByFormat[format];
    } else {
      return true;
    }
  }, [format, xl, total]);

  useAutoScroll(emblaApi, effectiveAutoScroll);

  return (
    <div className={cn(`embla-${format}`, className)}>
      <div className={cn('flex w-full items-center', title ? 'justify-between' : 'justify-end')}>
        {title && <CarouselTitle title={title} className={titleClass} />}
        {isAvailableControllers && <CarouselControllers emblaApi={emblaApi} fill={fill} autoScroll={effectiveAutoScroll} />}
      </div>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>{children}</div>
      </div>
    </div>
  );
};

export default Carousel;
