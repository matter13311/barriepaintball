'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-6 items-center">
      {navItems.map(({ link }, i) => {
        return (
          <div key={i} className="font-bold uppercase tracking-wider text-secondary hover:text-secondary/90 transition-colors">
            <CMSLink {...link} appearance="link" size="lg" className="text-white hover:text-white/90"/>
          </div>
        )
      })}
    </nav>
  )
}
