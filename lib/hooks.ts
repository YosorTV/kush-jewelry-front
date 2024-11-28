'use client';

import { SCREEEN } from '@/helpers/constants';
import { EmblaCarouselType } from 'embla-carousel';
import { useCallback, useEffect, useState } from 'react';

import { getCurrency } from '@/services';
import { debounce } from './utils';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const controller = new AbortController();

    const updateMatches = () => {
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
    };

    const debouncedUpdate = debounce(updateMatches, 100);

    media.addEventListener('change', debouncedUpdate, { signal: controller.signal });

    return () => {
      controller.abort();
    };
  }, [matches, query]);

  return matches;
};

export const useScreen = () => {
  const xs = useMediaQuery(SCREEEN.xs);
  const sm = useMediaQuery(SCREEEN.sm);
  const md = useMediaQuery(SCREEEN.md);
  const lg = useMediaQuery(SCREEEN.lg);
  const xl = useMediaQuery(SCREEEN.xl);
  const xxl = useMediaQuery(SCREEEN.xxl);

  return { xs, sm, md, lg, xl, xxl };
};

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev(false);
      onButtonClick?.(emblaApi);
    }
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext(false);
      onButtonClick?.(emblaApi);
    }
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback(() => {
    if (emblaApi) {
      setPrevBtnDisabled(!emblaApi.canScrollPrev());
      setNextBtnDisabled(!emblaApi.canScrollNext());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    onSelect();

    return () => {
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  };
};

export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    const controller = new AbortController();
    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    if (isLocked) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('scroll', preventScroll, { signal: controller.signal });
    } else {
      document.body.style.overflow = '';
      controller.abort();
    }

    return () => {
      document.body.style.overflow = '';
      controller.abort();
    };
  }, [isLocked]);
};

export const useDebounce = (value: any, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useAutoScroll = (emblaApi: EmblaCarouselType, autoScroll: boolean) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!emblaApi || !autoScroll) return;

    const onAutoScroll = emblaApi?.plugins()?.autoScroll;

    setIsPlaying(onAutoScroll.isPlaying());

    const handlePlay = () => setIsPlaying(true);
    const handleStop = () => setIsPlaying(false);
    const handleReInit = () => setIsPlaying(onAutoScroll.isPlaying());

    emblaApi.on('autoScroll:play', handlePlay).on('autoScroll:stop', handleStop).on('reInit', handleReInit);

    if (!isPlaying) {
      onAutoScroll.play();
    }

    return () => {
      emblaApi.off('autoScroll:play', handlePlay).off('autoScroll:stop', handleStop).off('reInit', handleReInit);
    };
  }, [autoScroll, emblaApi, isPlaying]);
};

export const useCurrency = () => {
  const [currency, setCurrency] = useState<number>(41);

  useEffect(() => {
    const fetchCurrency = async () => {
      const result = await getCurrency();
      setCurrency(result);
    };

    fetchCurrency();
  }, []);

  return currency;
};
