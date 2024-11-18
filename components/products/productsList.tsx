import React, { useState, useEffect } from 'react';
import { Product } from '../../types/product';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useCart } from '../../lib/cartContext';
import { useWishlist } from '../../lib/wishlistContext';
import { useToast } from '../ui/use-toast';
import { Heart, FileHeart } from 'lucide-react'; // Import solid heart icon
import slugify from 'slugify';
import { db } from '../../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      <div className="container mx-auto px-4 my-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-200 rounded-lg p-4 shadow-sm mb-8">
            <div className="relative h-64 mb-4 bg-gray-300 rounded-md"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm mb-8 flex flex-col justify-between">
            <Link href={`/products/${slugify(product.name, { lower: true })}`}>
              <div className="relative w-full h-0 pb-[133.33%] mb-4"> {/* 3:4 aspect ratio */}
                <Image 
                  src={product.images[0]} 
                  alt={product.name} 
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            </Link>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>

            <div className="flex gap-2">
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
    </div>
  );
};

export default ProductsList;
