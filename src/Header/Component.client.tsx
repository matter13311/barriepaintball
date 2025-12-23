'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const logo = typeof data?.navLogo === 'number' ? '' : data?.navLogo || ''

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="navbar px-6 z-20 bg-secondary text-secondary-foreground border-b-4 border-primary shadow-lg"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="py-4 flex justify-between items-center">
        <Link href="/">
          <div className="font-stencil text-2xl uppercase tracking-widest text-primary-foreground bg-primary px-4 py-1 skew-x-[-10deg]">
             <span className="skew-x-[10deg] inline-block">Barrie Paintball</span>
          </div>
          {/* <Logo loading="eager" priority="high" className="invert dark:invert-0" logo={logo} /> */}
        </Link>
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
