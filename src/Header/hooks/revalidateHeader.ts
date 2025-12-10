import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)
    
   if (doc.navItems) {
      doc.navItems.forEach((item: any, i: number) => {
        payload.logger.info(`Nav Item ${i}: ${item.link?.label}`)
      })
    }
    revalidateTag('global_header')
  }

  return doc
}
