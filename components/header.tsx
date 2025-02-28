"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import LocationSelector from "@/components/location-selector"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-orange-500 font-bold text-2xl">FoodDelivery</span>
          </Link>

          {/* Location Selector */}
          <div className="hidden md:block">
            <LocationSelector />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-500 font-medium">
              Home
            </Link>
            <Link href="/restaurants" className="text-gray-700 hover:text-orange-500 font-medium">
              Restaurants
            </Link>
            <Link href="/offers" className="text-gray-700 hover:text-orange-500 font-medium">
              Offers
            </Link>
            <Link href="/help" className="text-gray-700 hover:text-orange-500 font-medium">
              Help
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">Sign In</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <div className="mb-3">
              <LocationSelector />
            </div>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-gray-700 hover:text-orange-500 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/restaurants"
                className="text-gray-700 hover:text-orange-500 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Restaurants
              </Link>
              <Link
                href="/offers"
                className="text-gray-700 hover:text-orange-500 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Offers
              </Link>
              <Link
                href="/help"
                className="text-gray-700 hover:text-orange-500 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Help
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-orange-500 py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">Sign In</Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

