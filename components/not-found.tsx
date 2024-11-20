'use client'

import { Button } from "@/components/ui/button"
import { Cross } from "lucide-react"
import Link from "next/link"

export function NotFoundComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-4">
      <div className="text-9xl font-bold flex items-center mb-8">
        <Cross className="w-24 h-24 text-blue-600 mr-2" />
        <Cross className="w-24 h-24 text-blue-600 mr-2" />
        <Cross className="w-24 h-24 text-blue-600" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">Page Not Found</h1>
      <p className="text-xl md:text-2xl mb-8 text-center max-w-md">
        We couldn&apos;t find the page you&apos;re looking for. Let&apos;s guide you back to our blessed collection of Christian gifts.
      </p>
      <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link href="/">
          Return to Home
        </Link>
      </Button>
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-600">
          Vegas Christian Gifts - Sharing Faith Through Meaningful Gifts
        </p>
      </div>
    </div>
  )
}
