'use client';

import { useEffect, useState } from 'react';
import { LiqPayScript } from '@/components/scripts/LiqPayScript';
import { MetaScript } from '@/components/scripts/MetaScript';
import { TiktokScript } from '@/components/scripts/TiktokScript';
import { TIKTOK_PIXEL_ID } from '@/helpers/constants';

export const ExternalScripts = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const isInstagramBrowser = typeof window !== 'undefined' && 
    (window.navigator.userAgent.includes('Instagram') || 
     window.navigator.userAgent.includes('FBAN') ||
     window.navigator.userAgent.includes('FBAV'));

  if (!isReady || isInstagramBrowser) {
    return null;
  }

  return (
    <>
      <MetaScript />
      <LiqPayScript />
      <TiktokScript pixelId={TIKTOK_PIXEL_ID} />
    </>
  );
};
