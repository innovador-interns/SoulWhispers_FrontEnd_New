import { useEffect, useLayoutEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './Nav'
import Footer from './Footer'
import ChatAssistant from './chat/ChatAssistant'
import ScrollProgress from './ui/ScrollProgress'

function Layout() {
  const location = useLocation()

  // FORCE SCROLL RESET AND GSAP REFRESH ON EVERY ROUTE CHANGE
  useLayoutEffect(() => {
    // 0. Manual scroll restoration to prevent browser interference
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // 1. Reset window immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' })

    // 2. Reset ScrollTrigger to avoid stale calculations from previous page
    ScrollTrigger.clearMatchMedia() // Clean up any media-query specific triggers

    // Single refresh after layout settles - less aggressive
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative">
      {/* <div className="fixed top-20 left-4 z-[9999] bg-red-500 text-white p-2 text-xs">Layout Rendered: {location.pathname}</div> */}
      <ScrollProgress />
      <Nav />
      <main className="w-full">
        <Outlet />
      </main>
      <Footer />
      <ChatAssistant />
    </div>
  )
}

export default Layout
