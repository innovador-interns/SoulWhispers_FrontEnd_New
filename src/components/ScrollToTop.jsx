import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // 1. Prevent the browser from trying to restore scroll position which breaks GSAP
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // 2. Immediately jump to top
    window.scrollTo(0, 0)
    
    // 3. Force a series of refreshes as React settles
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
      ScrollTrigger.refresh()
    }, 50)

    // 4. Secondary refresh for delayed layout shifts
    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 600)

    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [pathname])

  return null
}

export default ScrollToTop
