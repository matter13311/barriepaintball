import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Field } from '@/payload-types'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FieldGallery } from './FieldGallery'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function FieldPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  let field: Field | null = null

  try {
    const result = await payload.find({
      collection: 'fields',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (result.docs.length > 0) {
      field = result.docs[0] as Field
    }
  } catch (error) {
    console.error('Error fetching field:', error)
  }

  if (!field) {
    return notFound()
  }

  // Normalize images to an array for easier handling
  const images = Array.isArray(field.image) ? field.image : (field.image ? [field.image] : [])

  return (
    <div className="pt-6 pb-24 min-h-screen">
      <div className="container">
        {/* Navigation */}
        <div className="mb-8">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
            <Link href="/fields" className="flex items-center gap-2">
              <span className="text-xl">←</span> Back to Fields
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Media Gallery */}
          <div className="space-y-6">
            <FieldGallery images={images} />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            <h1 className="text-5xl md:text-6xl font-bold font-stencil uppercase tracking-wider mb-6 text-primary">
              {field.name}
            </h1>
            
            <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-muted-foreground">
              {field.description ? (
                <RichText data={field.description} />
              ) : (
                <p>No briefing available for this zone.</p>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-xl font-bold font-stencil uppercase mb-4">Status</h3>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-mono text-sm tracking-wider uppercase">Active Zone</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
