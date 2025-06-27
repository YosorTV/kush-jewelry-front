import { Session } from 'next-auth';

interface TextNode {
  type: 'text';
  text: string;
}

interface ParagraphNode {
  type: 'paragraph';
  children: TextNode[];
}

interface DescriptionNode extends ParagraphNode {}

interface CollectionItem {
  id: number;
  title: string;
  description: DescriptionNode[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  slug: string;
  hintText: string;
}

export interface Product {
  id: number;
  title: string;
  available: boolean;
  inWishlist?: boolean;
  color: string;
  colors: {
    data: string[];
  };
  code: string;
  collections: {
    data: CollectionItem[];
  };
  category: string;
  slug: string;
  description: string;
  locale: string;
  price: number;
  priceText: string;
  saleValue: number;
  sizes: { data: string[] };
  materials: { data: string[] };
  hintText: string;
  quantity: number;
  updatedAt: string;
  images: {
    data: any[];
  };
}

export type ProductItem = {
  id: string;
  name: string;
  images?: any | any[];
  category?: string;
  quantity?: number;
  unit_amount: number | null;
  price?: number;
};

export type ProductCardProps = {
  product: Product;
  className?: string;
  currency?: number;
  session?: Session | null;
  imgClassName?: string;
};
