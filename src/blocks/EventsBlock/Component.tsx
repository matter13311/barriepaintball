import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Event } from '@/payload-types'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { CalendarDays } from 'lucide-react'

export const EventsBlock: React.FC<{ title?: string }> = async ({ title }) => {
  const payload = await getPayload({ config })

  let events: Event[] = []

  try {
    const result = await payload.find({
      collection: 'events',
      limit: 100,
      sort: 'eventDate', // Ascending order to show upcoming events first
      where: {
        eventDate: {
          greater_than_equal: new Date().toISOString(), // Only show future/today events
        },
      },
    })

    events = result.docs as Event[]
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  return (
    <section className="container my-16">
      {/* Block Title */}
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-stencil uppercase tracking-widest text-primary dark:text-foreground">
          {title || 'Upcoming Events'}
        </h2>
        <div className="mx-auto mt-4 h-1 w-24 bg-primary" />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events && events.length > 0 ? (
          events.map((event) => {
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
                  {/* Header */}
                  <div className="flex items-center mb-4 justify-between gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <div className="flex gap-2">
                      <CalendarDays size={14} />
                      <span>Date Of Event</span>
                    </div>
                    {/* Date Badge - Stencil Look */}
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
                  <h3 className="text-2xl font-bold uppercase font-stencil text-foreground group-hover:text-primary transition-colors">
                    {event.name}
                  </h3>

                  {/* Description */}
                  {event.description && (
                    <div className="prose prose-sm dark:prose-invert text-muted-foreground flex-grow line-clamp-4">
                      <RichText data={event.description} enableGutter={false} />
                    </div>
                  )}

                  {/* Footer / Action */}
                  <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
                    <Link href={`/events/${event.slug}`} className="text-sm font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors">
                      Read Brief &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 border-2 border-dashed border-border/50 rounded-lg">
            <p className="text-lg font-stencil uppercase text-muted-foreground">
              No Upcoming Missions Scheduled
            </p>
            <p className="text-sm text-muted">Check back later for deployment orders.</p>
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <Button asChild size="lg" className="font-stencil tracking-widest text-lg uppercase px-8">
            <Link href="/events">
                View All Events
            </Link>
        </Button>
      </div>
    </section>
  )
}
