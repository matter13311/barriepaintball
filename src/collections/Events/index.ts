import { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
    slug: "events",
    admin: {
        useAsTitle: 'name',
    },
    defaultPopulate: {
        slug: true,
    },
    fields: [
        {
            name: "name",
            type: "text",
        },
        {
            name: "eventDate",
            type: "date",
        },
        {
            name: "description",    
            type: "richText",
        },
        {
            name: 'slug',
            type: 'text',
            required: true, 
        },
        {
            name: 'publishedAt',
            type: 'date',
            defaultValue: new Date(),
            admin: {
                position: 'sidebar',
            },
        },
    ],
    
}