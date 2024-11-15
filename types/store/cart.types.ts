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
  onDelete: (item: CartItemType) => void;
  onAdd: (field: { key: keyof CartItemType; value: any }) => void;
  onSubmit: (item: CartItemType) => void;
  onRemove: (item: CartItemType) => void;
  onReset: () => void;
  onIncrease: (data: CartItemType) => void;
  resetDelivery: () => void;
  syncCartData: (data: CartItemType) => void;
  onPrePurchase: () => void;
  setTotalPrice: (value: number) => void;
};
