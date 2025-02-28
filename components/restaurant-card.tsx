import Image from "next/image"
import Link from "next/link"
import { Star, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Restaurant {
  id: string
  name: string
  image: string
  cuisine: string[]
  rating: number
  deliveryTime: string
  priceRange: string
  discount?: string
  isNew?: boolean
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const { id, name, image, cuisine, rating, deliveryTime, priceRange, discount, isNew } = restaurant

  return (
    <Link href={`/restaurant/${id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
        <div className="relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
          {discount && (
            <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded">
              {discount} OFF
            </div>
          )}
          {isNew && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-orange-500 hover:bg-orange-600">NEW</Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{name}</h3>

          <div className="flex items-center mb-2">
            <div className="flex items-center bg-green-600 text-white px-1.5 py-0.5 rounded text-sm mr-2">
              <Star className="w-3 h-3 mr-0.5" />
              <span>{rating}</span>
            </div>
            <div className="text-gray-500 text-sm flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {deliveryTime}
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-2 line-clamp-1">{cuisine.join(", ")}</p>

          <p className="text-gray-500 text-sm">{priceRange}</p>
        </div>
      </div>
    </Link>
  )
}

