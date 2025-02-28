"use client"

import { useState } from "react"
import { MapPin, Navigation, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

interface Coordinates {
  latitude: number
  longitude: number
}

export default function LocationSelector() {
  const [location, setLocation] = useState("Select your location")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLocating, setIsLocating] = useState(false)
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null)
  const { toast } = useToast()

  // Popular locations for demo purposes
  const popularLocations = [
    "Koramangala, Bangalore",
    "Indiranagar, Bangalore",
    "HSR Layout, Bangalore",
    "Whitefield, Bangalore",
    "JP Nagar, Bangalore",
  ]

  const detectCurrentLocation = () => {
    setIsLocating(true)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setCoordinates({ latitude, longitude })

          // In a real app, you would use reverse geocoding to get the address
          // For demo purposes, we'll set a placeholder
          setLocation("Current Location")
          setIsLocating(false)

          toast({
            title: "Location detected",
            description: `Latitude: ${latitude.toFixed(4)}, Longitude: ${longitude.toFixed(4)}`,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLocating(false)

          toast({
            title: "Location error",
            description: "Unable to get your current location. Please try again or enter manually.",
            variant: "destructive",
          })
        },
      )
    } else {
      setIsLocating(false)
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please enter your location manually.",
        variant: "destructive",
      })
    }
  }

  const selectLocation = (loc: string) => {
    setLocation(loc)
    setSearchQuery("")
  }

  const filteredLocations = popularLocations.filter((loc) => loc.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 font-normal justify-start px-2">
          <MapPin className="h-4 w-4 text-orange-500" />
          <span className="truncate max-w-[150px]">{location}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select your location</DialogTitle>
        </DialogHeader>

        <div className="relative mt-2">
          <Input
            placeholder="Search for area, street name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <Button
          variant="outline"
          className="flex items-center gap-2 mt-2"
          onClick={detectCurrentLocation}
          disabled={isLocating}
        >
          <Navigation className="h-4 w-4" />
          {isLocating ? "Detecting location..." : "Use current location"}
        </Button>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Popular Locations</h4>
          <div className="space-y-2">
            {filteredLocations.map((loc, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={() => selectLocation(loc)}
              >
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                {loc}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

