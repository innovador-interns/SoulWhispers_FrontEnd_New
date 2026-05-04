import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

export default function BackgroundLines() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const paths = containerRef.current.querySelectorAll('.flowing-path')

    const ctx = gsap.context(() => {
      paths.forEach((path, i) => {
        const length = path.getTotalLength()

        // Initial dash setup
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length
        })

        // Flow animation 
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 6 + i * 1.2,
          repeat: -1,
          ease: 'none'
        })

        // Subtle floating
        gsap.to(path, {
          y: i % 2 === 0 ? 12 : -12,
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })

        // Opacity breathing 
        gsap.to(path, {
          opacity: 0.3 + Math.random() * 0.4,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="h-full w-full opacity-60"
        fill="none"
      >

        {/* Lines */}
        <path
          className="flowing-path"
          d="M-50 150 C 200 50, 400 250, 600 150 S 1050 150, 1050 150"
          stroke="#3bab35"
          strokeWidth="0.6"
          opacity="0.5"
        />
        <path
          className="flowing-path"
          d="M-50 350 C 150 450, 450 250, 700 350 S 1050 350, 1050 350"
          stroke="#3bab35"
          strokeWidth="0.4"
          opacity="0.45"
        />
        <path
          className="flowing-path"
          d="M-50 550 C 250 650, 550 450, 800 550 S 1050 550, 1050 550"
          stroke="#3bab35"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <path
          className="flowing-path"
          d="M-50 750 C 100 850, 400 650, 700 750 S 1050 750, 1050 750"
          stroke="#3bab35"
          strokeWidth="0.4"
          opacity="0.45"
        />
        <path
          className="flowing-path"
          d="M-50 900 C 300 800, 600 1000, 900 900 S 1050 900, 1050 900"
          stroke="#3bab35"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <path
          className="flowing-path"
          d="M-50 50 C 250 -50, 500 150, 750 50 S 1050 50, 1050 50"
          stroke="#3bab35"
          strokeWidth="0.4"
          opacity="0.4"
        />
        <path
          className="flowing-path"
          d="M-50 250 C 200 350, 500 150, 800 250 S 1050 250, 1050 250"
          stroke="#3bab35"
          strokeWidth="0.5"
          opacity="0.45"
        />
        <path
          className="flowing-path"
          d="M-50 450 C 150 550, 450 350, 750 450 S 1050 450, 1050 450"
          stroke="#3bab35"
          strokeWidth="0.4"
          opacity="0.5"
        />
        <path
          className="flowing-path"
          d="M-50 650 C 200 750, 500 550, 800 650 S 1050 650, 1050 650"
          stroke="#3bab35"
          strokeWidth="0.5"
          opacity="0.45"
        />
        <path
          className="flowing-path"
          d="M-50 850 C 250 950, 550 750, 850 850 S 1050 850, 1050 850"
          stroke="#3bab35"
          strokeWidth="0.4"
          opacity="0.5"
        />
        <path
          className="flowing-path"
          d="M-50 100 C 300 0, 600 200, 900 100 S 1050 100, 1050 100"
          stroke="#3bab35"
          strokeWidth="0.5"
          opacity="0.4"
        />
        <path
          className="flowing-path"
          d="M-50 300 C 200 400, 500 200, 800 300 S 1050 300, 1050 300"
          stroke="#3bab35"
          strokeWidth="0.4"
          opacity="0.45"
        />
        <path
          className="flowing-path"
          d="M-50 500 C 150 600, 450 400, 750 500 S 1050 500, 1050 500"
          stroke="#3bab35"
          strokeWidth="0.5"
          opacity="0.5"
        />
        <path
          className="flowing-path"
          d="M-50 700 C 250 800, 550 600, 850 700 S 1050 700, 1050 700"
          stroke="#3bab35"
          strokeWidth="0.4"
          opacity="0.45"
        />
        <path
          className="flowing-path"
          d="M-50 950 C 200 1050, 500 850, 800 950 S 1050 950, 1050 950"
          stroke="#3bab35"
          strokeWidth="0.5"
          opacity="0.4"
        />
      </svg>
    </div>
  )
}