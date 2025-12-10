import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Pricings: CollectionConfig = {
    slug: 'pricings',
    admin: {
        defaultColumns: ['name', 'price', 'description'],
    },
    fields: [
        {
            name: 'name',
            type: 'text',
        },
        {
            name: 'content',
            type: 'richText',
            editor: lexicalEditor({
            features: ({ rootFeatures }) => {
                return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                HorizontalRuleFeature(),
                ]
            },
            }),
            label: false,
            required: true,
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'categories',
            type: 'relationship',
            hasMany: true,
            relationTo: 'categories',
        }
    ],
}