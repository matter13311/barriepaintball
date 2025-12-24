import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Event } from '@/payload-types'
import { notFound } from 'next/navigation'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config })

  let event: Event | null = null

  try {
    const result = await payload.find({
      collection: 'events',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    if (result.docs.length > 0) {
      event = result.docs[0] as Event
    }
  } catch (error) {
    console.error('Error fetching event:', error)
  }

  if (!event) {
    return notFound()
  }

  const dateObj = event.eventDate ? new Date(event.eventDate) : null

  return (
    <div className="pt-6 pb-24 min-h-screen">
      <div className="container">
        {/* Navigation */}
        <div className="mb-8">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
            <Link href="/events" className="flex items-center gap-2">
              <span className="text-xl">←</span> Back to Events
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 p-8 border-2 border-border bg-card relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                    <CalendarDays size={120} />
                </div>
                
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4 text-muted-foreground uppercase tracking-widest font-bold text-sm">
                        {dateObj && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-primary/50" />
                                <span className="text-primary">{dateObj.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold font-stencil uppercase tracking-wider mb-6 text-foreground">
                        {event.name}
                    </h1>
                </div>
            </div>

            {/* Content */}
            <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed text-muted-foreground bg-card/30 p-8 rounded-lg border border-border/50">
                <h3 className="text-xl font-bold font-stencil uppercase mb-6 text-primary tracking-wide border-b border-border/50 pb-2">Event Details</h3>
                
                {event.description ? (
                    <RichText data={event.description} />
                ) : (
                    <p>No Event Details available.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  )
}
