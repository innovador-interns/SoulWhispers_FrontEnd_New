import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

export default function BackgroundLines() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const paths = containerRef.current.querySelectorAll('.flowing-path')
    
    const ctx = gsap.context(() => {
      // Simple gentle waving animation
      paths.forEach((path, i) => {
        gsap.to(path, {
          attr: {
            d: (index) => {
              const originalD = path.getAttribute('d')
              return originalD
            }
          },
          y: i % 2 === 0 ? 20 : -20,
          duration: 5 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="h-full w-full opacity-50"
        fill="none"
      >
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Light flowing lines */}
        <path
          className="flowing-path"
          d="M-50 150 C 200 50, 400 250, 600 150 S 1050 150, 1050 150"
          stroke="#3bab35"
          strokeWidth="0.6"
          opacity="0.55"
          filter="url(#glow)"
        />
        <path
          className="flowing-path"
          d="M-50 350 C 150 450, 450 250, 700 350 S 1050 350, 1050 350"
          stroke="#3bab35"
          strokeWidth="0.4"
          opacity="0.5"
          filter="url(#glow)"
        />
        <path
          className="flowing-path"
          d="M-50 550 C 250 650, 550 450, 800 550 S 1050 550, 1050 550"
          stroke="#3bab35"
          strokeWidth="0.5"
          opacity="0.55"
          filter="url(#glow)"
        />
        <path
          className="flowing-path"
          d="M-50 750 C 100 850, 400 650, 700 750 S 1050 750, 1050 750"
          stroke="#3bab35"
          strokeWidth="0.4"
          opacity="0.5"
          filter="url(#glow)"
        />
        <path
          className="flowing-path"
          d="M-50 900 C 300 800, 600 1000, 900 900 S 1050 900, 1050 900"
          stroke="#3bab35"
          strokeWidth="0.5"
          opacity="0.55"
          filter="url(#glow)"
        />
      </svg>
    </div>
  )
}
