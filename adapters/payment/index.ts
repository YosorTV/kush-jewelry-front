import { v4 as uuidv4 } from 'uuid';

import { formatPrice, formatTotalAmount } from '@/helpers/formatters';

import { CartItemType, IDeliveryForm } from '@/types/store';

interface IPaymentAdapter {
  data: CartItemType[];
  locale: string;
  currency: number;
  customer: IDeliveryForm;
}

interface ILiqPayAdapter {
  data: string;
  signature: string;
}

export const paymentDataAdapter = ({ data, locale, currency, customer }: IPaymentAdapter) => {
  const { totalPrice } = formatTotalAmount(data);

  const order_id = `order_${uuidv4()}`;
  const description = data.map((item: CartItemType) => item.name).join(',');
  const amount = parseFloat(formatPrice(totalPrice, currency).replace(/[^\d.,-]/g, ''));

  const products = data.map((item: CartItemType) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    url: item.url,
    price: formatPrice(item.unit_amount, currency).replace(/[^\d.,-]/g, '')
  }));

  return {
    amount,
    shop_name: 'KUSH | JEWERLY',
    currency: 'UAH',
    description: `Оплата ювелірних прикрас: ${description}`,
    order_id,
    products,
    customer: {
      ...customer,
      customer_city: customer.self ? '' : customer.novapostCity.label,
      customer_warehouse: customer.self ? '' : customer.novapostWarehouse.label,
      self_delivery: customer.self
    },
    rro_info: {
      items: products,
      delivery_emails: [customer.email],
      total_amount: amount,
      cashier: 'KUSH'
    }
  };
};

export const liqPayAdapter = ({ data, signature }: ILiqPayAdapter) => {
  if (!data || !signature) return null;

  return {
    data,
    signature,
    embedTo: '#liqpay_checkout',
    mode: 'embed'
  };
};
