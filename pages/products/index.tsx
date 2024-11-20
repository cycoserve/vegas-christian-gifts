import React, { useState, useEffect } from 'react';
import Layout from 'components/Layouts/RootLayout';
import ProductsList from 'components/products/productsList';
import ProductFilterDrawer from 'components/products/ProductFilterDrawer';
import MetaData from 'components/headers/MetaData';
import { db } from 'utils/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../../types/product';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedColor, setSelectedColor] = useState('All');

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
                setFilteredProducts(productsList);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = [...products];

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply price filter
        filtered = filtered.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        // Apply category filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(product =>
                product.category === selectedCategory
            );
        }

        // Apply color filter
        if (selectedColor !== 'All') {
            filtered = filtered.filter(product =>
                product.color === selectedColor
            );
        }

        setFilteredProducts(filtered);
    }, [searchTerm, priceRange, selectedCategory, selectedColor, products]);

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
                <div className="flex min-h-screen bg-gray-50">
                    <ProductFilterDrawer
                        onSearch={setSearchTerm}
                        onPriceChange={setPriceRange}
                        onCategoryChange={setSelectedCategory}
                        onColorChange={setSelectedColor}
                        selectedCategory={selectedCategory}
                        selectedColor={selectedColor}
                        priceRange={priceRange}
                    />
                    <div className="flex-1 px-4 md:px-6 py-4">
                        <ProductsList products={filteredProducts} loading={loading} />
                    </div>
                </div>
            </Layout>
        </>
    );
}
