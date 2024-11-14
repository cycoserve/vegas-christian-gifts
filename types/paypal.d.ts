declare module '@paypal/react-paypal-js' {
  import { ReactElement, ReactNode } from 'react';

  export interface PayPalScriptOptions {
    'client-id': string;
    currency?: string;
    intent?: 'capture' | 'authorize';
    components?: string;
    disableFunding?: string;
    vault?: boolean;
  }

  export interface PayPalButtonsComponentProps {
    createOrder: (data: any, actions: any) => Promise<string>;
    onApprove: (data: any, actions: any) => Promise<void>;
    onError?: (err: Error) => void;
    onCancel?: (data: any) => void;
    style?: {
      layout?: 'vertical' | 'horizontal';
      color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
      shape?: 'rect' | 'pill';
      label?: 'paypal' | 'checkout' | 'buynow' | 'pay';
      tagline?: boolean;
    };
  }

  export interface PayPalScriptProviderProps {
    options: PayPalScriptOptions;
    children: ReactNode;
  }

  export function PayPalScriptProvider(props: PayPalScriptProviderProps): ReactElement;
  export function PayPalButtons(props: PayPalButtonsComponentProps): ReactElement;
}
