import Link from "next/link"
import { Search } from "lucide-react"
import RestaurantCard from "@/components/restaurant-card"
import { restaurants } from "@/data/restaurants"
import Header from "@/components/header"
import CategoryFilter from "@/components/category-filter"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageSearch from "@/components/image-search"
import NearbyRestaurants from "@/components/nearby-restaurants"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Hungry? We've got you covered</h1>
            <p className="text-lg mb-8 opacity-90">Order food from the best restaurants in your area</p>

            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 bg-orange-600/50">
                <TabsTrigger value="text">Search by Text</TabsTrigger>
                <TabsTrigger value="image">Search by Image</TabsTrigger>
              </TabsList>

              <TabsContent value="text">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for restaurants or dishes"
                    className="w-full py-3 px-4 pr-12 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </TabsContent>

              <TabsContent value="image">
                <ImageSearch />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <CategoryFilter />

        <h2 className="text-2xl font-bold mb-6 mt-8">Nearby Restaurants</h2>
        <NearbyRestaurants />

        <h2 className="text-2xl font-bold mb-6 mt-8">Popular Restaurants</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Food Delivery</h3>
              <p className="text-gray-300">
                The best food delivery experience in your area. Fast, reliable, and delicious.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-300 hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-2">Email: support@fooddelivery.com</p>
              <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Food Delivery App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

