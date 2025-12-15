import { Block } from 'payload'

export const EventsBlock: Block = {
  slug: 'events',
  interfaceName: 'EventsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Events',
    },
  ],
}
