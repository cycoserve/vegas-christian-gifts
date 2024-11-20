import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../lib/authContext';
import { CartProvider } from '../lib/cartContext';
import { WishlistProvider } from '../lib/wishlistContext';
import { Toaster } from '@/components/ui/toaster';
import '../styles/globals.css';

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Protect routes that require authentication
      if (!user && router.pathname.startsWith('/account')) {
        router.push('/login');
      }
      // Redirect authenticated users away from auth pages
      if (user && (router.pathname === '/login' || router.pathname === '/signup')) {
        router.push('/account');
      }
    }
  }, [user, loading, router.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AuthWrapper>
            <Component {...pageProps} />
            <Toaster />
          </AuthWrapper>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
