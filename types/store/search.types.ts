import { Product } from '@/types/components';
import { PageProps } from '../app/page.types';

export interface TSearchState {
  searchValue: string;
  searchResult: Product[];
  isOpen: boolean;
  isLoading: boolean;
  currency: number;
  error: any;
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
  onToggle: () => void;
  onReset: () => void;
  onSearch: (value: string) => void;
  fetchCurrency: () => Promise<void>;
  fetchProducts: ({ locale, name, page, pageSize }: PageProps['searchParams']) => Promise<void>;
}
