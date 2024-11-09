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
  autoplay = false,
  total,
  titleClass = 'text-base-300',
  fill = 'fill-base-200',
  format = 'standart'
}) => {
  const { xl } = useScreen();

  const autoScrollPlugin = AutoScroll({ playOnInit: false, stopOnMouseEnter: true, stopOnInteraction: true });
  const autoPlayPlugin = Autoplay({ delay: 250, stopOnMouseEnter: true, stopOnLastSnap: true });

  const plugins = [autoScroll ? autoScrollPlugin : null, autoplay ? autoPlayPlugin : null].filter(Boolean);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  useAutoScroll(emblaApi, autoScroll);

  const isAvailableControllers = useMemo(() => {
    const showByFormat = {
      standart: total > 4,
      mini: total > 2
    };

    if (xl) {
      return showByFormat[format];
    } else {
      return true;
    }
  }, [format, xl, total]);

  return (
    <div className={cn(`embla-${format}`, className)}>
      <div className={cn('flex w-full items-end', title ? 'justify-between' : 'justify-end')}>
        {title && <CarouselTitle title={title} className={titleClass} />}
        {isAvailableControllers && <CarouselControllers emblaApi={emblaApi} fill={fill} autoScroll={autoScroll} />}
      </div>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>{children}</div>
      </div>
    </div>
  );
};

export default Carousel;
