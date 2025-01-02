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
  onSubmit: async (item) => {
    const cartItem = {
      currency: 'USD',
      content_ids: [Number(item.id)],
      content_name: item.name,
      content_description: item.description,
      content_material: item.material,
      content_category: item.category,
      content_size: item.size,
      value: item.unit_amount,
      quantity: item.quantity || 1
    };

    await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItem)
    });

    set((state) => {
      const existedItem = state.cart.find(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size && cartItem.material === item.material
      );

      console.log('existedItem: ', existedItem);

      if (existedItem) {
        const updatedCart = state.cart.map((el) =>
          el.id === item.id && el.size === item.size && el.material === item.material
            ? { ...el, quantity: el.quantity! + 1 }
            : el
        );

        return { cart: updatedCart };
      }

      return {
        cart: [...state.cart, item]
      };
    });
  },
  onRemove: (item) =>
    set((state) => {
      const existedItem = state.cart.find(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size && cartItem.material === item.material
      );

      if (existedItem && existedItem.quantity! > 1) {
        const updatedCart = state.cart.map((el) =>
          el.id === item.id && el.size === item.size && el.material === item.material
            ? { ...el, quantity: el.quantity! - 1 }
            : el
        );

        return { cart: updatedCart };
      }

      return {
        cart: state.cart.filter(
          (cartItem) => !(cartItem.id === item.id && cartItem.size === item.size && cartItem.material === item.material)
        )
      };
    }),
  onDelete: (item) =>
    set((state) => ({
      cart: state.cart.filter(
        (cartItem) => !(cartItem.id === item.id && cartItem.size === item.size && cartItem.material === item.material)
      )
    })),
  onAdd: ({ key, value }) =>
    set((state) => ({
      formState: {
        ...state.formState,
        [key]: value
      }
    })),
  onIncrease: (data) =>
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === data.id && cartItem.size === data.size && cartItem.material === data.material
      );

      if (existingItem) {
        const updatedCart = state.cart.map((el) =>
          el.id === data.id && el.size === data.size && el.material === data.material
            ? { ...el, quantity: el.quantity! + 1 }
            : el
        );

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
