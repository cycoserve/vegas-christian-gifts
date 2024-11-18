import React, { useState, useEffect } from 'react';
import Layout from 'components/Layouts/RootLayout';
import ProductsList from 'components/products/productsList';
import MetaData from 'components/headers/MetaData';
import { db } from 'utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../../types/product';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsRef = collection(db, 'products');
                const snapshot = await getDocs(productsRef);
                const productsList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Product[];
                setProducts(productsList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <MetaData
                title="Products - Vegas Christian Gifts"
                description="Discover faith-inspired flower pots and a unique selection of Christian gifts at Vegas Christian Gifts. Perfect for home decor and special occasions."
                keywords="Christian gifts, faith-inspired flower pots, religious home decor, Christian flower pots, Vegas Christian Gifts, unique Christian items, gifts for Christians"
                url="https://www.vegaschristiangifts.com/products"
                imageUrl="https://www.vegaschristiangifts.com/assets/products-image.jpg"
                siteName="Vegas Christian Gifts"
                locale="en_US"
            />
            <Layout>
                <ProductsList />
            </Layout>
        </>
    );
}
