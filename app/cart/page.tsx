"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import Header from "@/components/header"
import { Input } from "@/components/ui/input"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()
  const [couponCode, setCouponCode] = useState("")

  const deliveryFee = 40
  const discount = 0 // This would be calculated based on coupon code
  const totalAmount = totalPrice + deliveryFee - discount

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to restaurants
          </Link>

          <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Browse Restaurants</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to restaurants
        </Link>

        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center py-4 border-b last:border-0">
                  <div className="flex-shrink-0 mr-4">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                      {item.isVeg && (
                        <div className="absolute -top-2 -left-2">
                          <div className="w-4 h-4 border border-green-600 flex items-center justify-center rounded-sm">
                            <div className="w-2 h-2 rounded-full bg-green-600"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>

                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="mx-2 w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="ml-4 text-right">
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700 p-0 h-auto"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 sticky top-20">
              <h2 className="font-bold text-lg mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-b py-2 mb-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

