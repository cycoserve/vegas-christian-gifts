import { Card, CardContent } from "../../components/ui/Card"
import { Heart, Leaf, Gift, Paintbrush } from 'lucide-react'
import Link from 'next/link'

export default function Features() {
  const categories = [
    { name: "Inspirational Pots", icon: Heart, description: "Uplifting designs to nourish your faith", link: "/category/inspirational" },
    { name: "Seasonal Designs", icon: Leaf, description: "Celebrate every season with themed pots", link: "/category/seasonal" },
    { name: "Customizable Pots", icon: Paintbrush, description: "Create your own unique spiritual garden", link: "/category/customizable" },
    { name: "Gift Sets", icon: Gift, description: "Perfect presents for any occasion", link: "/category/gift-sets" },
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Featured Product Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={category.link} className="block group">
              <Card className="h-full transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-lg">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <category.icon className="w-12 h-12 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}