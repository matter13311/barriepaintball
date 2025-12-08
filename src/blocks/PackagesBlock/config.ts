import { Block } from 'payload'

export const PackagesBlock: Block = {
  slug: 'packages',
  interfaceName: 'PackagesBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Our Packages',
    },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
          ],
        },
        {
          name: 'highlight',
          type: 'checkbox',
          label: 'Highlight (Most Popular)',
        },
      ],
    },
  ],
}
