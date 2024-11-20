import React, { useState } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import Link from 'next/link';
import { useCart } from '../../lib/cartContext';
import Image from 'next/image';
import slugify from 'slugify';
import { useToast } from '../ui/use-toast';

interface CartComponentProps {
    onClose?: () => void;
}

function CartComponent({ onClose }: CartComponentProps) {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
    const { toast } = useToast();
    const [loading, setLoading] = useState<string | null>(null);
    const subtotal = getCartTotal();

    const handleUpdateQuantity = async (itemId: string, newQuantity: number, item: any) => {
        try {
            setLoading(`update-${itemId}`);
            await updateQuantity(itemId, newQuantity);
            if (newQuantity > 0) {
                toast({
                    variant: "success",
                    title: "Quantity updated",
                    description: `${item.name} quantity updated to ${newQuantity}`,
                    duration: 2000,
                    productImage: item.image
                });
            }
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

    const handleRemoveFromCart = async (itemId: string, item: any) => {
        try {
            setLoading(`remove-${itemId}`);
            await removeFromCart(itemId);
            toast({
                variant: "success",
                title: "Item Removed",
                description: `${item.name} has been removed from your cart`,
                duration: 2000,
                productImage: item.image
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
        <div className="p-4">
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <Link href="/products" onClick={onClose}>
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {cartItems.map(item => (
                        <Card key={item.id} className="mb-2">
                            <CardContent className="p-4 flex items-center">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                    width={300}
                                    height={300}
                                />
                                <div className="flex-grow ml-4">
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
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item)}
                                        disabled={loading === `update-${item.id}`}
                                        aria-label={`Decrease quantity of ${item.name}`}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item)}
                                        disabled={loading === `update-${item.id}`}
                                        aria-label={`Increase quantity of ${item.name}`}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => handleRemoveFromCart(item.id, item)}
                                        disabled={loading === `remove-${item.id}`}
                                        aria-label={`Remove ${item.name} from cart`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
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
                            <Link href="/checkout" className="w-full">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                    Proceed to Checkout
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default CartComponent;
