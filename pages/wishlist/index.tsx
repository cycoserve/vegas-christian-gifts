import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Redirect to new wishlist location
export default function WishlistRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/account/wishlist');
  }, [router]);

  return null;
}
