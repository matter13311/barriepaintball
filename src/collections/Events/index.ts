import { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
    slug: "events",
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
            name: 'publishedAt',
            type: 'date',
            defaultValue: new Date(),
            admin: {
                position: 'sidebar',
            },
        },
    ],
    
}