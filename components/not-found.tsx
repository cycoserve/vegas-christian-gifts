'use client'

import { Button } from "@/components/ui/button"
import { Dice1, Dice5, Dice3 } from "lucide-react"
import Link from "next/link"

export function NotFoundComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-4">
      <div className="text-9xl font-bold flex items-center mb-8">
        <Dice1 className="w-24 h-24 text-pink-500 mr-2" />
        <Dice5 className="w-24 h-24 text-pink-500 mr-2" />
        <Dice3 className="w-24 h-24 text-pink-500" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Oops! Wrong Turn on the Strip</h1>
      <p className="text-xl md:text-2xl mb-8 text-center max-w-md">
        Looks like you&apos;ve wandered off the main drag. This page is missing, just like your lucky charm!
      </p>
      <Button asChild className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
        <Link href="/">
          Roll Back to Home
        </Link>
      </Button>
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-600">
          Vegas Girl Tees - Where Every Shirt&apos;s a Winner!
        </p>
      </div>
    </div>
  )
}