import React, { useState, useEffect } from 'react';
import { Product } from './data/products';
import { addToCart, getCart } from './data/cart';
import Link from 'next/link';

interface ProductsProps {
    products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
    const [cartItemCount, setCartItemCount] = useState(0);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        // Update cart count
        const updateCartCount = () => {
            const cart = getCart();
            const count = cart.reduce((total, item) => total + item.quantity, 0);
            setCartItemCount(count);
        };

        updateCartCount();
        // Listen for storage changes
        window.addEventListener('storage', updateCartCount);
        return () => window.removeEventListener('storage', updateCartCount);
    }, []);

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        setCartItemCount(getCart().reduce((total, item) => total + item.quantity, 0));
        
        // Show notification
        setNotification(`${product.name} added to cart!`);
        setTimeout(() => setNotification(''), 2000);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Cart indicator */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Our Products</h1>
                <Link 
                    href="/cart"
                    className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    <span>Cart ({cartItemCount})</span>
                </Link>
            </div>

            {/* Notification */}
            {notification && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    {notification}
                </div>
            )}

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="relative pb-[100%] mb-4">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                            />
                        </div>
                        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                            <button 
                                onClick={() => handleAddToCart(product)} 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
