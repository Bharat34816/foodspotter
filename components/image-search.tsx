"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ImageSearch() {
  const [image, setImage] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraClick = () => {
    fileInputRef.current?.click()
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleClearImage = () => {
    setImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSearchByImage = () => {
    if (!image) return

    setIsSearching(true)

    // In a real app, you would send the image to your backend for processing
    // For demo purposes, we'll simulate a search and redirect to search results
    setTimeout(() => {
      setIsSearching(false)
      router.push("/search-results?type=image")
    }, 1500)
  }

  return (
    <div className="w-full">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        capture="environment"
      />

      {!image ? (
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleCameraClick}
          >
            <Camera className="w-4 h-4" />
            Take Photo
          </Button>
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleUploadClick}
          >
            <Upload className="w-4 h-4" />
            Upload Image
          </Button>
        </div>
      ) : (
        <div className="mt-4">
          <div className="relative w-full h-48 rounded-lg overflow-hidden mb-3">
            <Image src={image || "/placeholder.svg"} alt="Food search" fill className="object-cover" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 rounded-full"
              onClick={handleClearImage}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleSearchByImage}
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : "Search with this image"}
          </Button>
        </div>
      )}
    </div>
  )
}

