import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import { featureSteps } from './feature-list/feature-data'
import { gsap, ScrollTrigger } from '../../lib/gsap'

// Sub-sections
import WellnessIntro from './feature-list/WellnessIntro'
import HowItWorks from './feature-list/HowItWorks'
import MobileSanctuary from './feature-list/MobileSanctuary'
import FoundersNote from './feature-list/FoundersNote'

export default function FeatureList() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [readMore, setReadMore] = useState(false)
  const activeIndexRef = useRef(0)
  const sectionRef = useRef(null)
  const storytellingRef = useRef(null)
  const founderRef = useRef(null)

  useEffect(() => {
    activeIndexRef.current = activeIndex
  }, [activeIndex])

  const updateActiveIndex = useCallback((nextIndex) => {
    setActiveIndex((current) => (current === nextIndex ? current : nextIndex))
  }, [])

  // ── GSAP scroll triggers ─────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const root = sectionRef.current
    const storytelling = storytellingRef.current
    const founder = founderRef.current
    if (!root || !storytelling || !founder) return

    const ctx = gsap.context(() => {
      // Reveal animations for headings/copy
      gsap.utils.toArray('[data-gsap-reveal]').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50, filter: 'blur(6px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%' },
          }
        )
      })

      // Mobile: Scroll-driven step activation (less aggressive)
      if (window.innerWidth < 1024) {
        const cards = gsap.utils.toArray('[data-story-card]')
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 60%',
            end: 'bottom 40%',
            onEnter: () => {
              if (activeIndexRef.current !== i) updateActiveIndex(i)
            },
            onEnterBack: () => {
              if (activeIndexRef.current !== i) updateActiveIndex(i)
            },
            // Prevent conflicts with other scroll triggers
            fastScrollEnd: true,
          })
        })
      }

      // Founder section reveal
      const founderPhoto = founder.querySelector('[data-founder-photo]')
      const founderQuote = founder.querySelector('[data-founder-quote]')
      if (founderPhoto && founderQuote) {
        gsap.fromTo(founderPhoto,
          { opacity: 0, x: -55, scale: 0.93 },
          {
            opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: founder, start: 'top 74%' }
          }
        )
        gsap.fromTo(founderQuote,
          { opacity: 0, y: 45 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: founder, start: 'top 74%' }, delay: 0.15
          }
        )
      }

      // Horizontal lines draw-in
      gsap.utils.toArray('[data-gsap-line]').forEach((line) => {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: line, start: 'top 88%' }
          }
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="wellness-journey"
      ref={sectionRef}
      className="section-space relative !py-10 px-4 sm:px-6 lg:px-8"
    >
      {/* Global ambient bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(59,171,53,0.05),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgba(15,79,36,0.04),transparent_50%)]" />

      <div className="container space-y-8">
        <WellnessIntro />

        <HowItWorks
          storytellingRef={storytellingRef}
          activeIndex={activeIndex}
          updateActiveIndex={updateActiveIndex}
          activeIndexRef={activeIndexRef}
        />

        <MobileSanctuary />

        <FoundersNote
          founderRef={founderRef}
          readMore={readMore}
          setReadMore={setReadMore}
        />
      </div>
    </section>
  )
}
