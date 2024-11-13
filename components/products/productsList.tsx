import { db } from '../../utils/firebase';
import { useState, useEffect } from 'react';
import { collection, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import Image from 'next/image'

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
      } catch (err) {
        setError('Failed to fetch products: ' + (err as Error).message);
      }
    };
    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        {products.map(product => (
          <div key={product.id}>
            <Image src={product.images[0]} alt={product.name} width={400} height={400} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </>

  );
}

export default ProductList;
