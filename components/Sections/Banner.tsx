import { ShoppingCartIcon, UserIcon } from '@heroicons/react/20/solid';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function Banner() {
  return (
    <div className="relative isolate flex items-center justify-between gap-x-4 bg-gray-50 px-4 py-2 border-b border-gray-200 shadow-sm sm:px-6">
      {/* Gradient Background */}
      <div
        className="absolute left-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl w-full h-full opacity-20"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(to right, #ff80b5, #9089fc)',
          clipPath: 'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
        }}
      />

      {/* Left Section - Logo and Event Text */}
      <div className="flex items-center gap-3">
        <p className="text-sm font-semibold text-gray-900">Join Us!</p>
        <Link href="/contact-us" className="text-sm text-gray-900 font-medium hover:text-gray-700">
          Register now <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Center Menu Links */}
      <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
        <Link href="/products" className="hover:text-blue-600 transition-colors duration-200">
          Shop
        </Link>
        <Link href="/about" className="hover:text-blue-600 transition-colors duration-200">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-blue-600 transition-colors duration-200">
          Contact
        </Link>
        <Link href="/account" className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-200">
          <UserIcon className="w-5 h-5" />
          Account
        </Link>
        <Link href="/wishlist" className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-200">
          <Heart className="w-5 h-5" />
          Wishlist
        </Link>
        <Link href="/cart" className="flex items-center gap-1 hover:text-blue-600 transition-colors duration-200">
          <ShoppingCartIcon className="w-5 h-5" />
          Cart
        </Link>
      </nav>

      {/* Right Section - Icons for Mobile */}
      <div className="flex md:hidden items-center gap-4">
        <Link href="/shop" className="text-gray-900 hover:text-blue-600 transition-colors duration-200">
          <ShoppingCartIcon className="w-5 h-5" />
        </Link>
        <Link href="/account" className="text-gray-900 hover:text-blue-600 transition-colors duration-200">
          <UserIcon className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
