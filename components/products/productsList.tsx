import React from 'react';
import { Product } from '../../types/product';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useCart } from '../../lib/cartContext';
import { useWishlist } from '../../lib/wishlistContext';
import { useToast } from '../ui/use-toast';
import { Heart, FileHeart } from 'lucide-react';
import slugify from 'slugify';

interface ProductsListProps {
  products: Product[];
  loading: boolean;
}

const ProductsList: React.FC<ProductsListProps> = ({ products, loading }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const handleAddToCart = async (product: Product) => {
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
        description: (
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{product.name}</span>
            <span className="text-green-600">${product.price.toFixed(2)}</span>
          </div>
        ),
        duration: 2000,
        className: "bg-white border-2 border-green-500",
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20 md:pb-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-200 rounded-lg p-4 shadow-sm">
            <div className="relative bg-gray-300 rounded-md w-full h-0 pb-[133.33%] mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20 md:pb-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-sm flex flex-col justify-between bg-white transition-all duration-300 ease-in-out transform hover:shadow-lg">
          <Link href={`/products/${slugify(product.name, { lower: true })}`}>
            <div className="relative w-full h-0 pb-[133.33%] mb-4">
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                fill
                className="object-cover rounded-md"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h2>
          </Link>
          <p className="text-gray-600 mb-2 text-sm line-clamp-2">{product.description}</p>
          <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>

          <div className="flex gap-2 mt-auto">
            <Button 
              className="flex-1"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                if (isInWishlist(product.id)) {
                  removeFromWishlist(product.id);
                } else {
                  addToWishlist(product);
                }
              }}
            >
              {isInWishlist(product.id) ? (
                <FileHeart className="h-4 w-4 text-red-500" />
              ) : (
                <Heart className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;