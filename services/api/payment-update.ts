interface IPayment {
  data: string;
  signature: string;
  products: any[];
  customer: any;
  userId: number;
  paytype: string;
  status: string;
}

export const paymentCallback = async (data: IPayment) => {
  const response = await fetch('/api/cart/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  return result;
};
