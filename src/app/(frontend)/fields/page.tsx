import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Field } from '@/payload-types'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'

export const dynamic = 'force-dynamic'

export default async function FieldsPage() {
  const payload = await getPayload({ config })

  let fields: Field[] = []

  try {
    const result = await payload.find({
      collection: 'fields',
      sort: 'sort', // Assuming there's a sort order, or just default
      limit: 100,
    })

    fields = result.docs as Field[]
  } catch (error) {
    console.error('Error fetching fields:', error)
  }

  return (
    <div className="pt-6 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-6xl font-bold font-stencil uppercase tracking-wider mb-8 text-center">
            Field Zones
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Explore our diverse combat zones, each designed to provide a unique tactical challenge.
          </p>
        </div>
      </div>

      <div className="container">
        {fields && fields.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fields.map((field) => {
              // Get the first image only for the card
              const img = Array.isArray(field.image) ? field.image[0] : field.image
              
              return (
                <div 
                  key={field.id} 
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg hover:border-primary/50"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    {img && typeof img !== 'string' ? (
                      <Media 
                        resource={img} 
                        fill 
                        imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-3 text-2xl font-bold font-stencil uppercase tracking-wide">
                      {field.name}
                    </h3>
                    
                    {field.description && (
                      <div className="mb-6 line-clamp-3 text-muted-foreground">
                        <RichText data={field.description} />
                      </div>
                    )}

                    <div className="mt-auto">
                      <Button asChild className="w-full" variant="outline">
                        <Link href={`/fields/${field.slug}`}>
                          View More
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold">No fields found</h3>
            <p className="text-muted-foreground">Check back soon for new mission zones.</p>
          </div>
        )}
      </div>
    </div>
  )
}
