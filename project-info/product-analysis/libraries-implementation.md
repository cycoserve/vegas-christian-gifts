# Libraries Implementation Guide

## Installed Libraries

### 1. Zustand
**Purpose**: State Management
```typescript
// Example Cart Store Implementation
import create from 'zustand';
import { CartState } from '../types';

const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  itemCount: 0,
  addItem: (item) => set((state) => ({
    items: [...state.items, item],
    itemCount: state.itemCount + 1,
    total: state.total + item.price * item.quantity
  })),
  removeItem: (itemId) => set((state) => ({
    items: state.items.filter(item => item.productId !== itemId),
    // Update counts and totals accordingly
  }))
}));
```

### 2. @react-spring/web
**Purpose**: Smooth Animations
```typescript
// Example Animation Implementation
import { useSpring, animated } from '@react-spring/web';

const CartIcon = ({ count }) => {
  const props = useSpring({
    from: { scale: 1 },
    to: { scale: count > 0 ? 1.2 : 1 },
    config: { tension: 300, friction: 10 }
  });

  return (
    <animated.div style={props}>
      {/* Cart Icon Content */}
    </animated.div>
  );
};
```

### 3. UUID
**Purpose**: Unique Identifiers
```typescript
import { v4 as uuidv4 } from 'uuid';

// Example Usage in Wishlist
const addToWishlist = (product) => {
  const wishlistItem = {
    id: uuidv4(),
    productId: product.id,
    dateAdded: new Date(),
    // ... other item properties
  };
};
```

### 4. js-cookie
**Purpose**: Cart & Wishlist Persistence
```typescript
import Cookies from 'js-cookie';

// Example Cart Persistence
const persistCart = (cartItems) => {
  Cookies.set('cart', JSON.stringify(cartItems), { expires: 7 });
};

const loadCart = () => {
  const savedCart = Cookies.get('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};
```

### 5. react-hot-toast
**Purpose**: User Notifications
```typescript
import toast from 'react-hot-toast';

// Example Notifications
const notifications = {
  addedToCart: (product) => 
    toast.success(`${product.title} added to cart`),
  addedToWishlist: (product) => 
    toast.success(`${product.title} added to wishlist`),
  error: (message) => 
    toast.error(message)
};
```

## Implementation Strategy

### 1. State Management Setup
```typescript
// stores/cartStore.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create(
  persist<CartStore>(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({
        items: [...state.items, item]
      })),
      // ... other methods
    }),
    {
      name: 'cart-storage'
    }
  )
);
```

### 2. UI Components Structure
```typescript
// components/cart/CartProvider.tsx
import { useCartStore } from '@/stores/cartStore';
import { CartContext } from '@/contexts/CartContext';

export const CartProvider = ({ children }) => {
  const cart = useCartStore();
  
  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
};

// components/cart/CartIcon.tsx
import { useSpring, animated } from '@react-spring/web';
import { useCartStore } from '@/stores/cartStore';

export const CartIcon = () => {
  const itemCount = useCartStore((state) => state.items.length);
  // Animation implementation
};
```

### 3. Persistence Layer
```typescript
// utils/persistence.ts
import Cookies from 'js-cookie';

export const persistenceLayer = {
  saveCart: (items) => {
    Cookies.set('cart', JSON.stringify(items));
  },
  loadCart: () => {
    const saved = Cookies.get('cart');
    return saved ? JSON.parse(saved) : [];
  },
  clearCart: () => {
    Cookies.remove('cart');
  }
};
```

### 4. Notification System
```typescript
// utils/notifications.ts
import toast from 'react-hot-toast';

export const notify = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  loading: (message: string) => toast.loading(message),
  custom: (message: string, type: 'success' | 'error' | 'loading') => 
    toast[type](message)
};
```

## Integration Points

1. **Product Cards**
   - Add to cart button
   - Add to wishlist button
   - Quick view functionality

2. **Cart Components**
   - Cart sidebar/modal
   - Cart item list
   - Cart summary
   - Checkout button

3. **Wishlist Components**
   - Wishlist page
   - Wishlist item list
   - Move to cart functionality

4. **Shared Components**
   - Quantity selector
   - Price display
   - Product image
   - Remove button

## Usage Examples

### Adding to Cart
```typescript
const AddToCartButton = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  
  const handleAddToCart = () => {
    addItem({
      id: uuidv4(),
      productId: product.id,
      quantity: 1,
      price: product.price,
      // ... other properties
    });
    notify.success(`${product.title} added to cart`);
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};
```

### Cart Total Calculator
```typescript
const CartTotal = () => {
  const items = useCartStore((state) => state.items);
  
  const total = items.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0
  );

  return (
    <animated.div>
      Total: ${total.toFixed(2)}
    </animated.div>
  );
};
```

## Best Practices

1. **State Management**
   - Keep cart and wishlist states separate
   - Implement proper type checking
   - Use selectors for performance
   - Implement proper error handling

2. **Persistence**
   - Regular state synchronization
   - Handle storage limits
   - Implement fallback mechanisms
   - Clear expired data

3. **Performance**
   - Implement proper memoization
   - Use lazy loading where appropriate
   - Optimize re-renders
   - Handle large lists efficiently

4. **Security**
   - Sanitize stored data
   - Implement proper validation
   - Handle sensitive data appropriately
   - Implement rate limiting
