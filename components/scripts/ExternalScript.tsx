import { LiqPayScript } from './LiqPayScript';
import { MetaScript } from './MetaScript';

export const ExternalScripts = () => {
  return (
    <head>
      <MetaScript />
      <LiqPayScript />
    </head>
  );
};
