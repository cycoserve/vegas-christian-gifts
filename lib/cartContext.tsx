import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '../utils/firebase';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'vegas_christian_gifts_cart';

// Helper function to safely parse JSON
const safeJSONParse = (str: string | null): CartItem[] => {
  try {
    return str ? JSON.parse(str) : [];
  } catch (error) {
    console.error('Error parsing cart from localStorage:', error);
    return [];
  }
};

// Helper function to safely stringify and save to localStorage
const saveToStorage = (items: CartItem[]): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
    return false;
  }
};

// Helper to safely get from localStorage
const getFromStorage = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  return safeJSONParse(localStorage.getItem(STORAGE_KEY));
};

// Helper to save cart to Firestore
const saveToFirestore = async (userId: string, items: CartItem[]): Promise<boolean> => {
  try {
    const cartRef = doc(db, 'carts', userId);
    await setDoc(cartRef, { items }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving cart to Firestore:', error);
    return false;
  }
};

export function CartProvider({ children }: { children: ReactNode }): JSX.Element {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        // User is signed in, fetch their cart from Firestore
        const cartRef = doc(db, 'carts', user.uid);
        const cartSnap = await getDoc(cartRef);
        
        if (cartSnap.exists()) {
          // If user has a cart in Firestore, use it
          setCartItems(cartSnap.data().items);
        } else {
          // If no Firestore cart exists, merge local cart with Firestore
          const localCart = getFromStorage();
          if (localCart.length > 0) {
            await saveToFirestore(user.uid, localCart);
            setCartItems(localCart);
          }
        }
      } else {
        // User is signed out, load from localStorage
        setCartItems(getFromStorage());
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to real-time updates when user is authenticated
  useEffect(() => {
    if (!user) return;

    const cartRef = doc(db, 'carts', user.uid);
    const unsubscribe = onSnapshot(cartRef, (doc) => {
      if (doc.exists()) {
        setCartItems(doc.data().items);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Sync with localStorage for guest users
  useEffect(() => {
    if (!user && !isLoading) {
      const success = saveToStorage(cartItems);
      if (!success && cartItems.length > 0) {
        console.warn('Failed to save cart to localStorage');
      }
    }
  }, [cartItems, user, isLoading]);

  const addToCart = async (product: CartItem): Promise<void> => {
    const newCartItems = [...cartItems];
    const existingItem = newCartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newCartItems.push({ ...product, quantity: 1 });
    }

    setCartItems(newCartItems);

    if (user) {
      await saveToFirestore(user.uid, newCartItems);
    } else {
      saveToStorage(newCartItems);
    }
  };

  const removeFromCart = async (id: string): Promise<void> => {
    const newCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(newCartItems);

    if (user) {
      await saveToFirestore(user.uid, newCartItems);
    } else {
      saveToStorage(newCartItems);
    }
  };

  const updateQuantity = async (id: string, quantity: number): Promise<void> => {
    const newCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
    ).filter(item => item.quantity > 0);

    setCartItems(newCartItems);

    if (user) {
      await saveToFirestore(user.uid, newCartItems);
    } else {
      saveToStorage(newCartItems);
    }
  };

  const clearCart = async (): Promise<void> => {
    setCartItems([]);
    
    if (user) {
      await saveToFirestore(user.uid, []);
    } else {
      saveToStorage([]);
    }
  };

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
