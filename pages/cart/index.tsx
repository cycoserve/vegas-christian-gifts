import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import MetaData from '@/components/headers/MetaData';
import Layout from '@/components/Layouts/RootLayout';
import { useCart } from '@/lib/cartContext';

export default function ShoppingCart() {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
    const subtotal = getCartTotal();

    return (
        <>
            <MetaData
                title="Shopping Cart - Vegas Christian Gifts"
                description="View and manage items in your shopping cart at Vegas Christian Gifts. Ready to checkout? Explore faith-inspired products and gifts now."
                keywords="shopping cart, Vegas Christian Gifts, checkout, Christian gifts, faith-inspired products"
                url="https://www.vegaschristiangifts.com/cart"
                imageUrl="https://www.vegaschristiangifts.com/assets/cart-image.jpg"
                siteName="Vegas Christian Gifts"
                locale="en_US"
                themeColor="#EC4899"
            />
            <Layout>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <div className="text-center">
                            <p className="text-gray-500 mb-4">Your cart is empty</p>
                            <Link href="/products">
                                <Button>Continue Shopping</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="md:col-span-2">
                                {cartItems.map(item => (
                                    <Card key={item.id} className="mb-4">
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-20 h-20 object-cover rounded"
                                                />
                                                <div className="flex-grow">
                                                    <h2 className="font-semibold">{item.name}</h2>
                                                    <p className="text-sm text-gray-500">
                                                        ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        aria-label={`Decrease quantity of ${item.name}`}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        aria-label={`Increase quantity of ${item.name}`}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() => removeFromCart(item.id)}
                                                    aria-label={`Remove ${item.name} from cart`}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Order Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex justify-between mb-2">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>Shipping</span>
                                            <span>Free</span>
                                        </div>
                                        <div className="flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href="/checkout">
                                            <Button className="w-full">
                                                Proceed to Checkout
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
}
