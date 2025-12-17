import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Field } from '@/payload-types'
import { Carousel } from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import RichText from '@/components/RichText'
export const FieldsBlock: React.FC<{ title?: string }> = async ({ title }) => {
  const payload = await getPayload({ config })

  let fields: Field[] = []

  try {
    const result = await payload.find({
      collection: 'fields',
      limit: 100,
    })

    fields = result.docs as Field[]

    console.log(fields)
  } catch (error) {
    console.error('Error fetching fields:', error)
  }

  return (
    <div className="container my-16">
      {title && (
        <h2 className="mb-12 text-center text-4xl font-stencil uppercase tracking-widest text-primary dark:text-foreground">
          {title}
        </h2>
      )}

      <div className="flex flex-col gap-8 max-w-[90vw] mx-auto w-full">
        {fields && fields.length > 0 ? (
          <>
            <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md">
              <Carousel className="w-full">
                {fields.map((field) => {
                  // Get the first image only
                  const img = Array.isArray(field.image) ? field.image[0] : field.image
                  const imageSrc = typeof img === 'object' && img?.url ? img.url : null
                  const imageAlt = typeof img === 'object' && img?.alt ? img.alt : 'Field Image'

                  return (
                    <div key={field.id} className="flex flex-col gap-6 w-full">
                      {/* Media Section - Takes 2/5 on large screens */}
                      <div className="relative w-full h-[40rem] rounded-lg overflow-hidden">
                        {imageSrc ? (
                          <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Content Section - Takes 3/5 on large screens */}
                      <div className="flex justify-between p-6 pt-0 w-full text-left">
                        <div className="flex flex-col gap-2 w-full">
                          <h3 className="text-3xl font-bold uppercase font-stencil text-card-foreground">
                            {field.name}
                          </h3>

                          {field.description && (
                            <div className="max-w-prose text-lg text-muted-foreground leading-relaxed">
                              <RichText data={field.description} />
                            </div>
                          )}
                        </div>

                        <div className="mt-auto">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/fields/${field.slug}`}>More Info</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Carousel>
            </div>

            <div className="flex justify-center">
              <Button size="lg" asChild>
                <Link href="/fields">View All Fields</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center text-muted-foreground py-12">No fields available</div>
        )}
      </div>
    </div>
  )
}
