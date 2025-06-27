import Script from 'next/script';

export const LiqPayScript = () => {
  return <Script type='text/javascript' src='https://static.liqpay.ua/libjs/checkout.js' strategy='afterInteractive' />;
};
