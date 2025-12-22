import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Check if URL already has http/https protocol
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return cacheTag ? `${url}?${cacheTag}` : url
  }

  // If NEXT_PUBLIC_BLOB_URL is set, use it as the base
  // This assumes the user wants to force these relative paths to be blobs
  // and that the path structure matches (or they can adjust the env var)
  if (process.env.NEXT_PUBLIC_BLOB_URL) {
    const blobUrl = process.env.NEXT_PUBLIC_BLOB_URL.replace(/\/$/, '') // Remove trailing slash if present
    // Remove the leading /media if your Blob storage doesn't use that folder structure
    const cleanPath = url.replace('/media', '')
    return `${blobUrl}${cleanPath}`
  }

  // Otherwise prepend client-side URL
  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}
