import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types/product';
import { auth, db } from '../utils/firebase';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { User } from 'firebase/auth';

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = 'vegas_christian_gifts_wishlist';

// Helper function to safely parse JSON
const safeJSONParse = (str: string | null): Product[] => {
  try {
    return str ? JSON.parse(str) : [];
  } catch (error) {
    console.error('Error parsing wishlist from localStorage:', error);
    return [];
  }
};

// Helper function to safely stringify and save to localStorage
const saveToStorage = (items: Product[]) => {
  if (typeof window === 'undefined') return false;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
    return false;
  }
};

// Helper to safely get from localStorage
const getFromStorage = (): Product[] => {
  if (typeof window === 'undefined') return [];
  
  return safeJSONParse(localStorage.getItem(STORAGE_KEY));
};

// Helper to save wishlist to Firestore
const saveToFirestore = async (userId: string, items: Product[]) => {
  try {
    const wishlistRef = doc(db, 'wishlists', userId);
    await setDoc(wishlistRef, { items }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving wishlist to Firestore:', error);
    return false;
  }
};

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        // User is signed in, fetch their wishlist from Firestore
        const wishlistRef = doc(db, 'wishlists', user.uid);
        const wishlistSnap = await getDoc(wishlistRef);
        
        if (wishlistSnap.exists()) {
          // If user has a wishlist in Firestore, use it
          setWishlist(wishlistSnap.data().items);
        } else {
          // If no Firestore wishlist exists, merge local wishlist with Firestore
          const localWishlist = getFromStorage();
          if (localWishlist.length > 0) {
            await saveToFirestore(user.uid, localWishlist);
            setWishlist(localWishlist);
          }
        }
      } else {
        // User is signed out, load from localStorage
        setWishlist(getFromStorage());
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to real-time updates when user is authenticated
  useEffect(() => {
    if (!user) return;

    const wishlistRef = doc(db, 'wishlists', user.uid);
    const unsubscribe = onSnapshot(wishlistRef, (doc) => {
      if (doc.exists()) {
        setWishlist(doc.data().items);
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Sync with localStorage for guest users
  useEffect(() => {
    if (!user && !isLoading) {
      const success = saveToStorage(wishlist);
      if (!success && wishlist.length > 0) {
        console.warn('Failed to save wishlist to localStorage');
      }
    }
  }, [wishlist, user, isLoading]);

  const addToWishlist = async (product: Product) => {
    if (wishlist.some(item => item.id === product.id)) return;

    const newWishlist = [...wishlist, product];
    setWishlist(newWishlist);

    if (user) {
      await saveToFirestore(user.uid, newWishlist);
    } else {
      saveToStorage(newWishlist);
    }
  };

  const removeFromWishlist = async (id: string) => {
    const newWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(newWishlist);

    if (user) {
      await saveToFirestore(user.uid, newWishlist);
    } else {
      saveToStorage(newWishlist);
    }
  };

  const clearWishlist = async () => {
    setWishlist([]);
    
    if (user) {
      await saveToFirestore(user.uid, []);
    } else {
      saveToStorage([]);
    }
  };

  const isInWishlist = (id: string) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
