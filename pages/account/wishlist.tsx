import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/authContext';
import { useWishlist } from '../../lib/wishlistContext';
import { useCart } from '../../lib/cartContext';
import { AccountSidebar } from '@/components/layouts/AccountSidebar';
import { Menu, Heart, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import type { GetServerSideProps } from 'next';

// Force page to be client-side rendered
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}
  };
};

export default function Wishlist() {
  const { user, loading } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleAddToCart = async (product: any) => {
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0]
      });
      
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart.`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 z-40 flex w-72 flex-col
          lg:static lg:block
          ${sidebarOpen ? 'block' : 'hidden'}
          bg-background border-r
        `}>
          <AccountSidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">My Wishlist</h2>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6">
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-xl font-semibold mb-2">Your wishlist is empty</p>
                  <p className="text-muted-foreground mb-6">Add items to your wishlist while shopping</p>
                  <Link href="/products">
                    <Button>
                      Browse Products
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((product) => (
                    <div key={product.id} className="rounded-lg border bg-card shadow-sm">
                      <Link href={`/products/${slugify(product.name, { lower: true })}`}>
                        <div className="relative w-full h-48 cursor-pointer hover:opacity-90 transition-opacity">
                          <Image 
                            src={product.images[0]} 
                            alt={product.name}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </div>
                      </Link>
                      <div className="p-4">
                        <Link href={`/products/${slugify(product.name, { lower: true })}`}>
                          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => removeFromWishlist(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                          <Button 
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}