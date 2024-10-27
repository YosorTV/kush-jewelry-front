export type ShoppingCartProps = {
  locale: string;
  currency: number;
  data: {
    title: string;
    totalPrice: string;
    price: string;
    checkout: string;
    getBack: string;
    emptyList: string;
  };
};
