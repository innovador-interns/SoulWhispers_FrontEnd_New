import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion'
import { clientFeatures, consultantFeatures } from '../data/client&cons'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)

CustomEase.create('silk', 'M0,0 C0.25,0 0.1,1 1,1')
CustomEase.create('snap', 'M0,0 C0.6,0 0.4,1 1,1')

// ─── Magnetic Button ───────────────────────────────────────────────────────
function MagneticPill({ children, isActive, onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 25 })
  const springY = useSpring(y, { stiffness: 300, damping: 25 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.3)
    y.set((e.clientY - cy) * 0.3)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.96 }}
      className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 ${
        isActive ? 'text-white' : 'text-slate-500 hover:text-slate-700'
      }`}
    >
      {children}
    </motion.button>
  )
}

// ─── Cursor Glow (subtle ambient) ─────────────────────────────────────────
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return
      gsap.to(ref.current, {
        x: e.clientX - 200,
        y: e.clientY - 200,
        duration: 1.2,
        ease: 'power3.out',
      })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full z-0"
      style={{
        background: 'radial-gradient(circle, rgba(59,171,53,0.07) 0%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  )
}

// ─── Kinetic Number Counter ────────────────────────────────────────────────
function KineticBadge({ index }) {
  const ref = useRef(null)
  const numRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!isInView || !numRef.current) return
    gsap.fromTo(
      numRef.current,
      { textContent: 0 },
      {
        textContent: index + 1,
        duration: 0.9,
        ease: 'power2.out',
        snap: { textContent: 1 },
        delay: index * 0.08,
      }
    )
  }, [isInView, index])

  return (
    <span ref={ref} className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3bab35]">
      <span className="flex items-center justify-center w-7 h-7 rounded-full border border-[#3bab35]/30 bg-[#e3f5e1] text-[#3bab35] font-bold text-[11px]">
        <span ref={numRef}>0</span>
      </span>
      Feature
    </span>
  )
}

// ─── GSAP Split Text Headline ─────────────────────────────────────────────
function SplitHeadline({ text, delay = 0, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isInView) {
        const split = new SplitText(ref.current, { type: 'words,chars' })
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 40, rotationX: -60, transformOrigin: '50% 50% -20px' },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.7,
            ease: 'silk',
            stagger: 0.022,
            delay,
          }
        )
      }
    }, ref)
    return () => ctx.revert()
  }, [isInView, delay])

  return (
    <h3 ref={ref} className={className} style={{ perspective: '600px' }}>
      {text}
    </h3>
  )
}

// ─── Feature Card (image side) ────────────────────────────────────────────
function FeatureImage({ src, alt, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isInView) {
        gsap.fromTo(
          ref.current,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0, scale: 1.08 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'silk',
            delay: index * 0.05,
          }
        )
      }
    }, ref)
    return () => ctx.revert()
  }, [isInView, index])

  // Subtle 3D tilt on hover
  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -10
    const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 10
    gsap.to(el, { rotationX: rx, rotationY: ry, duration: 0.4, ease: 'power2.out', transformPerspective: 800 })
  }
  const handleLeave = () => {
    gsap.to(ref.current, { rotationX: 0, rotationY: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-full max-w-[480px] mx-auto rounded-3xl overflow-hidden bg-[#f2faf2] cursor-pointer"
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      {/* Shimmer overlay on hover */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
      />

      <img
        src={src}
        alt={alt}
        className="w-full h-[260px] sm:h-[340px] object-contain transition-transform duration-500 hover:scale-[1.04]"
      />

      {/* Bottom gradient wash */}
      <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(242,250,242,0.9), transparent)' }} />
    </div>
  )
}

// ─── Decorative floating particles ────────────────────────────────────────
function FloatingParticles() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    const particles = ref.current.querySelectorAll('.particle')
    particles.forEach((p, i) => {
      gsap.to(p, {
        y: `${-20 - i * 8}px`,
        x: `${(i % 2 === 0 ? 1 : -1) * (8 + i * 3)}px`,
        rotation: 360,
        duration: 4 + i * 0.7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
      })
    })
  }, [])

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full bg-[#3bab35]/10"
          style={{
            width: `${6 + i * 3}px`,
            height: `${6 + i * 3}px`,
            top: `${10 + i * 14}%`,
            left: `${5 + i * 15}%`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Progress Line (scrolls alongside section) ────────────────────────────
function ScrollProgressLine({ totalFeatures }) {
  const ref = useRef(null)
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (ref.current && sectionRef.current) {
        gsap.fromTo(
          ref.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            },
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="absolute left-0 top-0 bottom-0 w-px hidden lg:block">
      <div className="absolute inset-0 bg-[#3bab35]/10 rounded-full" />
      <div
        ref={ref}
        className="absolute top-0 inset-x-0 bg-gradient-to-b from-[#3bab35] to-[#0f4f24] rounded-full origin-top"
        style={{ height: '100%' }}
      />
    </div>
  )
}

// ─── Feature Row ───────────────────────────────────────────────────────────
function FeatureRow({ feature, index }) {
  const isEven = index % 2 === 1
  const rowRef = useRef(null)
  const descRef = useRef(null)
  const isInView = useInView(rowRef, { once: true, margin: '-70px' })

  // GSAP paragraph reveal
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (descRef.current && isInView) {
        const split = new SplitText(descRef.current, { type: 'lines' })
        gsap.fromTo(
          split.lines,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'snap', delay: 0.3 + index * 0.03 }
        )
      }
    }, rowRef)
    return () => ctx.revert()
  }, [isInView, index])

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center relative`}
    >
      {/* Text column */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 + index * 0.04 }}
        className={`space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <KineticBadge index={index} />

        <SplitHeadline
          text={feature.title}
          delay={0.15}
          className="text-2xl sm:text-3xl font-bold text-[#0f4f24] leading-tight"
        />

        <p ref={descRef} className="text-[16px] text-slate-500 leading-[1.65]">
          {feature.description}
        </p>

        {/* Animated decorative line */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          className="w-14 h-[3px] rounded-full bg-gradient-to-r from-[#3bab35] to-[#0f4f24]"
        />

        {/* Hover-reveal CTA button */}
        {/* <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.75 }}
          whileHover={{ x: 6 }}
          className="group flex items-center gap-2 text-sm font-semibold text-[#3bab35] hover:text-[#0f4f24] transition-colors duration-300"
        >
          Learn more
          <motion.span
            className="inline-block"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            →
          </motion.span>
        </motion.button> */}
      </motion.div>

      {/* Image column */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 + index * 0.04 }}
        className={`${isEven ? 'lg:order-1' : 'lg:order-2'} flex justify-center`}
      >
        {/* Radial glow behind card */}
        <div className="relative w-full max-w-[480px] mx-auto">
          <div className="absolute inset-0 rounded-3xl bg-[#3bab35]/6 blur-3xl scale-95 -z-10 pointer-events-none" />
          <FeatureImage src={feature.image} alt={feature.title} index={index} />
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Header Headline (GSAP stagger) ───────────────────────────────────────
function HeroHeadline() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (ref.current) {
        const split = new SplitText(ref.current, { type: 'chars,words' })
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 60, skewY: 6, rotationX: -50, transformOrigin: '50% 100%' },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            rotationX: 0,
            duration: 0.85,
            ease: 'silk',
            stagger: 0.03,
            delay: 0.2,
          }
        )
      }
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <h1
      ref={ref}
      className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f4f24] mb-4 leading-[1.1] tracking-tight"
      style={{ perspective: '600px' }}
    >
      Powerful Features
    </h1>
  )
}

// ─── Tab Toggle ───────────────────────────────────────────────────────────
function TabToggle({ activeTab, setActiveTab }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      className="flex justify-center mb-14 sm:mb-20"
    >
      <div className="relative flex w-full max-w-xs bg-white rounded-full p-1 shadow-md border border-slate-200/80">
        {/* Animated pill */}
        <motion.div
          layout
          layoutId="pill"
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#0f4f24]"
          style={{ left: activeTab === 'clients' ? '4px' : 'calc(50%)' }}
        />

        {['clients', 'consultant'].map((tab) => (
          <MagneticPill
            key={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'clients' ? 'For Clients' : 'For Consultants'}
          </MagneticPill>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────
function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('clients')
  const features = activeTab === 'clients' ? clientFeatures : consultantFeatures
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22 })
  const listRef = useRef(null)

  // GSAP page-enter stagger on first load
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-header-badge',
        { opacity: 0, y: -16, letterSpacing: '0.5em' },
        { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 0.8, ease: 'silk', delay: 0.05 }
      )
      gsap.fromTo(
        '.gsap-header-sub',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'silk', delay: 0.45 }
      )
    })
    return () => ctx.revert()
  }, [])

  // Tab switch: ripple-out the old list
  const handleTabChange = (tab) => {
    if (tab === activeTab) return
    setActiveTab(tab)
  }

  return (
    <section className="relative min-h-screen bg-[#f7faf7] py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      {/* Global scroll progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3bab35] via-[#5bc455] to-[#0f4f24] origin-left z-50"
      />

      {/* Ambient cursor glow */}
      <CursorGlow />

      {/* Floating background particles */}
      <FloatingParticles />

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(#3bab35 1px, transparent 1px),
            linear-gradient(90deg, #3bab35 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">

        {/* ── Header ── */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="gsap-header-badge inline-block text-xs font-bold uppercase tracking-[0.35em] text-[#3bab35] mb-4">
            What we offer
          </span>

          <HeroHeadline />

          <p className="gsap-header-sub text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Discover everything designed to support your mental wellness journey — for clients and consultants alike.
          </p>

          {/* Decorative accent dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#3bab35]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: [0, 1, 0.4] }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* ── Tab Toggle ── */}
        <TabToggle activeTab={activeTab} setActiveTab={handleTabChange} />

        {/* ── Feature List ── */}
        <div ref={listRef} className="relative pl-0 lg:pl-8">
          <ScrollProgressLine totalFeatures={features.length} />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-24 sm:space-y-32"
            >
              {features.map((feature, index) => (
                <FeatureRow key={feature.title + index} feature={feature} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}

export default FeaturesPage