import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import Link from 'next/link';
import { useCart } from '../../lib/cartContext';
import Image from 'next/image';
import slugify from 'slugify';
import { useToast } from '../ui/use-toast';

function CartComponent() {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
    const { toast } = useToast();
    const [loading, setLoading] = useState<string | null>(null);
    const subtotal = getCartTotal();

    const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
        try {
            setLoading(`update-${itemId}`);
            await updateQuantity(itemId, newQuantity);
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast({
                title: "Error",
                description: "Failed to update quantity. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(null);
        }
    };

    const handleRemoveFromCart = async (itemId: string) => {
        try {
            setLoading(`remove-${itemId}`);
            await removeFromCart(itemId);
            toast({
                title: "Item Removed",
                description: "Item has been removed from your cart.",
                duration: 2000,
            });
        } catch (error) {
            console.error('Error removing item:', error);
            toast({
                title: "Error",
                description: "Failed to remove item. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(null);
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8">
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
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded"
                                                width={300}
                                                height={300}
                                            />
                                            <div className="flex-grow">
                                                <Link href={`/products/${slugify(item.name, { lower: true })}`}>
                                                    <h2 className="font-semibold hover:text-blue-600">{item.name}</h2>
                                                </Link>
                                                <p className="text-sm text-gray-500">
                                                    ${item.price.toFixed(2)}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    disabled={loading === `update-${item.id}`}
                                                    aria-label={`Decrease quantity of ${item.name}`}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <Button
                                                    size="icon"
                                                    variant="outline"
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                    disabled={loading === `update-${item.id}`}
                                                    aria-label={`Increase quantity of ${item.name}`}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleRemoveFromCart(item.id)}
                                                disabled={loading === `remove-${item.id}`}
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
        </>
    );
}

export default CartComponent;
