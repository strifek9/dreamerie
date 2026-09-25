import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import VersionThree from './v3/VersionThree'
import './styles/global.css'

const root = document.getElementById('root')
const CollectionReview = import.meta.env.DEV ? lazy(() => import('./v2/CollectionReview')) : null

if (!root) {
  throw new Error('Dreamerie could not find its root element.')
}

createRoot(root).render(
  <StrictMode>
    {CollectionReview && new URLSearchParams(location.search).has('review') ? <Suspense fallback={<p>Loading review…</p>}><CollectionReview/></Suspense> : import.meta.env.DEV && new URLSearchParams(location.search).get('version') === '1' ? <App /> : <VersionThree />}
  </StrictMode>,
)
