import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Field, Media } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { Carousel } from '@/components/ui/carousel'
import Image from 'next/image'

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

      <div className="flex flex-col gap-12">
        {fields && fields.length > 0 ? (
          fields.map((field) => (
            <div
              key={field.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {/* Media Section - Takes 2/5 on large screens */}
                <div className="lg:col-span-2 relative aspect-video md:aspect-square lg:aspect-auto min-h-[300px] w-full overflow-hidden bg-muted">
                   {/* Handle Image(s) */}
                   {Array.isArray(field.image) && field.image.length > 1 ? (
                      <Carousel className="w-full h-full absolute inset-0">
                         {field.image.map((img, index) => {
                             const imageSrc = typeof img === 'object' && img?.url ? img.url : ''
                             const imageAlt = typeof img === 'object' && img?.alt ? img.alt : `Field Image ${index + 1}`
                             
                             if (!imageSrc) return null;

                             return (
                               <div key={typeof img === 'object' ? img.id : index} className="relative w-full h-full"> 
                                  <Image 
                                    src={imageSrc} 
                                    alt={imageAlt}
                                    fill
                                    className="object-cover"
                                  />
                               </div>
                             )
                         })}
                      </Carousel>
                   ) : (
                      // Single Image
                      (() => {
                        const img = Array.isArray(field.image) ? field.image[0] : field.image;
                        const imageSrc = typeof img === 'object' && img?.url ? img.url : ''
                        const imageAlt = typeof img === 'object' && img?.alt ? img.alt : 'Field Image'
                        
                        return imageSrc ? (
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
                        )
                      })()
                   )}
                </div>

                {/* Content Section - Takes 3/5 on large screens */}
                <div className="flex flex-col justify-center p-6 lg:col-span-3 lg:p-10">
                  <div className="mb-4 flex items-center gap-2">
                    {field.slug && (
                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                            {field.slug}
                        </span>
                    )}
                  </div>
                  
                  <h3 className="mb-4 text-3xl font-bold uppercase font-stencil text-card-foreground">
                    {field.name}
                  </h3>

                  {field.description && (
                    <p className="max-w-prose text-lg text-muted-foreground leading-relaxed">
                      {field.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-12">
            No fields available
          </div>
        )}
      </div>
    </div>
  )
}
