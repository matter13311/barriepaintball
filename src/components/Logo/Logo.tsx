import clsx from 'clsx'
import React from 'react'

import type { Media } from '@/payload-types'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  logo?: Media | string
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    logo: logoFromProps,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'
  let logoSrc: string | undefined

  if (typeof logoFromProps === 'string') {
    logoSrc = logoFromProps
  } else if (logoFromProps && typeof logoFromProps === 'object' && 'url' in logoFromProps) {
    logoSrc = (logoFromProps as Media).url ?? undefined
  } else {
    logoSrc = undefined
  }

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Payload Logo"
      width={280} // increased from 193
      height={48} // increased from 34
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[13rem] w-full h-full max-h-[100px]', className)}
      src={logoSrc}
    />
  )
}
