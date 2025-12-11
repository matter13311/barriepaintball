import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Pricing } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const PricingsBlock: React.FC<{ title?: string }> = async ({ title }) => {
  const payload = await getPayload({ config })

  let pricings: Pricing[] = []

  try {
    const result = await payload.find({
      collection: 'pricings',
      limit: 300,
    })

    pricings = result.docs as Pricing[]
  } catch (error) {
    console.error('Error fetching pricings:', error)
  }

  // Sort by `priority` ascending (lower numbers appear first).
  // If an item doesn't have a priority, treat it as very low priority (large number).
  pricings.sort(
    (a, b) => (a.priority ?? Number.MAX_SAFE_INTEGER) - (b.priority ?? Number.MAX_SAFE_INTEGER),
  )

  return (
    <div className="container my-16">
      {title && (
        <h2 className="mb-12 text-center text-4xl font-stencil uppercase tracking-widest text-primary dark:text-foreground">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricings && pricings.length > 0 ? (
          pricings.map((pricing) => (
            <div
              key={pricing.id}
              className={cn(
                'relative flex flex-col p-6 border-2 bg-card transition-all duration-300 hover:border-primary/50',
                'border-border',
              )}
            >
              <h3 className="text-2xl font-bold uppercase mb-4 font-stencil ">{pricing.name}</h3>

              {pricing.content && (
                <div className="prose prose-sm dark:prose-invert mb-4 flex-1">
                  <RichText data={pricing.content} enableGutter={false} />
                </div>
              )}

              {pricing.categories && pricing.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {pricing.categories.map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className="inline-block text-xs font-semibold uppercase bg-primary/10 text-primary px-3 py-1 rounded"
                    >
                      {typeof category === 'object' ? category.title : category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No pricing items available
          </div>
        )}
      </div>
    </div>
  )
}
