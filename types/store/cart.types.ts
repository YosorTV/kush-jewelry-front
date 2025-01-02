export type CartItemType = {
  id: string | null;
  name: string | null;
  images?: any | any[];
  description?: string | null;
  unit_amount: number;
  material?: string | null;
  category?: string | null;
  size?: number | null;
  quantity?: number;
  url?: string;
};

export type TMetaCartItem = {
  currency: string;
  content_ids: number[];
  content_name: string;
  content_description: string;
  content_material: string;
  content_category: string;
  content_size: number;
  value: number;
  quantity: number;
};

export interface IDeliveryForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  self: boolean;
  novapostWarehouse: Record<string, string | null>;
  novapostCity: Record<string, string | null>;
}

type FormKey = 'checkout' | 'cart' | 'success' | 'delivery';

export type CartState = {
  formState: CartItemType;
  delivery: IDeliveryForm;
  prePurchase: boolean;
  totalPrice: number;
  cart: CartItemType[];
  key: FormKey;
  isOpen: boolean;
  paymentIntentId: string;
  globalReset: () => void;
  setDelivery: (key: keyof IDeliveryForm, value: any) => void;
  setPaymentIntentId: (value: string) => void;
  setForm: (value: FormKey) => void;
  onToggle: () => void;
  onSubmit: (item: CartItemType) => Promise<void>;
  onDelete: (item: CartItemType) => void;
  onAdd: (field: { key: keyof CartItemType; value: any }) => void;
  onRemove: (item: CartItemType) => void;
  onReset: () => void;
  onIncrease: (data: CartItemType) => void;
  resetDelivery: () => void;
  syncCartData: (data: CartItemType) => void;
  onPrePurchase: () => void;
  setTotalPrice: (value: number) => void;
};
