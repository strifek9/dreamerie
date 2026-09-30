import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import VersionThree from './v3/VersionThree'
import { installCloudflareAnalytics } from './analytics/cloudflare'
import './styles/global.css'

const root = document.getElementById('root')
const CollectionReview = import.meta.env.DEV ? lazy(() => import('./v2/CollectionReview')) : null

if (!root) {
  throw new Error('Dreamerie could not find its root element.')
}

createRoot(root).render(
  <StrictMode>
    {CollectionReview && new URLSearchParams(location.search).has('review') ? <Suspense fallback={<p>Loading review…</p>}><CollectionReview/></Suspense> : <VersionThree />}
  </StrictMode>,
)

installCloudflareAnalytics(document, import.meta.env.PROD, location.href)
