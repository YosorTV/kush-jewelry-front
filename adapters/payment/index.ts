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

  const order_id = `order_${uuidv4()}`;
  const description = data.map((item: CartItemType) => item.name).join(',');
  const rawTotal = prePurchase ? totalPrice * 0.3 : totalPrice;

  // Keep amount numeric to avoid locale parsing issues (e.g. comma separators -> NaN).
  const amount = Math.round(((rawTotal * currency) / 100) / 100) * 100;

  const products = data.map((item: CartItemType) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    url: item.url,
    icon: resolveImageUrl(item),
    // Send numeric per-item price in UAH for backend basketOrder math.
    price: Math.round(((item.unit_amount * currency) / 100) / 100) * 100
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
    // rro_info was liqpay-specific — commented
    // rro_info: {
    //   items: products,
    //   delivery_emails: [customer.email],
    //   total_amount: amount,
    //   cashier: 'KUSH'
    // }
  };
};

// LiqPay embed adapter — commented, replaced by mono (mono uses redirect, not embed SDK)
// export const liqPayAdapter = ({ data, signature }: ILiqPayAdapter) => {
//   if (!data || !signature) return null;
//   return {
//     data,
//     signature,
//     embedTo: '#liqpay_checkout',
//     mode: 'embed'
//   };
// };
