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
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
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
