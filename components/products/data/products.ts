export interface Product {
    id: number;
    name: string;
    title: string;
    image: string;
    price: number;
    category: string;
    for: string;
    description: string;
    materials: string[];
    customization: string[];
    paypalProductId: string;
    paypalPrice: number;
    quantity: number;
    inCart: boolean;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Cross Necklace",
        title: "Cross Necklace",
        image: "/products/cross-necklace.jpg",
        price: 29.99,
        category: "Jewelry",
        for: "Women",
        description: "A beautiful cross necklace made from sterling silver.",
        materials: ["Sterling Silver"],
        customization: ["Engraving"],
        paypalProductId: "PROD-1",
        paypalPrice: 29.99,
        quantity: 0,
        inCart: false
    },
    // ... other products ...
];
