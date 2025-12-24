import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Event } from '@/payload-types'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import { CalendarDays } from 'lucide-react'
import { cn } from '@/utilities/ui'

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  const payload = await getPayload({ config })

  let events: Event[] = []

  try {
    const result = await payload.find({
      collection: 'events',
      sort: 'eventDate',
      limit: 100,
    })

    events = result.docs as Event[]

    console.log(events)
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  return (
    <div className="pt-6 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1 className="text-4xl md:text-6xl font-bold font-stencil uppercase tracking-wider mb-8 text-center">
            All Events
          </h1>
        </div>
      </div>

      <div className="container">
        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
               const dateObj = event.eventDate ? new Date(event.eventDate) : null

              return (
                <div 
                  key={event.id} 
                  className={cn(
                  'group relative flex flex-col overflow-hidden bg-card border-none ring-1 ring-border',
                  // "Mission Brief" styling: top border accent
                  'before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-primary before:transition-all before:duration-300',
                  'hover:before:h-2 hover:shadow-lg transition-all duration-300',
                )}
                >
                  <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center mb-4 justify-between gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <div className="flex gap-2">
                      <CalendarDays size={14} />
                      <span>Date Of Event</span>
                    </div>
                     {dateObj && (
                      <div className="flex flex-col items-center justify-center bg-background/90 p-2 text-center border border-border shadow-sm">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="text-2xl font-black font-stencil text-primary">
                          {dateObj.getDate()}
                        </span>
                      </div>
                    )}
                  </div>
                    <h3 className="text-2xl font-bold uppercase font-stencil text-foreground group-hover:text-primary transition-colors mb-4">
                        {event.name}
                    </h3>
                    
                    {event.description && (
                      <div className="mb-6 line-clamp-3 text-muted-foreground prose prose-sm dark:prose-invert">
                        <RichText data={event.description} enableGutter={false} />
                      </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                        <Link href={`/events/${event.slug}`} className="text-sm font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors">
                            Read Brief &rarr;
                        </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-border/50 rounded-lg">
            <h3 className="text-xl font-bold font-stencil uppercase">No Upcoming Missions</h3>
            <p className="text-muted-foreground">Check back later for deployment orders.</p>
          </div>
        )}
      </div>
    </div>
  )
}
