import type { AppProps } from 'next/app';
import { CartProvider } from '../lib/cartContext';
import { WishlistProvider } from '../lib/wishlistContext';
import { Toaster } from '@/components/ui/toaster';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <WishlistProvider>
        <Component {...pageProps} />
        <Toaster />
      </WishlistProvider>
    </CartProvider>
  );
}
