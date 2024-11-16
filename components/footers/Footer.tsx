import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            {/* <Image
              className="h-10"
              src="/placeholder.svg?height=40&width=160"
              alt="Vegas Christian Gifts Logo"
              width={160}
              height={40}
            /> */}
            <p className="text-gray-500 text-base">
              Spreading faith through nature&apos;s beauty. Our mini flower pots and custom engraved plates are perfect for sharing God&apos;s love.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About Us</h3>
                <div role="list" className="mt-4 space-y-4">
                  <div>
                    <Link href="/our-story" className="text-base text-gray-500 hover:text-blue-600">
                      Our Story
                    </Link>
                  </div>
                  <div>
                    <Link href="/mission" className="text-base text-gray-500 hover:text-blue-600">
                      Our Mission
                    </Link>
                  </div>
                  <div>
                    <Link href="/team" className="text-base text-gray-500 hover:text-blue-600">
                      Our Team
                    </Link>
                  </div>
                  <div>
                    <Link href="/careers" className="text-base text-gray-500 hover:text-blue-600">
                      Careers
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Products</h3>
                <div role="list" className="mt-4 space-y-4">
                  <div>
                    <Link href="/mini-pots" className="text-base text-gray-500 hover:text-blue-600">
                      Mini Flower Pots
                    </Link>
                  </div>
                  <div>
                    <Link href="/wooden-plates" className="text-base text-gray-500 hover:text-blue-600">
                      Engraved Wooden Plates
                    </Link>
                  </div>
                  <div>
                    <Link href="/gift-sets" className="text-base text-gray-500 hover:text-blue-600">
                      Gift Sets
                    </Link>
                  </div>
                  <div>
                    <Link href="/accessories" className="text-base text-gray-500 hover:text-blue-600">
                      Accessories
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                <div role="list" className="mt-4 space-y-4">
                  <div>
                    <Link href="/faq" className="text-base text-gray-500 hover:text-blue-600">
                      FAQ
                    </Link>
                  </div>
                  <div>
                    <Link href="/shipping" className="text-base text-gray-500 hover:text-blue-600">
                      Shipping
                    </Link>
                  </div>
                  <div>
                    <Link href="/returns" className="text-base text-gray-500 hover:text-blue-600">
                      Returns
                    </Link>
                  </div>
                  <div>
                    <Link href="/contact" className="text-base text-gray-500 hover:text-blue-600">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                <div role="list" className="mt-4 space-y-4">
                  <div>
                    <Link href="/privacy" className="text-base text-gray-500 hover:text-blue-600">
                      Privacy Policy
                    </Link>
                  </div>
                  <div>
                    <Link href="/terms" className="text-base text-gray-500 hover:text-blue-600">
                      Terms of Service
                    </Link>
                  </div>
                  <div>
                    <Link href="/accessibility" className="text-base text-gray-500 hover:text-blue-600">
                      Accessibility
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="flex items-center">
                <Mail className="flex-shrink-0 h-6 w-6 text-blue-600" />
                <span className="ml-3 text-base text-gray-500">info@vegaschristiangifts.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="flex-shrink-0 h-6 w-6 text-blue-600" />
                <span className="ml-3 text-base text-gray-500">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="flex-shrink-0 h-6 w-6 text-blue-600" />
                <span className="ml-3 text-base text-gray-500">123 Faith Street, Las Vegas, NV 89101</span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="flex-shrink-0 h-6 w-6 text-blue-600" />
                  <span className="ml-3 text-base text-gray-500">Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex items-center">
                  <Clock className="flex-shrink-0 h-6 w-6 text-blue-600" />
                  <span className="ml-3 text-base text-gray-500">Sat: 10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center">
                  <Clock className="flex-shrink-0 h-6 w-6 text-blue-600" />
                  <span className="ml-3 text-base text-gray-500">Sun: Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link href="/sitemap" className="text-base text-gray-500 hover:text-blue-600">
              Sitemap
            </Link>
          </div>
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2023 Vegas Christian Gifts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}