import React from 'react'
import Layout from '@/components/Layouts/RootLayout'
import ProductList from '@/components/products/productsList'
import MetaData from '@/components/headers/MetaData'


const ProductsPage: React.FC = () => {
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
                themeColor="#EC4899"
            />
            <Layout>
                <ProductList />
            </Layout>
        </>
    )
}

export default ProductsPage