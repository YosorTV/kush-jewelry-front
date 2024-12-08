import { Session } from 'next-auth';
import { Product } from '@/types/components';

export interface ICompleteLook {
  category: string;
  currency: number;
  session: Session;
  products: Product[];
}
