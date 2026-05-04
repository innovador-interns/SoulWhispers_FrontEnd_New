import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useLayoutEffect, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import appStoreImg from '../assets/app-store.png'
import googlePlayImg from '../assets/google-play.png'
import innovadorLogo from '../assets/innovadorsolutions.png'
import { FaFacebookF, FaTiktok, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)
CustomEase.create('silk', 'M0,0 C0.25,0 0.1,1 1,1')

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features/' },
  { label: 'Blogs', to: '/blogs/' },
  { label: 'FAQs', to: '/faqs/' },
  { label: 'Contact', to: '/contact/' },
  { label: 'Privacy Policy', to: '/privacy-policy/' },
  { label: 'Terms & Conditions', to: '/terms-and-conditions/' },
]

const wellnessItems = ['Health & Fitness', 'Healthy Diet', 'Therapist Access', 'Daily Check-ins']

// Magnetic Social Icon
function MagneticIcon({ href, children }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20 })
  const sy = useSpring(y, { stiffness: 300, damping: 20 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.35)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ x: sx, y: sy }}
      whileHover={{ backgroundColor: 'rgba(59,171,53,0.25)', scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="relative rounded-full bg-white/5 border border-white/10 p-3 flex items-center justify-center overflow-hidden"
    >
      {/* Glow ring */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 2.5, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ backgroundColor: 'rgba(59, 171, 53, 0.15)' }}
      />
      {children}
    </motion.a>
  )
}

// Nav Link with animated underline
function FooterLink({ label, to, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 + index * 0.07 }}
    >
      <Link
        to={to}
        className="group relative inline-flex items-center gap-1.5 text-[14px] text-white/80 hover:text-[#57f54f] transition-colors duration-300"
      >
        <motion.span
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: 'var(--sw-accent)' }}
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
        <span className="relative">
          {label}
          <span className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ease-out" style={{ backgroundColor: 'var(--sw-accent)' }} />
        </span>
        <ArrowUpRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 -translate-y-0.5" />
      </Link>
    </motion.li>
  )
}

// Wellness tag
function WellnessTag({ text, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 + index * 0.07 }}
      className="group flex items-center gap-2 text-[14px] text-white/70 hover:text-[#57f54f] cursor-default transition-colors duration-300"
    >
      <motion.span
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8 + index, repeat: Infinity, ease: 'linear' }}
        className="w-1 h-1 rounded-full flex-shrink-0"
        style={{ backgroundColor: 'rgba(59, 171, 53, 0.6)' }}
      />
      {text}
    </motion.li>
  )
}

// App Store Button
function AppButton({ href, src, alt, delay }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 18, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.35)' }}
      whileTap={{ scale: 0.96 }}
      className="inline-block overflow-hidden"
    >
      <img src={src} alt={alt} className="h-11 drop-shadow-xl" />
    </motion.a>
  )
}

// Contact row
function ContactRow({ icon: Icon, text, href, delay }) {
  const el = (
    <motion.a
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className="group mt-4 flex items-center gap-3 text-[14px] text-white/70 hover:text-white transition-colors duration-300"
    >
      <span
        className="flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-300"
        style={{ borderColor: 'rgba(59, 171, 53, 0.2)' }}
      >
        <Icon size={12} className='text-gray-300' />
      </span>
      {text}
    </motion.a>
  )
  return href
    ? <a href={href} target="_blank" rel="noreferrer">{el}</a>
    : el
}

// Big CTA marquee text
function MarqueeText() {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return
    gsap.to(ref.current, {
      xPercent: -50,
      ease: 'none',
      duration: 22,
      repeat: -1,
    })
  }, [])

  const text = 'Soul Whispers · Mindful Wellness · Your Journey Starts Here · '
  return (
    <div className="overflow-hidden border-t border-b border-white/5 py-4 mb-14 sm:mb-18">
      <div ref={ref} className="flex whitespace-nowrap" style={{ width: 'max-content' }}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-[13px] font-bold uppercase tracking-[0.3em] text-white/40 mr-8">
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

// Big animated heading
function BigHeading() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (!ref.current) return
    const split = new SplitText(ref.current, { type: 'chars' })
    gsap.fromTo(
      split.chars,
      { opacity: 0, y: 60, rotationX: -50, transformOrigin: '50% 100%' },
      {
        opacity: 1, y: 0, rotationX: 0,
        duration: 0.9, ease: 'silk', stagger: 0.03,
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      }
    )
    return () => split.revert()
  }, [])

  return (
    <h2
      ref={ref}
      className="text-5xl sm:text-6xl lg:text-[60px] font-black text-white/8 tracking-tight leading-none select-none mb-14 sm:mb-18"
      style={{ perspective: '600px' }}
    >
      Soul Whispers
    </h2>
  )
}

// Animated divider line
function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="h-px origin-center mb-5 border-b border-white/15"
    />
  )
}

// Column heading
function ColHeading({ children, delay = 0 }) {
  return (
    <motion.h3
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className="text-xs font-black uppercase tracking-[0.25em] mb-6 flex items-center gap-2 text-white"
    >
      <span className="w-4 h-px bg-white" />
      {children}
    </motion.h3>
  )
}

// Main Footer
function Footer() {
  const footerRef = useRef(null)
  const glowRef = useRef(null)

  // Cursor glow inside footer
  useEffect(() => {
    const el = footerRef.current
    const glow = glowRef.current
    if (!el || !glow) return
    const move = (e) => {
      const rect = el.getBoundingClientRect()
      gsap.to(glow, {
        x: e.clientX - rect.left - 200,
        y: e.clientY - rect.top - 200,
        duration: 1.2,
        ease: 'power3.out',
      })
    }
    el.addEventListener('mousemove', move)
    return () => el.removeEventListener('mousemove', move)
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative mt-8 overflow-hidden text-white"
      style={{ backgroundColor: 'var(--sw-primary-deep)' }}
    >
      {/* Base gradient */}
      <div 
        className="absolute inset-0 opacity-80" 
        style={{ background: 'linear-gradient(135deg, var(--sw-primary) 0%, var(--sw-primary-deep) 100%)' }}
      />

      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(59, 171, 53, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 171, 53, 1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

      {/* Cursor glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-[400px] h-[400px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,171,53,0.06) 0%, transparent 70%)', willChange: 'transform' }}
      />

      {/* Decorative large blurred orb top-right */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full blur-3xl" style={{ backgroundColor: 'rgba(59, 171, 53, 0.04)' }} />
      <div className="pointer-events-none absolute bottom-0 -left-16 w-[280px] h-[280px] rounded-full blur-3xl" style={{ backgroundColor: 'rgba(59, 171, 53, 0.03)' }} />

      {/* ── Main content ── */}
      <div className="container relative z-10 pt-16 sm:pt-20">

        {/* Big watermark heading */}
        <BigHeading />

        {/* Marquee */}
        <MarqueeText />

        {/* Grid columns */}
        <div className="grid gap-12 sm:gap-10 lg:grid-cols-3 pb-16 sm:pb-20">

          {/* Col 1 — Links */}
          <div>
            <ColHeading delay={0.1}>Quick Links</ColHeading>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <FooterLink key={link.to} {...link} index={i} />
              ))}
            </ul>
          </div>

          {/* Col 2 — Wellness + Apps */}
          <div>
            <ColHeading delay={0.2}>Wellness Focus</ColHeading>
            <ul className="space-y-3 mb-10">
              {wellnessItems.map((text, i) => (
                <WellnessTag key={text} text={text} index={i} />
              ))}
            </ul>

            <ColHeading delay={0.35}>Download App</ColHeading>
            <div className="flex flex-wrap gap-3">
              <AppButton
                href="https://apps.apple.com/pk/app/soul-whispers/id6514315560/"
                src={appStoreImg}
                alt="Download on the App Store"
                delay={0.45}
              />
              <AppButton
                href="https://play.google.com/store/apps/details?id=com.innovadorsolutions.soulwispers"
                src={googlePlayImg}
                alt="Get it on Google Play"
                delay={0.55}
              />
            </div>
          </div>

          {/* Col 3 — Contact + Socials */}
          <div>
            <ColHeading delay={0.3}>Contact</ColHeading>
            <div className="space-y-4 mb-10">
              <ContactRow icon={Phone} text="+92 332 466 6823" href='tel:+923324666823' delay={0.35} />
              <ContactRow icon={Mail} text="info@soulwhispers.live" href="mailto:info@soulwhispers.live" delay={0.45} />
              <ContactRow icon={MapPin} text="Karachi, Pakistan" delay={0.55} />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-[14px] text-white/70 leading-relaxed max-w-xs mb-8"
            >
              A calmer digital space for therapy access, emotional reflection, and mindful daily support.
            </motion.p>

            <ColHeading delay={0.65}>Follow Us</ColHeading>
            <div className="flex gap-3">
              <MagneticIcon href="https://www.facebook.com/Soulwhispers.live/">
                <FaFacebookF size={17} className="text-white/80" />
              </MagneticIcon>
              <MagneticIcon href="https://www.linkedin.com/company/soulwhispers/">
                <FaLinkedinIn size={17} className="text-white/80" />
              </MagneticIcon>
              <MagneticIcon href="https://www.tiktok.com/@soulwhispers.live/">
                <FaTiktok size={17} className="text-white/80" />
              </MagneticIcon>
              <MagneticIcon href="https://www.instagram.com/soulwhispers.live/">
                <FaInstagram size={17} className="text-white/80" />
              </MagneticIcon>
              <MagneticIcon href="https://www.youtube.com/@SoulWhispers_live/">
                <FaYoutube size={17} className="text-white/80" />
              </MagneticIcon>
            </div>
          </div>

        </div>

        {/* Divider */}
        <Divider />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="pb-4 sm:pb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-300"
        >
          <p>© 2026 Soul Whispers. All rights reserved.</p>

          <p className='flex items-center gap-3 text-gray-300 text-[13px] mr-6'>
            Powered by{' '}
            <motion.a
              href="https://www.innovadorsolutions.com/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ color: 'var(--sw-accent)' }}
              className="font-bold transition-colors duration-200"
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              <img src={innovadorLogo} alt="Innovador Solutions" className="w-20" />
            </motion.a>
          </p>

          {/* Back to top */}
          {/* <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3, color: 'var(--sw-accent)' }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="flex items-center gap-1.5 transition-colors duration-300 font-semibold"
            style={{ color: 'rgba(255, 255, 255, 0.4)' }}
          >
            Back to top
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↑
            </motion.span>
          </motion.button> */}
        </motion.div>

      </div>
    </footer>
  )
}

export default Footer