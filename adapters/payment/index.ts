import { v4 as uuidv4 } from 'uuid';

import { formatTotalAmount } from '@/helpers/formatters';

import { CartItemType, IDeliveryForm } from '@/types/store';

interface IPaymentAdapter {
  data: CartItemType[];
  locale: string;
  currency: number;
  customer: IDeliveryForm;
  prePurchase: boolean;
}

// LiqPay adapter — commented, replaced by mono (no client-side adapter needed)
// interface ILiqPayAdapter {
//   data: string;
//   signature: string;
// }

export const paymentDataAdapter = ({ data, currency, locale, prePurchase = false, customer }: IPaymentAdapter) => {
  const { totalPrice } = formatTotalAmount(data);
  const language = locale === 'en' ? 'en' : 'uk';
  const strapiBaseUrl = (process.env.NEXT_PUBLIC_STRAPI_URL || '').replace(/\/+$/, '');
  // Keep payment math consistent with UI price presentation (rounded to nearest 100 UAH).
  const toRoundedUah = (usdAmount: number) => Math.round((usdAmount * currency) / 100) * 100;

  const resolveImageUrl = (item: CartItemType) => {
    const candidate =
      item?.images?.[0]?.url
      || item?.images?.url
      || item?.images?.data?.[0]?.attributes?.url
      || item?.images?.data?.attributes?.url
      || '';

    if (!candidate) return '';
    if (candidate.startsWith('http://') || candidate.startsWith('https://')) return candidate;
    return strapiBaseUrl ? `${strapiBaseUrl}${candidate}` : candidate;
  };

  const PREPAYMENT_RATE = 0.5;
  const order_id = `order_${uuidv4()}`;
  const description = data.map((item: CartItemType) => item.name).join(',');
  const rawTotal = prePurchase ? totalPrice * PREPAYMENT_RATE : totalPrice;

  // rawTotal (USD) -> rounded UAH amount; backend converts to kopecks (× 100)
  const amount = toRoundedUah(rawTotal);

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error(`Invalid payment amount: ${amount} (rawTotal=${rawTotal}, currency=${currency})`);
  }

  const products = data.map((item: CartItemType) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    url: item.url,
    icon: resolveImageUrl(item),
    // unit_amount (USD) -> rounded UAH amount; backend converts to kopecks (× 100)
    price: toRoundedUah(item.unit_amount)
  }));

  return {
    amount,
    shop_name: 'KUSH | JEWERLY',
    currency: 'UAH',
    description: `Оплата ювелірних прикрас: ${description}`,
    order_id,
    language,
    products,
    customer: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phoneNumber,
      customer_city: customer.self ? '' : customer.novapostCity.label,
      customer_warehouse: customer.self ? '' : customer.novapostWarehouse.label,
      self_delivery: customer.self
    },
  };
};
