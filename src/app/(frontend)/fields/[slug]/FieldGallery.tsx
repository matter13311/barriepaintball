'use client'

import * as React from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  images: (MediaType | string | number | null | undefined)[]
}

export function FieldGallery({ images }: Props) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [validImages, setValidImages] = React.useState<MediaType[]>([])
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // Filter locally to ensure we only have valid objects for the gallery
    const filtered = images.filter((img): img is MediaType => {
      return typeof img === 'object' && img !== null
    })
    setValidImages(filtered)
  }, [images])

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current
      // Calculate active index based on scroll position
      // Adding half of clientWidth to handle snapping point better
      const newIndex = Math.round(scrollLeft / clientWidth)
      setActiveIndex(newIndex)
    }
  }

  const scrollToImage = (index: number) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current
      scrollContainerRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth',
      })
      setActiveIndex(index)
    }
  }

  const handlePrev = () => {
    const nextIndex = Math.max(0, activeIndex - 1)
    scrollToImage(nextIndex)
  }

  const handleNext = () => {
    const nextIndex = Math.min(validImages.length - 1, activeIndex + 1)
    scrollToImage(nextIndex)
  }

  if (validImages.length === 0) {
    return null
  }

  return (
    <div className="relative w-full">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-lg group">
        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {validImages.map((img, index) => (
            <div
              key={index}
              className="min-w-full snap-center relative aspect-[4/3] bg-muted"
            >
              <Media
                resource={img}
                fill
                imgClassName="object-cover pointer-events-none" // pointer-events-none ensures better scrolling on touch
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {validImages.length > 1 && (
            <>
                {activeIndex > 0 && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={handlePrev}
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                )}
                
                {activeIndex < validImages.length - 1 && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 hover:bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={handleNext}
                        aria-label="Next image"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                )}
            </>
        )}
      </div>

      {/* Dots Navigation */}
      {validImages.length > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToImage(index)}
              className={cn(
                'h-3 w-3 rounded-full transition-all duration-300',
                activeIndex === index
                  ? 'bg-primary scale-110 w-6' // Active dot is wider and primary color
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              )}
              aria-label={`Go to image ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </div>
  )
}
