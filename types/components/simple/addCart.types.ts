import { CartItemType } from '@/types/store';
import { ProductItem } from './products.type';

export type CartItemProps = {
  data: CartItemType;
  currency: number;
  onAdd: () => void;
  onRemove: () => void;
  onDelete: () => void;
  t: (key: string, options?: Record<string, any>) => string;
};

export type AddCartProps = {
  data: ProductItem;
  isDisabled: boolean;
  isSizesNotAvailable: boolean;
};
