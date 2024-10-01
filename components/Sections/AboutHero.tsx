import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

export default function AboutHero() {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Vegas-inspired background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-pink-50 bg-opacity-30 backdrop-filter backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[url('/images/vegas-pattern.svg')] opacity-5" />
      </div>

      <div className="relative z-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-8 lg:mb-0">
            <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight mb-4">
              Our <span className="text-pink-500">Vegas-Inspired</span> Story
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              From the dazzling lights of the Strip to the comfort of your wardrobe, Vegas Girl Tees brings the spirit of Las Vegas to life through our unique, high-quality designs.
            </p>
            <div className="flex space-x-4">
              <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                Our Journey
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
                Meet the Team
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/bitmap.png"
                alt="Vegas Girl Tees Team"
                width={800}
                height={600}
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-md">
              <p className="text-xl font-bold text-pink-500">10+ Years</p>
              <p className="text-xs text-gray-600">Bringing Vegas to Your Wardrobe</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-black p-3 rounded-full shadow-md">
              <p className="text-xl font-bold text-white">100%</p>
              <p className="text-xs text-gray-300">Vegas Inspired</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}