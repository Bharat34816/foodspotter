"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import RestaurantCard from "@/components/restaurant-card"
import { restaurants } from "@/data/restaurants"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import RestaurantMap from "@/components/restaurant-map"

export default function NearbyRestaurants() {
  const [loading, setLoading] = useState(true)
  const [showMap, setShowMap] = useState(false)
  const [nearbyRestaurants, setNearbyRestaurants] = useState([])
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number } | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchNearbyRestaurants = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // For demo purposes, we'll use all restaurants and sort them randomly
        const shuffled = [...restaurants].sort(() => 0.5 - Math.random())
        setNearbyRestaurants(shuffled.slice(0, 4))

        // Try to get user's location, but don't block if it fails
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords
              setCoordinates({ latitude, longitude })
            },
            (error) => {
              console.warn("Geolocation error:", error.message)
              // Use a default location (e.g., city center) if geolocation fails
              setCoordinates({ latitude: 12.9716, longitude: 77.5946 }) // Bangalore coordinates
            },
          )
        } else {
          // Geolocation not supported, use default coordinates
          setCoordinates({ latitude: 12.9716, longitude: 77.5946 })
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching nearby restaurants:", error)
        toast({
          title: "Error",
          description: "Failed to fetch nearby restaurants. Please try again.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchNearbyRestaurants()
  }, [toast])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span>Restaurants near you</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => setShowMap(!showMap)}>
          {showMap ? "Hide Map" : "Show Map"}
        </Button>
      </div>

      {showMap && coordinates && (
        <div className="mb-6 rounded-lg overflow-hidden border h-[300px]">
          <RestaurantMap userLocation={coordinates} restaurants={nearbyRestaurants} />
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
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
          {nearbyRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  )
}

