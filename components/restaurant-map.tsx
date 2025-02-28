"use client"

import { useEffect, useRef } from "react"
import { MapPin } from "lucide-react"

interface Coordinates {
  latitude: number
  longitude: number
}

interface Restaurant {
  id: string
  name: string
  coordinates?: Coordinates
}

interface RestaurantMapProps {
  userLocation: Coordinates
  restaurants: Restaurant[]
}

export default function RestaurantMap({ userLocation, restaurants }: RestaurantMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const mapContainer = mapRef.current
    mapContainer.innerHTML = ""

    // Create map container
    const mapElement = document.createElement("div")
    mapElement.className = "relative w-full h-full bg-gray-100"
    mapContainer.appendChild(mapElement)

    // Add user location marker
    const userMarker = document.createElement("div")
    userMarker.className =
      "absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2"
    userMarker.style.left = "50%"
    userMarker.style.top = "50%"
    userMarker.title = "Your location"
    mapElement.appendChild(userMarker)

    // Add pulse effect
    const pulse = document.createElement("div")
    pulse.className =
      "absolute w-12 h-12 bg-blue-500 rounded-full opacity-30 animate-ping transform -translate-x-1/2 -translate-y-1/2"
    pulse.style.left = "50%"
    pulse.style.top = "50%"
    mapElement.appendChild(pulse)

    // Add restaurant markers
    restaurants.forEach((restaurant, index) => {
      // In a real app, you would use actual coordinates
      // For demo, we'll position markers around the user
      const angle = (index / restaurants.length) * 2 * Math.PI
      const distance = 80 + Math.random() * 40 // Random distance from center

      const x = 50 + (Math.cos(angle) * distance) / 5
      const y = 50 + (Math.sin(angle) * distance) / 5

      const marker = document.createElement("div")
      marker.className = "absolute flex flex-col items-center"
      marker.style.left = `${x}%`
      marker.style.top = `${y}%`

      const icon = document.createElement("div")
      icon.className =
        "w-5 h-5 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`

      const label = document.createElement("div")
      label.className =
        "absolute mt-3 bg-white px-2 py-1 rounded text-xs shadow-md whitespace-nowrap transform -translate-x-1/2"
      label.textContent = restaurant.name

      marker.appendChild(icon)
      marker.appendChild(label)
      mapElement.appendChild(marker)
    })

    // Add map attribution
    const attribution = document.createElement("div")
    attribution.className = "absolute bottom-1 right-1 text-xs text-gray-500"
    attribution.textContent = "Map visualization (demo only)"
    mapElement.appendChild(attribution)
  }, [restaurants])

  return (
    <div ref={mapRef} className="w-full h-full">
      <div className="flex items-center justify-center h-full">
        <MapPin className="w-6 h-6 text-gray-400 animate-bounce" />
        <span className="ml-2 text-gray-500">Loading map...</span>
      </div>
    </div>
  )
}

