export interface IOrderCard {
  name: string;
  price: string;
  image: any;
  status: string;
  amount: string;
  currency: number;
  id: number;
  quantity: number;
  self_delivery: boolean;
  publishedAt: Date;
  url: string | undefined;
  locale: string;
  t: (key: string, options?: Record<string, any>) => string;
}
