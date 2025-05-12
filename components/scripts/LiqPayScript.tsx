import Script from 'next/script';

export const LiqPayScript = () => {
  return <Script type='text/javascript' src='//static.liqpay.ua/libjs/checkout.js' strategy='afterInteractive' />;
};
