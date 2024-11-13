import { db } from '../../utils/firebase';
import { useState, useEffect } from 'react';
import { collection, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import Image from 'next/image';
import { useCart } from '../../lib/cartContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const snapshot = await getDocs(productsRef);
        const productsList = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || '',
            description: data.description || '',
            price: data.price || 0,
            images: data.images || []
          };
        });
        setProducts(productsList);
        // Initialize quantities
        const initialQuantities: { [key: string]: number } = {};
        productsList.forEach(product => {
          initialQuantities[product.id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        setError('Failed to fetch products: ' + (err as Error).message);
      }
    };
    fetchProducts();
  }, []);

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0]
    });

    toast({
      title: "Added to cart",
      description: `${quantity}x ${product.name} added to your cart`,
      duration: 2000,
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <div className="relative h-64 mb-4">
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                fill
                className="object-cover rounded-md"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(product.id, -1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium">
                {quantities[product.id] || 1}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(product.id, 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button 
              className="w-full"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
