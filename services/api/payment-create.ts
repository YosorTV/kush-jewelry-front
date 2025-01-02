interface IPayment {
  amount: number;
  currency: string;
  description: string;
  order_id: string;
}

export const paymentCreate = async (data: IPayment) => {
  const response = await fetch('/api/cart/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  return result;
};
