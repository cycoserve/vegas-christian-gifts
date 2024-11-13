import React from 'react'
import Layout from '@/components/Layouts/Layout'
import ProductList from '@/components/products/productsList'
import MetaData from '@/components/headers/MetaData'


const ProductsPage: React.FC = () => {
    return (
        <>
            <MetaData
                title="Vegas Christian Gifts"
                description=""
                keywords=""
                url="https://www.vegaschristiangifts.com/about"
                imageUrl="https://www.vegaschristiangifts.com/assets/about-image.jpg"
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