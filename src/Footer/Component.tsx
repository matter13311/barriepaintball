import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t-4 border-secondary bg-primary text-primary-foreground">
      <div className="container py-12 gap-8 flex flex-col md:flex-row md:justify-between items-center">
        <div className="flex flex-col gap-4">
          <Link className="flex items-center" href="/">
            <div className="font-stencil text-2xl uppercase tracking-widest text-primary-foreground">
               Barrie Paintball
            </div>
          </Link>
          <div className="flex flex-col opacity-80 text-sm">
             <p>123 Paintball Road, Barrie, ON</p>
             <p>555-0199 | info@barriepaintball.com</p>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-primary-foreground hover:underline" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
