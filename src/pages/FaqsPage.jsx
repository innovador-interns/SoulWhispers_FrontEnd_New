import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useInView } from 'framer-motion'
import { Brain, CalendarDays, ChevronDown, Rocket, ShieldCheck, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)
CustomEase.create('silk', 'M0,0 C0.25,0 0.1,1 1,1')
CustomEase.create('snap', 'M0,0 C0.6,0 0.4,1 1,1')

const faqs = [
  {
    question: 'How does the app help with mental wellness?',
    answer: 'Our digital mental wellness platform provides personalized assessments, structured goal setting, and connects you with certified therapists to deliver tailored mental wellness support services and practical mental wellness tips. ',
    icon: Brain,
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Yes, we use industry-standard encryption and comply with privacy regulations to ensure your personal information remains confidential.',
    icon: ShieldCheck,
  },
  {
    question: 'Can I access therapy sessions anytime?',
    answer: 'Our mental health appointment booking app offers flexible scheduling, with therapists available across multiple time slots to support your needs through online appointment booking for therapy and easy online mental health assessment from virtually anywhere, anytime. ',
    icon: CalendarDays,
  },
  {
    question: 'What makes Soul Whispers different from other apps?',
    answer: 'We prioritize culturally sensitive care by blending AI-driven insights with genuine human connection, creating a holistic experience through our digital mental health app. With Soul Whispers, you can access on-demand therapy anytime and anywhere, making online therapy simple and effective while enjoying teletherapy benefits and affordable therapy online for anxiety, mental wellness, depression, relationship counselling, and a wide range of other support services. ',
    icon: Sparkles,
  },
  {
    question: 'How do I get started?',
    answer: 'Simply download the app, create your profile, complete the initial assessment, and start your personalized wellness journey.',
    icon: Rocket,
  },
];

// Cursor Glow
function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const move = (e) => {
      if (!ref.current) return
      gsap.to(ref.current, { x: e.clientX - 220, y: e.clientY - 220, duration: 1.4, ease: 'power3.out' })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <div ref={ref} className="pointer-events-none fixed top-0 left-0 w-[440px] h-[440px] rounded-full z-0"
      style={{ background: 'radial-gradient(circle, rgba(59,171,53,0.07) 0%, transparent 70%)', willChange: 'transform' }} />
  )
}

// Floating Orbs──
function FloatingOrbs() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    ref.current.querySelectorAll('.orb').forEach((el, i) => {
      gsap.to(el, {
        y: `${-28 - i * 10}px`, x: `${(i % 2 === 0 ? 1 : -1) * (10 + i * 5)}px`,
        duration: 5 + i * 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.6,
      })
    })
  }, [])
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {[
        { w: 300, h: 300, top: '-6%', right: '-6%', opacity: 0.05 },
        { w: 180, h: 180, bottom: '8%', left: '-4%', opacity: 0.04 },
        { w: 100, h: 100, top: '40%', right: '3%', opacity: 0.04 },
      ].map((s, i) => (
        <div key={i} className="orb absolute rounded-full bg-[#3bab35]"
          style={{ width: s.w, height: s.h, top: s.top, left: s.left, right: s.right, bottom: s.bottom, opacity: s.opacity }} />
      ))}
    </div>
  )
}

// GSAP Split Headline──
function SplitHeadline({ text, className, delay = 0, immediate = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const shouldAnimate = immediate || isInView

  useLayoutEffect(() => {
    if (!ref.current || !shouldAnimate) return
    gsap.set(ref.current, { opacity: 1 })
    const split = new SplitText(ref.current, { type: 'chars,words' })
    gsap.fromTo(split.chars,
      { opacity: 0, y: 50, rotationX: -55, transformOrigin: '50% 100%' },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'silk', stagger: 0.025, delay }
    )
    return () => split.revert()
  }, [shouldAnimate, delay])
  return <h1 ref={ref} className={className} style={{ opacity: 0, perspective: '600px' }}>{text}</h1>
}

// Number counter badge─
function IndexBadge({ index, isOpen }) {
  return (
    <motion.span
      animate={{ backgroundColor: isOpen ? '#0f4f24' : '#e3f5e1', color: isOpen ? '#fff' : '#3bab35', scale: isOpen ? 1.12 : 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-xs font-black"
    >
      {String(index + 1).padStart(2, '0')}
    </motion.span>
  )
}

// FAQ Item─
function FaqItem({ faq, index, isOpen, onToggle }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const ansRef = useRef(null);
  const MotionIcon = motion(faq.icon);

  // Entry animation
  useLayoutEffect(() => {
    if (!ref.current || !isInView) return
    gsap.fromTo(ref.current,
      { opacity: 0, x: -36, scale: 0.97 },
      { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'silk', delay: index * 0.09 }
    )
  }, [isInView])

  // Answer text split on open
  useLayoutEffect(() => {
    if (!ansRef.current || !isOpen) return
    const split = new SplitText(ansRef.current, { type: 'lines' })
    gsap.fromTo(split.lines,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, ease: 'snap', delay: 0.12 }
    )
    return () => split.revert()
  }, [isOpen])

  // 3D tilt
  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -4
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 4
    gsap.to(el, { rotationX: rx, rotationY: ry, duration: 0.4, ease: 'power2.out', transformPerspective: 900 })
  }
  const handleLeave = () => gsap.to(ref.current, { rotationX: 0, rotationY: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' })

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ opacity: 0, willChange: 'transform', transformStyle: 'preserve-3d' }}
      className="rounded-2xl overflow-hidden"
    >
      <motion.div
        animate={{
          borderColor: isOpen ? 'rgba(59,171,53,0.35)' : 'rgba(226,232,240,0.8)',
          boxShadow: isOpen
            ? '0 16px 48px rgba(15,79,36,0.10), 0 2px 8px rgba(59,171,53,0.06)'
            : '0 2px 12px rgba(0,0,0,0.04)',
          backgroundColor: isOpen ? '#fff' : '#fff',
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border overflow-hidden"
      >
        {/* Question row */}
        <button
          onClick={onToggle}
          className="w-full px-6 py-5 text-left flex items-center gap-4 group"
        >
          <IndexBadge index={index} isOpen={isOpen} />

          {/* Icon */}
          <MotionIcon
            animate={{ scale: isOpen ? 1.2 : 1, rotate: isOpen ? 8 : 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-5 h-5 flex-shrink-0 text-[#3bab35]"
          />

          <span className={`flex-1 text-[15.5px] font-semibold leading-snug pr-2 transition-colors duration-300 ${isOpen ? 'text-[#0f4f24]' : 'text-slate-800 group-hover:text-[#0f4f24]'}`}>
            {faq.question}
          </span>

          {/* Chevron with animated ring */}
          <motion.div
            animate={{
              rotate: isOpen ? 180 : 0,
              backgroundColor: isOpen ? '#0f4f24' : '#f1f5f9',
              color: isOpen ? '#fff' : '#64748b',
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.42, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 } }}
              className="overflow-hidden"
            >
              {/* Green top border accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mx-6 h-px bg-gradient-to-r from-[#3bab35]/60 to-transparent origin-left"
              />

              <div className="px-6 pb-6 pt-4 flex gap-4">
                <div className="w-px self-stretch bg-[#3bab35]/15 ml-[15px] flex-shrink-0" />
                <p
                  ref={ansRef}
                  className="text-slate-500 text-sm sm:text-[15px] leading-[1.75] pl-4"
                >
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

// Main Page─
function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22 })
  const navigate = useNavigate()

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    if (document.documentElement) document.documentElement.scrollTop = 0
    if (document.body) document.body.scrollTop = 0
    
    const t = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
    return () => clearTimeout(t)
  }, [])

  useLayoutEffect(() => {
    gsap.fromTo('.faq-badge',
      { opacity: 0, y: -14, letterSpacing: '0.5em' },
      { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 0.9, ease: 'silk', delay: 0.05 }
    )
    gsap.fromTo('.faq-sub',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'silk', delay: 0.55 }
    )
  }, [])

  return (
    <section className="relative min-h-screen bg-[#f7faf7] py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">

      {/* Scroll progress bar */}
      <motion.div style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#3bab35] via-[#5bc455] to-[#0f4f24] origin-left z-50" />

      <CursorGlow />
      <FloatingOrbs />

      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'linear-gradient(#3bab35 1px, transparent 1px), linear-gradient(90deg, #3bab35 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }} />

      <div className="container mx-auto max-w-3xl relative z-10">

        {/* Header */}
        <div className="text-center mb-14 sm:mb-18">
          <span className="faq-badge opacity-0 inline-block text-xs font-bold uppercase tracking-[0.35em] text-[#3bab35] mb-4">
            Got Questions?
          </span>

          <SplitHeadline
            text="Frequently Asked"
            immediate={true}
            delay={0.18}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f4f24] leading-[1.1] tracking-tight"
          />

          <p className="faq-sub opacity-0 mt-4 text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Find answers to common questions about our mental wellness platform and how it can support your journey.
          </p>

          {/* Accent dots */}
          <div className="flex justify-center gap-2 mt-5">
            {[...Array(3)].map((_, i) => (
              <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#3bab35]"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: [0, 1, 0.4] }}
                transition={{ duration: 0.4, delay: 0.75 + i * 0.1 }} />
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 text-center"
        >
          <p className="text-slate-400 text-xs tracking-widest uppercase font-bold mb-4">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(59,171,53,0.22)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="px-8 py-3.5 rounded-full bg-[#0f4f24] text-white text-sm font-bold tracking-wide shadow-lg shadow-[#3bab35]/15"
            onClick={() => navigate('/contact/')}
          >
            Contact our team →
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}

export default FaqsPage