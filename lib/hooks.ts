'use client';

import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';

import { SCREEEN } from '@/helpers/constants';
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

    updateMatches();

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

export const useAutoScroll = (emblaApi: EmblaCarouselType | undefined, autoScroll: boolean) => {
  useEffect(() => {
    if (!emblaApi) return;

    const autoScrollPlugin = emblaApi.plugins()?.autoScroll;
    if (!autoScrollPlugin) return;

    let slides: HTMLElement[] = [];
    let pausedByHover = false;

    const stopForHover = () => {
      if (autoScrollPlugin.isPlaying()) {
        autoScrollPlugin.stop();
        pausedByHover = true;
      }
    };

    const resumeFromHover = (event: MouseEvent) => {
      const nextTarget = event.relatedTarget as Element | null;

      if (nextTarget?.closest('.embla__slide')) return;
      if (!autoScroll || !pausedByHover) return;

      pausedByHover = false;

      if (!autoScrollPlugin.isPlaying()) {
        autoScrollPlugin.play();
      }
    };

    const attachSlideListeners = () => {
      slides = emblaApi.slideNodes();
      slides.forEach((slide) => {
        slide.addEventListener('mouseenter', stopForHover);
        slide.addEventListener('mouseleave', resumeFromHover);
      });
    };

    const detachSlideListeners = () => {
      slides.forEach((slide) => {
        slide.removeEventListener('mouseenter', stopForHover);
        slide.removeEventListener('mouseleave', resumeFromHover);
      });
      slides = [];
    };

    if (!autoScroll) {
      if (autoScrollPlugin.isPlaying()) {
        autoScrollPlugin.stop();
      }
      return;
    }

    const handleReInit = () => {
      detachSlideListeners();
      attachSlideListeners();

      if (!autoScrollPlugin.isPlaying()) {
        autoScrollPlugin.play();
      }
    };

    emblaApi.on('reInit', handleReInit);

    if (!autoScrollPlugin.isPlaying()) {
      autoScrollPlugin.play();
    }

    attachSlideListeners();

    return () => {
      detachSlideListeners();
      emblaApi.off('reInit', handleReInit);
      autoScrollPlugin.stop();
    };
  }, [autoScroll, emblaApi]);
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

export const useCookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiePolicy = localStorage.getItem('cookie-police');

    if (cookiePolicy !== 'accepted') {
      setIsVisible(true);
    }
  }, []);

  const acceptCookieConsent = () => {
    localStorage.setItem('cookie-police', 'accepted');
    setIsVisible(false);
  };

  return { isVisible, acceptCookieConsent };
};



