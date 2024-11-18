import React from 'react';
import { Heart, FileHeart } from 'lucide-react';
import Layout from 'components/Layouts/RootLayout';
import MetaData from 'components/headers/MetaData';
import { useWishlist } from 'lib/wishlistContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from 'components/ui/button';
import slugify from 'slugify';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <>
      <MetaData
        title="My Wishlist - Vegas Christian Gifts"
        description="View your saved favorite items from Vegas Christian Gifts."
        url="https://www.vegaschristiangifts.com/wishlist"
      />
      <Layout>
        <div className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">My Saved Items</h1>
            {wishlist.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Your wishlist is empty.</p>
                <Link href="/products">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Browse Products
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {wishlist.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col">
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
                    <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
                    <Button 
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white mt-auto"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      Remove from Wishlist <FileHeart className="inline ml-2" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
