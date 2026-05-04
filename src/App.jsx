import './App.css'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import BlogsPage from './pages/BlogsPage'
import BlogDetailPage from './pages/BlogDetailPage'
import FaqsPage from './pages/FaqsPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import { Toaster } from 'sonner'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsAndConditionsPage from './pages/TermsAndConditionsPage'

// Enforce trailing slashes for SEO and protection
function TrailingSlashRedirect() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const { pathname, search, hash } = location
    if (pathname !== '/' && !pathname.endsWith('/')) {
      navigate({
        pathname: `${pathname}/`,
        search: search,
        hash: hash,
      }, { replace: true })
    }
  }, [location, navigate])

  return null
}

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
      />
      <BrowserRouter>
        <TrailingSlashRedirect />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="features/" element={<FeaturesPage />} />
            <Route path="blogs/" element={<BlogsPage />} />
            <Route path="blog/:id/" element={<BlogDetailPage />} />
            <Route path="faqs/" element={<FaqsPage />} />
            <Route path="contact/" element={<ContactPage />} />
            <Route path="privacy-policy/" element={<PrivacyPolicyPage />} />
            <Route path="terms-and-conditions/" element={<TermsAndConditionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
