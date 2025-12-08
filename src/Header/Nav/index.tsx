'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-6 items-center">
      {navItems.map(({ link }, i) => {
        return (
          <div key={i} className="font-bold uppercase tracking-wider hover:text-primary transition-colors">
            <CMSLink {...link} appearance="link" size="lg" />
          </div>
        )
      })}
      
      <a 
        href="tel:+15555555555" 
        className="bg-accent hover:bg-accent/90 text-white font-bold py-2 px-4 rounded-none border-2 border-dashed border-white uppercase tracking-widest skew-x-[-10deg]"
      >
        <span className="skew-x-[10deg] inline-block">Call to Book</span>
      </a>

      {/* Search Hidden for now as requested simplified flow */}
      {/* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */}
    </nav>
  )
}
