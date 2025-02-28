"use client"

import { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

const categories = [
  { id: "all", name: "All" },
  { id: "pizza", name: "Pizza" },
  { id: "burger", name: "Burger" },
  { id: "chinese", name: "Chinese" },
  { id: "italian", name: "Italian" },
  { id: "indian", name: "Indian" },
  { id: "mexican", name: "Mexican" },
  { id: "dessert", name: "Dessert" },
  { id: "healthy", name: "Healthy" },
  { id: "vegan", name: "Vegan" },
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
]

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="my-4">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 py-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`rounded-full ${
                activeCategory === category.id
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "text-gray-700 hover:text-orange-500"
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

