import { useRef, useLayoutEffect, useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useInView } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import contactImage from '../assets/contactus2.jpg'
import { toast } from 'sonner'
import { sendContactMessage } from '../services/contact.service'
import { Mail, Phone, MapPin, Send, User, MessageSquare } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)
CustomEase.create('silk', 'M0,0 C0.25,0 0.1,1 1,1')
CustomEase.create('snap', 'M0,0 C0.6,0 0.4,1 1,1')

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'At least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9+\-\s()]+$/, 'Invalid phone number').optional(),
  message: Yup.string().min(10, 'At least 10 characters').required('Message is required'),
})

const contactInfo = [
  { icon: Mail, label: 'Email us', value: 'info@soulwhispers.live' },
  { icon: Phone, label: 'Call us', value: '+92 300 123 4567' },
  { icon: MapPin, label: 'Visit us', value: 'Karachi, Pakistan' },
]

// Cursor Glow─
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
        { w: 320, h: 320, top: '-6%', right: '-6%', opacity: 0.04 },
        { w: 180, h: 180, bottom: '6%', left: '-4%', opacity: 0.04 },
        { w: 110, h: 110, top: '45%', right: '2%', opacity: 0.035 },
      ].map((s, i) => (
        <div key={i} className="orb absolute rounded-full bg-[#3bab35]"
          style={{ width: s.w, height: s.h, top: s.top, left: s.left, right: s.right, bottom: s.bottom, opacity: s.opacity }} />
      ))}
    </div>
  )
}

// GSAP Split Headline
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

// Animated Input Field
function AnimatedField({ name, label, icon: Icon, type = 'text', as, rows, placeholder, delay = 0 }) {
  const [focused, setFocused] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  useLayoutEffect(() => {
    if (!ref.current || !isInView) return
    gsap.fromTo(ref.current,
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 0.65, ease: 'silk', delay }
    )
  }, [isInView])

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
        {label}
      </label>
      <motion.div
        animate={{
          boxShadow: focused
            ? '0 0 0 3px rgba(59,171,53,0.18), 0 8px 24px rgba(15,79,36,0.08)'
            : '0 2px 8px rgba(0,0,0,0.04)',
          borderColor: focused ? '#3bab35' : '#e2e8f0',
        }}
        transition={{ duration: 0.3 }}
        className="relative flex items-start gap-3 bg-white border rounded-xl px-4 py-3"
      >
        <motion.div
          animate={{ color: focused ? '#3bab35' : '#94a3b8', y: as === 'textarea' ? 2 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 mt-0.5"
        >
          <Icon size={15} />
        </motion.div>

        <Field
          as={as}
          type={type}
          name={name}
          rows={rows}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`flex-1 text-sm text-slate-800 placeholder:text-slate-400 bg-transparent outline-none resize-none leading-relaxed ${as === 'textarea' ? 'min-h-[100px]' : ''}`}
        />

        {/* Active left accent bar */}
        <motion.div
          animate={{ scaleY: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#3bab35] rounded-full origin-top"
        />
      </motion.div>

      <AnimatePresence>
        <ErrorMessage name={name}>
          {(msg) => (
            <motion.p
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              transition={{ duration: 0.25 }}
              className="text-red-400 text-xs mt-1.5 font-medium pl-1"
            >
              {msg}
            </motion.p>
          )}
        </ErrorMessage>
      </AnimatePresence>
    </div>
  )
}

// Contact Info Pill─
function InfoPill({ icon: Icon, label, value, index }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 280, damping: 22 })
  const sy = useSpring(y, { stiffness: 280, damping: 22 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, opacity: 0 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ boxShadow: '0 12px 40px rgba(15,79,36,0.10)' }}
      className="flex items-start gap-3 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-xl px-4 py-3 cursor-default"
    >
      <div className="w-9 h-9 rounded-full bg-[#e3f5e1] flex items-center justify-center flex-shrink-0">
        <Icon size={15} className="text-[#3bab35]" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 break-words">{label}</p>
        <p className="text-sm font-semibold text-slate-700 break-words leading-snug">{value}</p>
      </div>
    </motion.div>
  )
}

// Contact Image (with parallax + tilt)
function ContactImage({ src }) {
  const wrapRef = useRef(null)
  const imgRef = useRef(null)
  const isInView = useInView(wrapRef, { once: true, margin: '-80px' })

  // Clip-path reveal
  useLayoutEffect(() => {
    if (!wrapRef.current) return
    gsap.fromTo(wrapRef.current,
      { clipPath: 'inset(10% 5% 10% 5% round 24px)', opacity: 0, scale: 0.97 },
      { clipPath: 'inset(0% 0% 0% 0% round 24px)', opacity: 1, scale: 1, duration: 1.2, ease: 'silk', delay: 0.2 }
    )
  }, [])

  // Scroll parallax
  useLayoutEffect(() => {
    if (!imgRef.current) return
    gsap.to(imgRef.current, {
      y: 55, ease: 'none',
      scrollTrigger: { trigger: imgRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  // 3D tilt
  const handleMove = (e) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -7
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 7
    gsap.to(el, { rotationX: rx, rotationY: ry, duration: 0.5, ease: 'power2.out', transformPerspective: 900 })
  }
  const handleLeave = () => gsap.to(wrapRef.current, { rotationX: 0, rotationY: 0, duration: 0.9, ease: 'elastic.out(1,0.5)' })

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative overflow-hidden rounded-3xl h-full min-h-[480px] sm:min-h-[560px]"
      style={{ willChange: 'transform', transformStyle: 'preserve-3d' }}
    >
      <img ref={imgRef} src={src} alt="Contact Us"
        className="w-full h-[115%] object-cover absolute inset-0"
      />
      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f4f24]/70 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f4f24]/30 to-transparent" />

      {/* Shimmer */}
      <motion.div
        initial={{ x: '-120%', opacity: 0 }}
        animate={{ x: '200%', opacity: [0, 0.5, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut', delay: 1.5 }}
        className="absolute inset-0 w-1/3 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)', skewX: '-15deg' }}
      />

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-white/90 text-lg sm:text-xl font-bold leading-snug"
        >
          "Your wellness journey starts with a single message."
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 w-12 h-[3px] bg-[#3bab35] rounded-full origin-left"
        />
      </div>
    </div>
  )
}

// Submit Button──
function SubmitButton({ isSubmitting }) {
  return (
    <motion.button
      type="submit"
      disabled={isSubmitting}
      whileHover={!isSubmitting ? { scale: 1.03, boxShadow: '0 20px 60px rgba(59,171,53,0.30)' } : {}}
      whileTap={!isSubmitting ? { scale: 0.97 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="relative w-full overflow-hidden bg-[#0f4f24] text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-[#3bab35]/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {/* Shimmer on hover */}
      <motion.div
        initial={{ x: '-100%' }}
        whileHover={{ x: '200%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="absolute inset-0 w-1/2"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)', skewX: '-20deg' }}
      />

      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            Sending…
          </motion.div>
        ) : (
          <motion.div
            key="send"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-2"
          >
            Send Message
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Send size={14} />
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// Main Page
function ContactPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22 })
  const formRef = useRef(null)
  const isFormInView = useInView(formRef, { once: true, margin: '-60px' })


  useLayoutEffect(() => {
    gsap.fromTo('.contact-badge',
      { opacity: 0, y: -14, letterSpacing: '0.5em' },
      { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 0.9, ease: 'silk', delay: 0.05 }
    )
    gsap.fromTo('.contact-sub',
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'silk', delay: 0.55 }
    )
  }, [])

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await sendContactMessage(values)
      toast?.success?.('Your message has been sent successfully!')
      resetForm()
    } catch {
      toast?.error?.('Failed to send message. Please try again later.')
    } finally {
      setSubmitting(false)
    }
  }

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

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-14 sm:mb-18">
          <span className="contact-badge opacity-0 inline-block text-xs font-bold uppercase tracking-[0.35em] text-[#3bab35] mb-4">
            Get In Touch
          </span>

          <SplitHeadline
            text="Contact Us"
            immediate={true}
            delay={0.18}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f4f24] leading-[1.1] tracking-tight"
          />

          <p className="contact-sub opacity-0 mt-4 text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            Get in touch with our team. We're here to help you on your wellness journey.
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

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── Left: Form card ── */}
          <motion.div 
            ref={formRef}
            initial={{ opacity: 0, x: -50, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 p-7 sm:p-9"
          >
            {/* Form header */}
            <div className="mb-8">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isFormInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="w-10 h-[3px] bg-gradient-to-r from-[#3bab35] to-[#0f4f24] rounded-full origin-left mb-4"
              />
              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl font-bold text-[#0f4f24]"
              >
                Send us a message
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isFormInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="text-slate-500 text-sm mt-1"
              >
                We'll get back to you within 24 hours.
              </motion.p>
            </div>

            <Formik
              initialValues={{ name: '', email: '', phone: '', message: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  <AnimatedField name="name" label="Full Name" icon={User} placeholder="Enter your full name" delay={0.35} />
                  <AnimatedField name="email" label="Email Address" icon={Mail} type="email" placeholder="Enter your email" delay={0.45} />
                  <AnimatedField name="phone" label="Phone Number" icon={Phone} type="tel" placeholder="Enter your phone number" delay={0.55} />
                  <AnimatedField name="message" label="Message" icon={MessageSquare} as="textarea" rows={4} placeholder="Tell us how we can help you…" delay={0.65} />

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.75 }}
                  >
                    <SubmitButton isSubmitting={isSubmitting} />
                  </motion.div>
                </Form>
              )}
            </Formik>
          </motion.div>

          {/* ── Right: Image + Info ── */}
          <div className="md:flex flex-col gap-5 hidden">
            {/* Contact image */}
            <div className="hidden md:block">
              <ContactImage src={contactImage} />
            </div>

            {/* Info pills */}
            <div className="grid sm:grid-cols-3 gap-3">
              {contactInfo.map((item, i) => (
                <InfoPill key={i} {...item} index={i} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ContactPage