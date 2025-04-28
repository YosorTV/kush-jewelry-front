import { LiqPayScript } from '@/components/scripts/LiqPayScript';
import { MetaScript } from '@/components/scripts/MetaScript';
import { TiktokScript } from '@/components/scripts/TiktokScript';
import { TIKTOK_PIXEL_ID } from '@/helpers/constants';

export const ExternalScripts = () => {
  return (
    <>
      <MetaScript />
      <LiqPayScript />
      <TiktokScript pixelId={TIKTOK_PIXEL_ID} />
    </>
  );
};
