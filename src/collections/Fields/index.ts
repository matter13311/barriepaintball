import type { CollectionConfig } from 'payload'

export const Fields: CollectionConfig = {
    slug: 'fields',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
        },
        {
            name: 'slug',
            type: 'text',
        },
        {
            name: 'description',
            type: 'text',
        },
        {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
            hasMany: true
        }
    ],
}
