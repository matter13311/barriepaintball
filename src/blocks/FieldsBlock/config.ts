import { Block } from 'payload'

export const FieldsBlock: Block = {
  slug: 'fields',
  interfaceName: 'FieldsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Fields',
    },
  ],
}
