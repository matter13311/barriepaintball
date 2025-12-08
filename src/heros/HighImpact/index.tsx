'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative -mt-[10.4rem] flex items-center justify-center text-white">
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[48rem] md:text-center text-white p-6 bg-black/40 backdrop-blur-sm border border-white/20">
          {richText && <RichText className="mb-6 prose-h1:font-stencil prose-h1:uppercase prose-h1:tracking-widest prose:text-white" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 font-bold uppercase tracking-widest border border-primary-foreground/30 skew-x-[-10deg]" />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        <div className="absolute inset-0 bg-black/30 z-0" />
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
        )}
      </div>
    </div>
  )
}
