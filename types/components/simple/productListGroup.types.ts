
import { Session } from 'next-auth';
import { Product } from './products.type';

export interface IProductListGroup {
  data: Product[];
  className?: string;
  session?: Session | null;
  currency?: number;
  t?: any;
}
