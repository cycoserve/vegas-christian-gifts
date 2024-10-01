"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import BranchLayout from "@/components/Layouts/BranchLayout";
import products from "components/products/data/products"
import Spacer from "@/components/ui/Spacer";

export default function ProductsPage() {
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedFor, setSelectedFor] = useState("All");
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        const filtered = products.filter((product) => {
            return (
                product.price >= priceRange[0] &&
                product.price <= priceRange[1] &&
                (selectedCategory === "All" || product.category === selectedCategory) &&
                (selectedFor === "All" || product.for === selectedFor)
            );
        });
        setFilteredProducts(filtered);
    }, [priceRange, selectedCategory, selectedFor]);

    return (
        <>
            <BranchLayout>
                <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl font-extrabold text-black text-center mb-8">
                            Our <span className="text-pink-500">Vegas-Inspired</span> Products
                        </h1>

                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            {/* Sidebar for filters */}
                            <aside className="col-span-1 bg-white border border-gray-200 shadow-md rounded-lg p-6">
                                <div className="space-y-6">
                                    {/* Price Range */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Price Range
                                        </label>
                                        <Slider
                                            min={0}
                                            max={100}
                                            step={1}
                                            value={priceRange}
                                            onValueChange={setPriceRange}
                                            className="w-full"
                                        />
                                        <div className="text-sm text-gray-500">
                                            ${priceRange[0]} - ${priceRange[1]}
                                        </div>
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Category
                                        </label>
                                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All Categories</SelectItem>
                                                <SelectItem value="Sneakers">Sneakers</SelectItem>
                                                <SelectItem value="T-shirts">T-shirts</SelectItem>
                                                <SelectItem value="Hoodies">Hoodies</SelectItem>
                                                <SelectItem value="Beanies">Beanies</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {/* For: Men/Women/Kids */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">For</label>
                                        <Select value={selectedFor} onValueChange={setSelectedFor}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select target group" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All">All</SelectItem>
                                                <SelectItem value="Men">Men</SelectItem>
                                                <SelectItem value="Women">Women</SelectItem>
                                                <SelectItem value="Kids">Kids</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </aside>


                            {/* Products grid */}
                            <div className="col-span-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <Card key={product.id} className="overflow-hidden">
                                            <CardHeader className="p-0">
                                                <Image
                                                    src={product.image}
                                                    alt={product.title}
                                                    width={400}
                                                    height={300}
                                                    className="w-full object-cover aspect-square"
                                                />
                                            </CardHeader>
                                            <CardContent className="p-4">
                                                <CardTitle className="text-xl font-bold text-black mb-2">
                                                    {product.title}
                                                </CardTitle>
                                                <p className="text-gray-600">
                                                    ${product.price.toFixed(2)}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {product.category} | {product.for}
                                                </p>
                                            </CardContent>
                                            <CardFooter className="p-4 bg-gray-50">
                                                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                                                    Add to Cart
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>

                                {/* Message if no products match filters */}
                                {filteredProducts.length === 0 && (
                                    <div className="text-center text-gray-500 mt-8">
                                        No products match your current filters. Try adjusting your
                                        selection.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                <Spacer />
            </BranchLayout>
        </>
    );
}
