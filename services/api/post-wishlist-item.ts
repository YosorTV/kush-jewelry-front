import { Product } from '@/types/components';

export type TPostWishlistItem = {
  locale: string;
  product: Product;
};

export const postWishlistItem = async (data: TPostWishlistItem) => {
  const response = await fetch('/api/wishlist/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  return result;
};
