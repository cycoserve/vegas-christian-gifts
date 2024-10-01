import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const categories = [
  {
    title: "Sneakers",
    image: "/products/sneaker.png",
    link: "/categores/phone-cases",
  },
  {
    title: "T-shirts",
    image: "/products/hood-jacket-1.png",
    link: "/categories/t-shirts",
  },
  {
    title: "Hoodies",
    image: "/products/hood-jacket-2.png",
    link: "/categories/hoodies",
  },
  {
    title: "Beanies",
    image: "/products/beanie.png",
    link: "/categories/baseball-caps",
  },
]

export default function ProductCategoriesGrid() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-black text-center mb-8">
          Explore Our <span className="text-pink-500">Vegas-Inspired</span> Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.title} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={400}
                  height={300}
                  className="w-full object-cover aspect-square"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl font-bold text-black mb-2">{category.title}</CardTitle>
                <p className="text-gray-600">
                  Discover our amazing collection of {category.title.toLowerCase()} with unique Vegas-inspired designs.
                </p>
              </CardContent>
              <CardFooter className="p-4 bg-gray-50">
                <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                  <Link href={category.link}>
                    Shop {category.title}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}