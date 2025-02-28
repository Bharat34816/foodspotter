"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  isVeg: boolean
  isBestseller?: boolean
}

interface MenuItemCardProps {
  item: MenuItem
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(item)
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="md:w-1/4">
        <div className="relative h-32 md:h-24 md:w-full rounded-lg overflow-hidden">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          {item.isVeg && (
            <div className="absolute top-2 left-2">
              <div className="w-5 h-5 border border-green-600 flex items-center justify-center rounded-sm">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
              </div>
            </div>
          )}
          {item.isBestseller && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-gray-600 mb-1">₹{item.price}</p>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.description}</p>

        <Button
          onClick={handleAddToCart}
          className={`bg-white text-green-600 border border-green-600 hover:bg-green-50 ${isAdding ? "bg-green-50" : ""}`}
          size="sm"
        >
          {isAdding ? "Added" : "Add"}
        </Button>
      </div>
    </div>
  )
}

