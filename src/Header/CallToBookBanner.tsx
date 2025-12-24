'use client'
import { cn } from '@/utilities/ui'
import React, { useEffect, useState } from 'react'

export const CallToBookBanner = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Check initial scroll
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'bg-accent text-accent-foreground sticky top-0 z-50 w-full text-center shadow-lg border-b-2 border-primary/50 transition-all duration-300 ease-in-out',
        isScrolled ? 'py-1' : 'py-2',
      )}
    >
      <div
        className={cn(
          'container px-4 mx-auto flex justify-center items-center font-stencil tracking-widest uppercase transition-all duration-300',
          isScrolled ? 'flex-row gap-4' : 'flex-col sm:flex-row gap-2 sm:gap-4',
        )}
      >
        <span
          className={cn(
            'opacity-90 transition-all duration-300',
            isScrolled ? 'text-xs sm:text-sm' : 'text-sm sm:text-base',
          )}
        >
          Call to Book Today!
        </span>
        <a
          href="tel:5550199"
          className="group flex items-center gap-2 hover:opacity-100 transition-opacity"
        >
          <span
            className={cn(
              'bg-primary text-primary-foreground skew-x-[-10deg] hover:bg-primary/90 transition-all duration-300',
              isScrolled ? 'text-sm px-2 py-0' : 'text-base sm:text-lg px-3 py-0.5',
            )}
          >
            <span className="skew-x-[10deg] inline-block">705-985-3331</span>
          </span>
        </a>
      </div>
    </div>
  )
}
