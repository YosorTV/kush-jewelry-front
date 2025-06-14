'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
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


export function useNavigationHistory() {
  const [history, setHistory] = useState<string[]>([])
  const pathname = usePathname()

  useEffect(() => {
    const existingHistory = sessionStorage.getItem("site-navigation-history")
    const parsedHistory = existingHistory ? JSON.parse(existingHistory) : []

    if (parsedHistory[parsedHistory.length - 1] !== pathname) {
      const updatedHistory = [...parsedHistory, pathname].slice(-20);
      setHistory(updatedHistory)
      sessionStorage.setItem("site-navigation-history", JSON.stringify(updatedHistory))
    } else {
      setHistory(parsedHistory)
    }
  }, [pathname])

  const canGoBack = history.length > 1
  const previousRoute = history[history.length - 2]

  const clearHistory = () => {
    setHistory([pathname])
    sessionStorage.setItem("site-navigation-history", JSON.stringify([pathname]))
  }

  return {
    history,
    canGoBack,
    previousRoute,
    clearHistory,
  }
}
