import type { AppProps } from 'next/app';
import { CartProvider } from '../lib/cartContext';
import { Toaster } from '@/components/ui/toaster';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <Toaster />
    </CartProvider>
  );
}
