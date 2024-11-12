import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CartItem, getCart, removeFromCart, updateCartQuantity, getCartTotal } from '../../components/products/data/cart';
import Link from 'next/link';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // Update cart items and total whenever they change
        const updateCart = () => {
            const items = getCart();
            setCartItems(items);
            setTotal(getCartTotal());
        };

        updateCart();
        // Add event listener for storage changes
        window.addEventListener('storage', updateCart);
        return () => window.removeEventListener('storage', updateCart);
    }, []);

    const handleQuantityChange = (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        updateCartQuantity(productId, newQuantity);
        setCartItems(getCart());
        setTotal(getCartTotal());
    };

    const handleRemoveItem = (productId: number) => {
        removeFromCart(productId);
        setCartItems(getCart());
        setTotal(getCartTotal());
    };

    const handleCheckout = () => {
        // Pass cart data to checkout page using query params
        router.push({
            pathname: '/checkout',
            query: { cart: JSON.stringify(cartItems) }
        });
    };

    const createOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: total.toFixed(2)
                }
            }]
        });
    };

    const onApprove = async (data: any, actions: any) => {
        const order = await actions.order.capture();
        // Handle successful payment
        router.push({
            pathname: '/checkout',
            query: { 
                cart: JSON.stringify(cartItems),
                paypalOrderId: order.id,
                paymentComplete: true
            }
        });
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <p>Your cart is empty.</p>
                <Link href="/products" className="text-blue-500 hover:text-blue-700">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '' }}>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.product.id} className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover"
                                />
                                <div>
                                    <h2 className="font-semibold">{item.product.name}</h2>
                                    <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                        className="px-2 py-1 border rounded"
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                        className="px-2 py-1 border rounded"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.product.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-semibold">Total:</span>
                        <span className="text-xl">${total.toFixed(2)}</span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex space-x-4">
                            <Link
                                href="/products"
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Continue Shopping
                            </Link>
                            <button
                                onClick={handleCheckout}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                        <div className="mt-4">
                            <PayPalButtons
                                createOrder={createOrder}
                                onApprove={onApprove}
                                style={{ layout: "horizontal" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PayPalScriptProvider>
    );
};

export default CartPage;
