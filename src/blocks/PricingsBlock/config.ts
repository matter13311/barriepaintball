import { Block } from 'payload'

export const PricingsBlock: Block = {
  slug: 'pricings',
  interfaceName: 'PricingsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Our Pricing',
    },
  ],
}
