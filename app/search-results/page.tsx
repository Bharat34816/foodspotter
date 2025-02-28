"use client"

import { useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Filter, MapPin } from "lucide-react"
import Header from "@/components/header"
import RestaurantCard from "@/components/restaurant-card"
import { restaurants } from "@/data/restaurants"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const searchType = searchParams.get("type")
  const query = searchParams.get("q") || ""

  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState([])

  useEffect(() => {
    // Simulate search results loading
    setTimeout(() => {
      // For demo purposes, we'll just use the existing restaurant data
      // In a real app, you would filter based on the search query or image analysis
      setResults(restaurants)
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-orange-500 mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to home
        </Link>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {searchType === "image" ? "Image Search Results" : query ? `Results for "${query}"` : "Search Results"}
          </h1>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Options</SheetTitle>
                <SheetDescription>Refine your search results</SheetDescription>
              </SheetHeader>

              <div className="py-4 space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Sort By</h3>
                  <RadioGroup defaultValue="relevance">
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="relevance" id="sort-relevance" />
                      <Label htmlFor="sort-relevance">Relevance</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="rating" id="sort-rating" />
                      <Label htmlFor="sort-rating">Rating (High to Low)</Label>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="delivery-time" id="sort-delivery" />
                      <Label htmlFor="sort-delivery">Delivery Time</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cost-low" id="sort-cost-low" />
                      <Label htmlFor="sort-cost-low">Cost (Low to High)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Cuisines</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cuisine-indian" />
                      <label htmlFor="cuisine-indian" className="text-sm">
                        Indian
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cuisine-chinese" />
                      <label htmlFor="cuisine-chinese" className="text-sm">
                        Chinese
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cuisine-italian" />
                      <label htmlFor="cuisine-italian" className="text-sm">
                        Italian
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cuisine-mexican" />
                      <label htmlFor="cuisine-mexican" className="text-sm">
                        Mexican
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cuisine-american" />
                      <label htmlFor="cuisine-american" className="text-sm">
                        American
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Offers & More</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="offers-discounts" />
                      <label htmlFor="offers-discounts" className="text-sm">
                        Offers & Discounts
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pure-veg" />
                      <label htmlFor="pure-veg" className="text-sm">
                        Pure Veg
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="free-delivery" />
                      <label htmlFor="free-delivery" className="text-sm">
                        Free Delivery
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    Clear All
                  </Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">Apply</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {searchType === "image" && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="font-medium">Image Search Results</h3>
                <p className="text-sm text-gray-600">
                  We found {results.length} restaurants that match your image search. Results include similar dishes and
                  cuisines.
                </p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

