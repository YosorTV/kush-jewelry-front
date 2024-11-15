import { CartItemType, CartState, IDeliveryForm } from '@/types/store';
import { StateCreator } from 'zustand';

export const cartSlice: StateCreator<CartState> = (set) => ({
  formState: {
    id: null,
    material: null,
    category: null,
    name: null,
    size: null,
    unit_amount: 0,
    description: null,
    images: [],
    quantity: 0,
    url: ''
  },
  delivery: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    self: false,
    novapostCity: {
      label: null,
      value: null
    },
    novapostWarehouse: {
      label: null,
      value: null
    }
  },
  cart: [],
  key: 'cart',
  isOpen: false,
  prePurchase: false,
  totalPrice: 0,
  paymentIntentId: '',
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setTotalPrice: (price) => set(() => ({ totalPrice: price })),
  onPrePurchase: () => set((state) => ({ prePurchase: !state.prePurchase })),
  onSubmit: (item) =>
    set((state) => {
      const existedItem = state.cart.find(({ id }) => item.id === id);

      if (existedItem) {
        const updatedCart = state.cart.map((el) => {
          if (el.id === item.id) return { ...el, quantity: el.quantity! + 1 };

          return el;
        });
        return { cart: updatedCart };
      }

      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  onRemove: (item) =>
    set((state) => {
      const existedItem = state.cart.find((el) => el.id === item.id);

      if (existedItem && existedItem.quantity! > 1) {
        const updatedCart = state.cart.map((el) => {
          if (el.id === item.id) return { ...el, quantity: el.quantity! - 1 };
          return el;
        });

        return { cart: updatedCart };
      }

      return { cart: state.cart.filter((el) => el.id !== item.id) };
    }),
  onDelete: (item) => set((state) => ({ cart: state.cart.filter((el) => el.id !== item.id) })),
  onAdd: ({ key, value }) =>
    set((state) => ({
      formState: {
        ...state.formState,
        [key]: value
      }
    })),
  onIncrease: (data: CartItemType) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === data.id);

      if (existingItem) {
        const updatedCart = state.cart.map((el) => {
          if (el.id === data.id) return { ...el, quantity: el.quantity! + 1 };

          return el;
        });

        return { cart: updatedCart };
      }

      return { cart: [...state.cart, { ...data, quantity: 1 }] };
    }),
  onReset: () =>
    set(() => ({
      formState: {
        id: null,
        material: null,
        name: null,
        size: null,
        unit_amount: 0,
        description: null,
        images: [],
        quantity: 0,
        url: ''
      }
    })),
  setDelivery: (key: keyof IDeliveryForm, value: string) =>
    set((state) => ({
      delivery: {
        ...state.delivery,
        [key]: value
      }
    })),
  globalReset: () =>
    set(() => ({
      cart: [],
      key: 'cart',
      formState: {
        id: null,
        material: null,
        name: null,
        size: null,
        unit_amount: 0,
        description: null,
        images: [],
        quantity: 0,
        url: ''
      },
      delivery: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        self: false,
        novapostCity: {
          label: null,
          value: null
        },
        novapostWarehouse: {
          label: null,
          value: null
        }
      }
    })),
  resetDelivery: () =>
    set(() => ({
      delivery: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        self: false,
        novapostCity: {
          label: null,
          value: null
        },
        novapostWarehouse: {
          label: null,
          value: null
        }
      }
    })),
  setPaymentIntentId: (value) => set(() => ({ paymentIntentId: value })),
  setForm: (value) => set(() => ({ key: value })),
  syncCartData: (data: CartItemType) =>
    set((state) => ({
      formState: {
        ...state.formState,
        ...data,
        quantity: state.formState.quantity || 1
      }
    }))
});
