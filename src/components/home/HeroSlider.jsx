import { memo, useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import appStoreImg from '../../assets/app-store.png'
import googlePlayImg from '../../assets/google-play.png'
import mentalHealthImg from '../../assets/Mental-Health-Psychiatrist.jpg'
import nutritionImg from '../../assets/Nutrition.jpg'
import dietitianImg from '../../assets/Dietitian.jpg'
import healthImg from '../../assets/Health.jpg'
import { gsap } from '../../lib/gsap'

// Slide data
const slides = [
  {
    badge: 'Balanced Living',
    headline: ['A softer path', 'back to emotional', 'balance'],
    italicLine: 2, 
    description:
      'Soul Whispers focuses on creating mental wellness support services that feel reassuring rather than overwhelming, so you can reconnect with yourself, rebuild balance, and move ahead with a quieter, more confident mind. ',
    image: mentalHealthImg,
    stats: [
      { value: '24/7', label: 'AI-guided check-ins' },
      { value: '98%', label: 'Satisfaction rate' },
      { value: '2.4k+', label: 'Lives touched' },
    ],
    cardQuote: 'Here, every interaction is softer and more intentional, giving you room to slow down, reflect, and move forward with clarity. Through tailored approaches and personalized therapy recommendations, you’re guided toward what truly works for you, not just what’s standard. ',
    tags: ['Therapist support', 'Private & intentional', '24/7 care service'],
    accent: 'from-[#0a2e12] via-[#1a5c2a] to-[#3bab35]',
  },
  {
    badge: 'Mindful Nourishment',
    headline: ['Care that supports', 'both mind', 'and body'],
    italicLine: 2,
    description:
      'Take a step toward feeling more in control by exploring nutrition, daily habits, and simple reflective practices that ease overwhelm and bring more clarity into your day. With access to nutrition counselling online, you can better understand how what you eat connects with how you feel both mentally and physically.',
    image: nutritionImg,
    stats: [
      { value: '150+', label: 'Wellness routines' },
      { value: 'Daily', label: 'Gentle reminders' },
      { value: '100%', label: 'Evidence-aware' },
    ],
    cardQuote: 'Guided by a dietitian for mental health, the focus goes beyond basic meal plans. It’s about creating supportive routines that nourish your mind, stabilize energy, and help you feel more grounded in everyday life. Through an online diet consultation, you receive practical, realistic guidance that fits naturally into your lifestyle. ',
    tags: ['Personalized routines', 'Gentle reminders', 'Evidence-aware'],
    accent: 'from-[#0f2e1a] via-[#1e6b32] to-[#3bab35]',
  },
  {
    badge: 'Personal Guidance',
    headline: ['Gentle,', 'personalized support for', 'every soul'],
    italicLine: 1,
    description:
      'From your first online mental health assessment or wellness assessment online, each step is created to feel calm, clear, and supportive, especially when things feel heavy or uncertain. Every interaction is paced gently, so you can move through it without pressure and feel safe opening up at your own comfort level.',
    image: dietitianImg,
    stats: [
      { value: '∞', label: 'Tailored insights' },
      { value: 'Smart', label: 'Progress tracking' },
      { value: 'Mindful', label: 'Care plans' },
    ],
    cardQuote: 'With personalized therapy recommendations and online personal health coaching, you receive insights that truly reflect your experiences. Thoughtfully designed care plans are shaped around your emotional needs, helping you move forward with steadiness, clarity, and a sense of quiet reassurance.',
    tags: ['Tailored insights', 'Progress tracking', 'Mindful plans'],
    accent: 'from-[#0a2b2e] via-[#0f5c5a] to-[#1faba5]',
  },
  {
    badge: 'Daily Restoration',
    headline: ['Build restorative', 'habits that', 'actually last'],
    italicLine: 2,
    description:
      'Create a rhythm of reflection, action, and support with tools that make emotional well-being feel approachable and sustainable.',
    image: healthImg,
    stats: [
      { value: '3min', label: 'Breathing moments' },
      { value: 'Small', label: 'Daily steps' },
      { value: 'Free', label: 'Accessible anywhere' },
    ],
    cardQuote: 'Breathing moments, small daily steps, gentle mindful pauses, and accessible care anywhere you are.',
    tags: ['Breathing exercises', 'Small steps', 'Accessible anywhere'],
    accent: 'from-[#1e1a0a] via-[#5c4f0f] to-[#ab8e1f]',
  },
]

// Easing presets
const ease = {
  out: [0.16, 1, 0.3, 1],
  in: [0.7, 0, 0.84, 0],
  inOut: [0.76, 0, 0.24, 1],
}

// Sub-components

function BreathingOrb({ className, duration = 8, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ scale: [1, 1.22, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function FloatLayer({ className, xRange = 12, yRange = 18, duration = 7, delay = 0 }) {
  return (
    <motion.div
      className={className}
      animate={{ x: [0, xRange, 0], y: [0, -yRange, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: 1 + Math.random() * 1.5,
  duration: 8 + Math.random() * 6,
  delay: Math.random() * 5,
}))

const ParticleField = memo(function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#7dd87a]/60 will-change-transform"
          style={{ left: p.left, bottom: -8, width: p.size, height: p.size }}
          animate={{ y: ['0vh', '-110vh'], opacity: [0, 0.8, 0.6, 0] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
})

function ScanLine() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 z-[6] h-px bg-gradient-to-r from-transparent via-[#3bab35]/40 to-transparent"
      animate={{ top: ['0%', '100%', '0%'] }}
      transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
    />
  )
}

// Magnetic button hook
function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18 })
  const springY = useSpring(y, { stiffness: 180, damping: 18 })

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }, [x, y, strength])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return { ref, springX, springY, handleMouseMove, handleMouseLeave }
}

// Headline with per-word reveal──
function AnimatedHeadline({ lines, italicLine, key: slideKey }) {
  const wordVariants = {
    hidden: { opacity: 0, y: '115%', rotateX: -70 },
    visible: (i) => ({
      opacity: 1,
      y: '0%',
      rotateX: 0,
      transition: { duration: 0.72, delay: i * 0.055, ease: ease.out },
    }),
  }

  let wordIndex = 0
  return (
    <div className="overflow-hidden">
      {lines.map((line, li) => (
        <div key={li} className="overflow-hidden leading-[1.06]">
          <div className="flex flex-wrap gap-x-[0.28em]">
            {line.split(' ').map((word) => {
              const idx = wordIndex++
              return (
                <div key={`${slideKey}-${li}-${idx}`} className="overflow-hidden">
                  <motion.span
                    className={`inline-block will-change-transform font-semibold tracking-[-0.03em] text-white
                      ${li === italicLine ? 'bold text-[#7dd87a]' : ''}
                      text-5xl sm:text-5xl lg:text-[4.2rem]`}
                    style={{ display: 'inline-block', transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
                    custom={idx}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {word}
                  </motion.span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// Circular progress ring
function ProgressRing({ progressValue, size = 48, stroke = 1.5 }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = useTransform(progressValue, (progress) => circ - (progress / 100) * circ)

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke="#3bab35"
        strokeWidth={stroke}
        strokeDasharray={circ}
        style={{ strokeDashoffset: offset }}
        strokeLinecap="round"
      />
    </svg>
  )
}

// Main component
function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [direction, setDirection] = useState(1)

  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const backgroundRef = useRef(null)
  const contentRef = useRef(null)
  const progressTweenRef = useRef(null)
  const progressValue = useMotionValue(0)
  const DURATION = 7000

  const isEffectivelyPaused = isPaused || !isVisible

  const slide = slides[activeIndex]

  // ── Magnetic CTA─
  const mag = useMagnetic(0.45)

  // ── Progress tick─
  useEffect(() => {
    progressTweenRef.current?.kill();

    if (isEffectivelyPaused) {
      return undefined;
    }

    progressValue.set(0);
    const progressState = { value: 0 };
    progressTweenRef.current = gsap.to(progressState, {
      value: 100,
      duration: DURATION / 1000,
      ease: 'none',
      onUpdate: () => progressValue.set(progressState.value),
    });

    return () => progressTweenRef.current?.kill();
  }, [activeIndex, isEffectivelyPaused])

  // ── Auto advance──
  useEffect(() => {
    if (isEffectivelyPaused) return
    const timer = setTimeout(() => {
      goTo((activeIndex + 1) % slides.length, 1)
    }, DURATION)
    return () => clearTimeout(timer)
  }, [activeIndex, isEffectivelyPaused])

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // ── GSAP entrance + parallax──
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    if (!section || !background) return;

    const ctx = gsap.context(() => {
      // Background Parallax using ScrollTrigger (much smoother than raw scroll events)
      gsap.fromTo(background,
        { scale: 1.18 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5, // Reduced from true to 0.5 for smoother interaction
          },
        }
      );

      // Simple animation for floaters
      const floaters = section.querySelectorAll('[data-gsap-float]');
      floaters.forEach((el, i) => {
        gsap.to(el, {
          y: -20,
          duration: 2 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.2
        });
      });
    }, section);

    return () => ctx.revert();
  }, [activeIndex]);

  // ── Navigation─
  const goTo = useCallback((idx, dir = 1) => {
    if (idx === activeIndex) return
    setDirection(dir)
    setActiveIndex(idx)
    progressValue.set(0)
  }, [activeIndex])

  const handlePrev = () => goTo(activeIndex === 0 ? slides.length - 1 : activeIndex - 1, -1)
  const handleNext = () => goTo((activeIndex + 1) % slides.length, 1)

  // ── Slide animation variants
  const bgVariants = {
    enter: (d) => ({ opacity: 0, scale: 1.08, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, scale: 1, x: 0, transition: { duration: 1.4, ease: ease.out } },
    exit: (d) => ({ opacity: 0, scale: 0.96, x: d > 0 ? -40 : 40, transition: { duration: 1.1, ease: ease.in } }),
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: ease.out, delay: 0.18 } },
    exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.4, ease: ease.in } },
  }

  return (
    <section
      ref={sectionRef}
      className="section-space relative overflow-hidden px-4 pb-0 pt-6 sm:px-6 lg:px-8 selection:bg-[#3bab35] selection:text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <div className="scene-panel relative isolate overflow-hidden rounded-[36px] border border-white/20 lg:min-h-[88vh]">

          {/* ── Background image layer ── */}
          <AnimatePresence custom={direction} mode="sync">
            <motion.div
              key={`bg-${activeIndex}`}
              custom={direction}
              variants={bgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 z-[0]"
            >
              <div
                ref={backgroundRef}
                className="absolute inset-[-5%] scale-105 bg-cover bg-center will-change-transform"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </motion.div>
          </AnimatePresence>

          {/* ── Gradient overlays ── */}
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_50%)]" />
          <div className="absolute inset-0 z-[1] bg-[linear-gradient(105deg,rgba(15,79,36,0.55)_0%,rgba(15,79,36,0.35)_30%,rgba(15,79,36,0.15)_58%,transparent_95%)]" />
          <div className="absolute inset-0 z-[1] bg-[linear-gradient(to_top,rgba(15,79,36,0.45)_0%,transparent_40%)]" />
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_75%_50%,transparent_40%,rgba(15,79,36,0.15)_100%)]" />

          {/* ── Atmospheric orbs ── */}
          <BreathingOrb className="absolute left-[6%] top-[10%] z-[2] h-[420px] w-[420px] rounded-full bg-[#3bab35]/14 blur-[100px]" duration={9} />
          <BreathingOrb className="absolute right-[10%] top-[15%] z-[2] h-[360px] w-[360px] rounded-full bg-white/5 blur-[80px]" duration={12} delay={1.5} />
          <BreathingOrb className="absolute bottom-[5%] right-[25%] z-[2] h-[280px] w-[280px] rounded-full bg-[#3bab35]/10 blur-[70px]" duration={10} delay={3} />

          {/* ── Noise grain ── */}
          <div className="pointer-events-none absolute inset-0 z-[2] opacity-[0.032] mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
          />

          {/* ── Scan line ── */}
          <ScanLine />

          {/* ── Particles ── */}
          <ParticleField />

          {/* ── Floating geometry ── */}
          <div data-gsap-float className="absolute left-[3%] top-[22%] z-[3] hidden h-28 w-28 rounded-full border border-white/12 bg-white/6 backdrop-blur-2xl lg:block" />
          <div data-gsap-float className="absolute bottom-[16%] left-[46%] z-[3] hidden h-16 w-16 rounded-full border border-[#3bab35]/22 bg-[#3bab35]/10 backdrop-blur-2xl lg:block" />
          <div data-gsap-float className="absolute right-[9%] top-[24%] z-[3] hidden h-24 w-24 rounded-[28px] border border-white/10 bg-white/6 backdrop-blur-2xl lg:block" />
          <div data-gsap-float className="absolute right-[22%] bottom-[22%] z-[3] hidden h-12 w-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl lg:block" />

          {/* ── Vertical accent line ── */}
          <motion.div
            className="absolute left-[4.5rem] top-1/2 z-[4] hidden w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-[#3bab35]/45 to-transparent lg:block"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 200 }}
            transition={{ duration: 0.8, ease: ease.out, delay: 0.3 }}
          />

          {/* ── Main content ── */}
          <div
            ref={contentRef}
            className="relative z-[10] grid gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:px-14 lg:py-20"
          >
            {/* ── LEFT COLUMN ── */}
            <div className="max-w-3xl">

              {/* Badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`badge-${activeIndex}`}
                  data-gsap-lead
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.5, ease: ease.out }}
                  className="mt-2 inline-flex items-center gap-2.5 rounded-full border border-[#3bab35]/35 bg-[#3bab35]/12 px-4 py-2"
                >
                  <motion.span
                    className="h-2 w-2 rounded-full bg-[#7dd87a]"
                    animate={{ scale: [1, 0.6, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-[#7dd87a]">
                    {slide.badge}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Headline */}
              <div className="mt-7 font-['Cormorant_Garamond',serif] [perspective:900px]">
                <AnimatePresence mode="wait">
                  <AnimatedHeadline
                    key={`hl-${activeIndex}`}
                    italicLine={slide.italicLine}
                    lines={slide.headline}
                  />
                </AnimatePresence>
              </div>

              {/* Description */}
              <p
                key={`desc-${activeIndex}`}
                data-gsap-lead
                className="mt-7 max-w-xl text-base leading-[1.8] text-white/70 sm:text-[1.05rem]"
              >
                {slide.description}
              </p>

              {/* CTA buttons */}
              <div
                data-gsap-lead
                className="mt-9 flex flex-col gap-4 sm:flex-row"
              >
                {/* Primary CTA — magnetic */}
                <motion.button
                  ref={mag.ref}
                  onMouseMove={mag.handleMouseMove}
                  onMouseLeave={mag.handleMouseLeave}
                  style={{ x: mag.springX, y: mag.springY }}
                  onClick={() => navigate('/contact')}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.28, ease: ease.out }}
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#0a2e12] shadow-[0_20px_50px_rgba(255,255,255,0.18)]"
                >
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#7dd87a]"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: ease.out }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  />
                  <span className="relative z-10">Book a Session</span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <ArrowRight size={15} />
                  </motion.span>
                </motion.button>

                {/* Ghost CTA */}
                <motion.a
                  href="#wellness-journey"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.14)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.28 }}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/8 px-8 py-4 text-sm font-semibold text-white backdrop-blur-2xl"
                >
                  Explore the Journey
                </motion.a>
              </div>

              {/* Stats */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`stats-${activeIndex}`}
                  className="mt-11 flex gap-0"
                >
                  {slide.stats.map((s, i) => (
                    <motion.div
                      key={s.label}
                      data-gsap-stat
                      initial={{ opacity: 0, y: 18, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.5, ease: ease.out, delay: 0.44 + i * 0.08 }}
                      className={`flex-1 py-1 ${i !== 0 ? 'border-l border-white/12 pl-5' : ''}`}
                    >
                      <p className="font-['Cormorant_Garamond',serif] text-3xl font-light leading-none text-white">
                        {s.value}
                      </p>
                      <p className="mt-1.5 text-[0.68rem] font-medium uppercase tracking-[0.1em] text-white/50">
                        {s.label}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="flex flex-col gap-6 lg:items-end">

              {/* Glass card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`card-${activeIndex}`}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full max-w-sm rounded-[28px] border border-white/14 bg-white/10 p-6 shadow-[0_30px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl will-change-transform"
                >
                  {/* Card header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/55">
                      Daily Rhythm
                    </span>
                    <span className="font-['Cormorant_Garamond',serif] text-sm font-light tracking-wider text-white/45">
                      {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Divider */}
                  <motion.div
                    className="mt-4 h-px bg-gradient-to-r from-[#3bab35]/50 via-white/20 to-transparent"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, ease: ease.out, delay: 0.3 }}
                  />

                  {/* Quote */}
                  <p className="mt-5 font-['Cormorant_Garamond',serif] text-lg font-light leading-[1.48] text-white/85 sm:text-xl">
                    {slide.cardQuote}
                  </p>

                  {/* Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {slide.tags.map((tag, i) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.38, ease: ease.out, delay: 0.35 + i * 0.07 }}
                        className="rounded-full border border-[#3bab35]/28 bg-[#3bab35]/12 px-3 py-1 text-[0.68rem] font-medium tracking-wide text-white/90"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Store buttons */}
                  <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                    <motion.a
                      href="https://apps.apple.com/pk/app/soul-whispers/id6514315560"
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.25 }}
                    >
                      <img src={appStoreImg} alt="App Store" className="h-9" />
                    </motion.a>
                    <motion.a
                      href="https://play.google.com/store/apps/details?id=com.innovadorsolutions.soulwispers"
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.25 }}
                    >
                      <img src={googlePlayImg} alt="Google Play" className="h-9" />
                    </motion.a>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Arrow controls */}
              <div className="flex items-center gap-3 self-start lg:self-auto">
                <motion.button
                  onClick={handlePrev}
                  whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.18)' }}
                  whileTap={{ scale: 0.93 }}
                  transition={{ duration: 0.22 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white backdrop-blur-xl"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </motion.button>

                {/* Play/Pause with ring */}
                <button
                  onClick={() => setIsPaused((p) => !p)}
                  className="relative flex h-12 w-12 items-center justify-center text-white"
                  aria-label={isPaused ? 'Play' : 'Pause'}
                >
                  <span className="absolute inset-0">
                    <ProgressRing progressValue={progressValue} size={48} stroke={1.5} />
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isPaused ? 'play' : 'pause'}
                      initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
                      transition={{ duration: 0.25 }}
                    >
                      {isPaused ? <Play size={14} /> : <Pause size={14} />}
                    </motion.span>
                  </AnimatePresence>
                </button>

                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.18)' }}
                  whileTap={{ scale: 0.93 }}
                  transition={{ duration: 0.22 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white backdrop-blur-xl"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* ── Bottom indicator bar ── */}
          <div className="relative z-[10] mx-6 mb-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-5 sm:mx-10 lg:mx-14">
            {/* Slide pills */}
            <div className="flex flex-wrap gap-2.5">
              {slides.map((s, i) => (
                <motion.button
                  key={s.badge}
                  onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center gap-3 rounded-full px-3.5 py-2 text-left transition-colors duration-300 ${i === activeIndex ? 'bg-white/12 text-white' : 'text-white/50 hover:bg-white/8'
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <motion.span
                    className="block h-[3px] rounded-full bg-white"
                    animate={{ width: i === activeIndex ? 36 : 8, opacity: i === activeIndex ? 1 : 0.4 }}
                    transition={{ duration: 0.45, ease: ease.out }}
                  />
                  <span className="text-[0.72rem] font-medium tracking-wide">{s.badge}</span>
                </motion.button>
              ))}
            </div>

            {/* Slide counter */}
            <div className="flex items-baseline gap-1.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-['Cormorant_Garamond',serif] text-2xl font-light text-white"
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              <span className="font-['Cormorant_Garamond',serif] text-sm text-white/30">
                / {String(slides.length).padStart(2, '0')}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSlider
