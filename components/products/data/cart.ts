import { Product } from './products';

export interface CartItem {
    product: Product;
    quantity: number;
}

// Use localStorage to persist cart data
const CART_STORAGE_KEY = 'shopping-cart';

// Initialize cart from localStorage or empty array
const getStoredCart = (): CartItem[] => {
    if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
};

// Save cart to localStorage
const saveCart = (cart: CartItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
};

let cart: CartItem[] = getStoredCart();

export const getCart = (): CartItem[] => {
    return cart;
};

export const addToCart = (product: Product, quantity: number = 1): void => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    saveCart(cart);
};

export const removeFromCart = (productId: number): void => {
    cart = cart.filter(item => item.product.id !== productId);
    saveCart(cart);
};

export const updateCartQuantity = (productId: number, quantity: number): void => {
    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
    }
};

export const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const clearCart = (): void => {
    cart = [];
    saveCart(cart);
};
