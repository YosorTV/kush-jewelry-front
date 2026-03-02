declare global {
  // LiqPay — commented, replaced by MonoPay widget
  // interface LiqPayCheckoutType {
  //   init: (options: { data: string; signature: string; embedTo: string; mode: string }) => {
  //     on: (event: string, callback: (data: any) => void) => void;
  //   };
  // }
  // const LiqPayCheckout: LiqPayCheckoutType;

  interface MonoPayUIConfig {
    buttonType?: 'pay' | 'base';
    theme?: 'dark' | 'light';
    corners?: 'rounded' | 'square';
  }

  interface MonoPayCallbacks {
    onButtonReady?: () => void;
    onClick?: () => void;
    onInvoiceCreate?: (data: unknown) => void;
    onSuccess?: (result: unknown) => void;
    onError?: (error: unknown) => void;
  }

  interface MonoPayInitOptions {
    keyId: string;
    signature: string;
    requestId: string;
    payloadBase64: string;
    ui?: MonoPayUIConfig;
    callbacks?: MonoPayCallbacks;
  }

  interface MonoPayInstance {
    button: HTMLElement;
  }

  interface MonoPayType {
    init: (options: MonoPayInitOptions) => MonoPayInstance;
    update: (options: Partial<MonoPayInitOptions>) => void;
    destroy: () => void;
  }

  interface Window {
    MonoPay?: MonoPayType;
  }
}

export {};
