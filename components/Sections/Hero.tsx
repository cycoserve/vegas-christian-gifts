import { useState, useEffect } from 'react'
import { ChevronRight, Cross } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = [
    '/placeholder.svg?height=600&width=1200',
    '/placeholder.svg?height=600&width=1200',
    '/placeholder.svg?height=600&width=1200'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative h-[600px] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Vegas Christian Gifts showcase ${index + 1}`}
            className="object-cover w-full h-full"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <Cross className="text-gold-300 w-16 h-16 mb-6 animate-pulse" />
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Vegas Christian Gifts
        </h1>
        <p className="text-xl md:text-2xl text-gold-100 mb-8 max-w-2xl">
          Where faith meets fortune. Discover unique Christian gifts with a touch of Vegas glamour.
        </p>
        <Button className="bg-gold-500 text-white hover:bg-gold-600 transition-colors duration-300">
          Shop Now <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentImageIndex ? 'bg-gold-500' : 'bg-white bg-opacity-50'
            }`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}