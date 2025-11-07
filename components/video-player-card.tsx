"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Play } from "lucide-react"
import { useState } from "react"

interface VideoPlayerCardProps {
  videoId: string  // YouTube video ID
  startTime?: number  // Start time in seconds
  title?: string
}

export default function VideoPlayerCard({
  videoId,
  startTime = 0,
  title
}: VideoPlayerCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  
  // YouTube thumbnail URL (maximum quality)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  
  // Construct the YouTube embed URL with parameters
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1&rel=0`

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
          {!isPlaying ? (
            <>
              {/* Thumbnail and play button */}
              <div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center cursor-pointer group"
                style={{ backgroundImage: `url(${thumbnailUrl})` }}
                onClick={() => setIsPlaying(true)}
              >
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-black/70 p-4 transform transition-transform group-hover:scale-110">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </>
          ) : (
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={embedUrl}
              title={title || "YouTube video player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}