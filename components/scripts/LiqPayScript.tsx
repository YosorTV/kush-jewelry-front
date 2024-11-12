import Script from 'next/script';

export const LiqPayScript = () => {
  return <Script src='//static.liqpay.ua/libjs/checkout.js' strategy='beforeInteractive' />;
};
