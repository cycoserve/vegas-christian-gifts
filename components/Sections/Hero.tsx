import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-pink-100 bg-[radial-gradient(#f472b6_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 relative z-1">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="max-w-lg mx-auto lg:max-w-none">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-5 w-5 text-pink-500" />
              <Star className="h-5 w-5 text-pink-500" />
              <Star className="h-5 w-5 text-pink-500" />
              <Star className="h-5 w-5 text-pink-500" />
              <Star className="h-5 w-5 text-pink-500" />
              <span className="text-sm font-medium text-gray-600">5-star rated tees</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-black">Shine Bright in</span>
              <span className="block text-pink-500">Vegas Girl Tees</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Unleash your inner Vegas diva with our dazzling collection of t-shirts. From neon lights to lucky charms, we&apos;ve got the perfect tee for your next adventure.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
                View Collection
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/3]">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Vegas Girl Tees Showcase"
                width={800}
                height={600}
                className="absolute inset-0 h-full w-full object-cover rounded-lg shadow-xl"
              />
            </div>
            <div className="absolute -bottom-8 -left-2 bg-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-semibold text-gray-900">Limited Edition</p>
              <p className="mt-1 text-xs text-gray-600">Neon Nights Collection</p>
            </div>
            <div className="absolute -top-8 -right-0 bg-pink-500 p-4 rounded-full shadow-lg">
              <p className="text-2xl font-bold text-white">20% OFF</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}