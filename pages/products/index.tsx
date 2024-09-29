import BranchLayout from '@/components/Layouts/BranchLayout'
import Hero from '@/components/Sections/Hero'
import React from 'react'

function ProductsPage() {
    return (
        <>
            <BranchLayout>
            <Hero />
                <div className='flex justify-center items-center h-screen'>ProductsPage</div>
            </BranchLayout>

        </>

    )
}

export default ProductsPage