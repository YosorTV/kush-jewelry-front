declare global {
  interface LiqPayCheckoutType {
    init: (options: { data: string; signature: string; embedTo: string; mode: string; paytypes: string }) => {
      on: (event: string, callback: (data: any) => void) => void;
    };
  }

  const LiqPayCheckout: LiqPayCheckoutType;
}

export {};
