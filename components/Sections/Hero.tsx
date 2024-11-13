import { Button } from "@/components/ui/button"
import { Cross, Heart, PlayIcon as Pray } from 'lucide-react'
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Vegas Christian Gifts:</span>{' '}
                <span className="block text-blue-600 xl:inline">Faith in Bloom</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover Vegas Christian Gifts' enchanting collection of mini flower pots featuring delightful trees, charming cacti, and personalized wooden plates. Spread the love of Christ with these perfect symbols of growth, faith, and new beginnings.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href={'/products'}>
                    <Button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                      Shop Faithful Gifts
                    </Button>
                  </Link>

                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href={'/about'}>
                    <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10">
                      Our Mission
                    </Button>
                  </Link>

                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/images/engravement-closeup-1.jpg"
          alt="Collection of Christian-themed mini flower pots with trees and cacti"
        />
      </div>
      {/* <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around items-center">
            <div className="flex items-center">
              <Cross className="h-6 w-6 text-yellow-400 mr-2" />
              <span>Inspired by Faith</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-yellow-400 mr-2" />
              <span>Spread God's Love</span>
            </div>
            <div className="flex items-center">
              <Pray className="h-6 w-6 text-yellow-400 mr-2" />
              <span>Nurture Your Spirit</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}