'use client';

import { EmblaCarouselType } from 'embla-carousel';
import { FC, useCallback } from 'react';
import { LiaLongArrowAltLeftSolid, LiaLongArrowAltRightSolid } from 'react-icons/lia';
import { RxDividerVertical } from 'react-icons/rx';

import { cn } from '@/lib';
import { usePrevNextButtons, useScreen } from '@/lib/hooks';
import { Button } from '../Button';
interface ICarouseControllers {
  emblaApi: EmblaCarouselType;
  autoplay?: boolean;
  autoScroll?: boolean;
  fill?: string;
}

export const CarouselControllers: FC<ICarouseControllers> = ({
  emblaApi,
  autoplay = false,
  autoScroll = false,
  fill = 'fill-base-200'
}) => {
  const { lg } = useScreen();

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const handleButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const scrollPlugin = emblaApi?.plugins()?.autoScroll;
      const autoplayPlugin = emblaApi?.plugins()?.autoplay;

      if (autoScroll) {
        const resetOrStop = scrollPlugin.options.stopOnInteraction === false ? scrollPlugin.reset : scrollPlugin.stop;
        resetOrStop();
      }

      if (autoplay) {
        const resetOrStop =
          autoplayPlugin.options.stopOnInteraction === false ? autoplayPlugin.reset : autoplayPlugin.stop;
        resetOrStop();
      }

      callback();
    },
    [autoScroll, autoplay, emblaApi]
  );

  const size = lg ? 24 : 20;

  return (
    <div className='embla__controls'>
      <div className='embla__buttons'>
        <Button
          className={cn('embla__button embla__button--prev', prevBtnDisabled && 'opacity-25')}
          type='button'
          onClick={() => handleButtonAutoplayClick(onPrevButtonClick)}
          disabled={prevBtnDisabled}
        >
          <LiaLongArrowAltLeftSolid className={fill} style={{ width: size, height: size }} />
        </Button>
        <RxDividerVertical
          className={cn('rotate-45', fill === 'fill-white' && 'text-white')}
          style={{ height: size, width: size }}
        />
        <Button
          className={cn('embla__button embla__button--next', nextBtnDisabled && 'opacity-25')}
          type='button'
          onClick={() => handleButtonAutoplayClick(onNextButtonClick)}
          disabled={nextBtnDisabled}
        >
          <LiaLongArrowAltRightSolid className={fill} style={{ width: size, height: size }} />
        </Button>
      </div>
    </div>
  );
};
