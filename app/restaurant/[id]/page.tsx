import Image from "next/image"
import { Star, Clock, MapPin, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { restaurants } from "@/data/restaurants"
import { menuItems } from "@/data/menu-items"
import Header from "@/components/header"
import MenuItemCard from "@/components/menu-item-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface RestaurantPageProps {
  params: {
    id: string
  }
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const restaurant = restaurants.find((r) => r.id === params.id)

  if (!restaurant) {
    return <div className="container mx-auto px-4 py-8">Restaurant not found</div>
  }

  // Group menu items by category
  const menuByCategory = menuItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, typeof menuItems>,
  )

  const categories = Object.keys(menuByCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to restaurants
        </Link>

        {/* Restaurant Header */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-6">
          <div className="relative h-64 md:h-80">
            <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
            {restaurant.discount && (
              <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded">
                {restaurant.discount} OFF up to ₹120
              </div>
            )}
          </div>

          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{restaurant.name}</h1>
                <p className="text-gray-600 mb-2">{restaurant.cuisine.join(", ")}</p>
                <p className="text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Koramangala, Bangalore
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end">
                <div className="flex items-center bg-green-600 text-white px-2 py-1 rounded text-sm mb-2">
                  <Star className="w-4 h-4 mr-1" />
                  <span>{restaurant.rating}</span>
                </div>
                <div className="text-gray-600 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {restaurant.deliveryTime} delivery time
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Tabs defaultValue={categories[0]}>
              <TabsList className="w-full justify-start overflow-x-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category} className="mt-6">
                  <h2 className="text-xl font-bold mb-4">{category}</h2>
                  <div className="space-y-4">
                    {menuByCategory[category].map((item) => (
                      <MenuItemCard key={item.id} item={item} />
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-20">
              <h3 className="font-bold text-lg mb-4">Your Cart</h3>
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Browse Menu</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

