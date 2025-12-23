import React from 'react'

import type { PackagesBlock as PackagesBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const PackagesBlock: React.FC<PackagesBlockProps> = ({ title, items }) => {
  return (
    <div className="container my-16">
      {title && (
        <h2 className="mb-12 text-center text-4xl font-stencil uppercase tracking-widest text-primary dark:text-foreground">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items?.map((item, i) => (
          <div
            key={i}
            className={cn(
              'relative flex flex-col p-6 border-2 transition-all duration-300',
              item.highlight
                ? 'border-accent bg-accent/10 shadow-xl scale-105 z-10'
                : 'border-border bg-card hover:border-primary/50',
            )}
          >
            {item.highlight && (
                <div className="absolute top-0 right-0 bg-accent text-white uppercase text-xs font-bold px-3 py-1 tracking-wider">
                    Most Popular
                </div>
            )}
            <h3 className="text-2xl font-bold uppercase mb-2 font-stencil text-primary">
              {item.name}
            </h3>
            <div className="text-3xl font-black mb-4 text-foreground">{item.price}</div>
            
            {item.description && (
                <p className="mb-6 text-muted-foreground">{item.description}</p>
            )}

            <ul className="space-y-3 mb-8 flex-1">
              {item.features?.map((featureItem, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span className="text-sm">{featureItem.feature}</span>
                </li>
              ))}
            </ul>

            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase py-3 tracking-widest skew-x-[-10deg] border border-primary-foreground/20">
                <span className="inline-block skew-x-[10deg]">Book Now</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
