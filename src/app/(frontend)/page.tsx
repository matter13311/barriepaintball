import PageTemplate, { generateMetadata } from './[slug]/page'

export default async function HomePage() {
  return <PageTemplate params={Promise.resolve({ slug: 'home' })} />
}

export { generateMetadata }
