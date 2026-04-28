import { useEffect, useLayoutEffect, useRef, useState, memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, MessageCircleHeart, ShieldCheck, Stars } from 'lucide-react'
import sheebaImg from '../../assets/sheeba-farhan.png'
import imranImg from '../../assets/Imran.png'
import beenishImg from '../../assets/Beenish.png'
import nasreenImg from '../../assets/maam-nasreen.png'
import appStoreImg from '../../assets/app-store.png'
import googlePlayImg from '../../assets/google-play.png'
import BreathingOrb from '../ui/BreathingOrb'

// Memoize background components to prevent re-renders during state changes
const MemoizedBreathingOrb = memo(BreathingOrb)

const advisors = [
  {
    name: 'Dr. Imran Yousuf',
    role: 'International Trainer & Psychologist',
    img: imranImg,
  },
  {
    name: 'Dr. Beenish Qamar',
    role: 'Maxillofacial Surgeon & Public Health',
    img: beenishImg,
  },
  {
    name: 'Dr. Sheeba Farhan',
    role: 'Assistant Professor at FUUAST',
    img: sheebaImg,
  },
  {
    name: 'Nasreen Iqbal',
    role: 'COO at Innovador Solutions',
    img: nasreenImg,
  },
]

const screens = [
  '../../assets/screen1.jpg',
  '../../assets/screen2.jpg',
  '../../assets/screen3.jpg',
  '../../assets/screen4.jpg',
  '../../assets/screen5.jpg',
  '../../assets/screen6.jpg',
]

// Note: In a real app, these imports would be handled at the top, 
// but I'm keeping the logic consistent with how assets were being used.
// Actually, they were imported as screen1, screen2, etc. I'll stick to that.
import screen1 from '../../assets/screen1.jpg'
import screen2 from '../../assets/screen2.jpg'
import screen3 from '../../assets/screen3.jpg'
import screen4 from '../../assets/screen4.jpg'
import screen5 from '../../assets/screen5.jpg'
import screen6 from '../../assets/screen6.jpg'

const screensArray = [screen1, screen2, screen3, screen4, screen5, screen6]

const capabilities = [
  {
    title: 'AI assessment',
    description: 'Reduce uncertainty with a guided intake that surfaces meaningful next steps.',
    icon: Stars,
  },
  {
    title: 'Appointment flow',
    description: 'Move from reflection to booking with less friction and a clearer sense of control.',
    icon: Calendar,
  },
  {
    title: 'Daily feedback',
    description: 'Check in gently and stay connected to your progress without pressure.',
    icon: MessageCircleHeart,
  },
  {
    title: 'Private by design',
    description: 'Every interaction is shaped to feel safe, intentional, and respectful.',
    icon: ShieldCheck,
  },
]

const PhoneShowcase = memo(function PhoneShowcase() {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return undefined

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % screensArray.length)
    }, 3500)

    return () => window.clearInterval(timer)
  }, [isPaused])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="order-1 flex justify-center lg:order-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative flex w-full max-w-[350px] xl:max-w-[380px] items-center justify-center min-h-[500px] sm:min-h-[600px]">
        {/* Magnetic glow behind phone */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full bg-[#3bab35]/20 blur-[80px]"
        />

        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={screensArray[index]}
            alt={`App screen ${index + 1}`}
            initial={{ opacity: 0, y: 40, scale: 0.92, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -40, scale: 0.92, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full rounded-[40px] border-[6px] border-white/80 shadow-[0_40px_100px_rgba(15,79,36,0.25)] will-change-transform"
          />
        </AnimatePresence>
      </div>
    </motion.div>
  )
})

export default function AdvisorSection() {
  const sectionRef = useRef(null)

  // Entrance variants for Advisor Cards
  const cardVariants = {
    hidden: { opacity: 0, y: 34 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <section ref={sectionRef} className="section-space px-4 sm:px-6 lg:px-8">
      <div className="container space-y-6">
        <div className="scene-panel relative overflow-hidden p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="section-kicker">Trusted guidance</span>
              <h2 className="section-heading mt-5">
                Support shaped by people who understand care, trust, and delivery
              </h2>
            </div>
            <p className="section-copy max-w-2xl">
              The advisory presence is now treated as part of the product story, giving the platform more credibility and warmth without overwhelming the visual rhythm.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advisors.map((advisor, i) => (
              <motion.article
                key={advisor.name}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -10 }}
                className="surface-card group relative flex flex-col items-center p-6 text-center"
              >
                <div className="relative mx-auto h-32 w-32 shrink-0 md:h-48 md:w-48">
                  <div className="absolute inset-0 rounded-full border border-[#3bab35]/10 group-hover:border-[#3bab35]/30 transition-colors duration-500" />
                  <div className="h-full w-full overflow-hidden rounded-full border-4 border-white bg-slate-50 shadow-inner">
                    <img
                      src={advisor.img}
                      alt={advisor.name}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale-[0.1] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-bold leading-tight text-[#0f4f24] group-hover:text-[#3bab35] transition-colors">
                  {advisor.name}
                </h3>
                <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#3bab35]/70">
                  {advisor.role.split('&')[0]}
                </p>
                <p className="mt-1 text-[11px] font-medium text-slate-500">
                  {advisor.role.split('&')[1] ? `& ${advisor.role.split('&')[1]}` : ''}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="scene-panel relative overflow-hidden p-6 sm:p-10 lg:p-16">
          <MemoizedBreathingOrb className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#3bab35]/10 blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,171,53,0.05),transparent_60%)]" />

          {/* Intro Section */}
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="section-kicker">App experience</span>
            <h3 className="section-heading mt-6 text-3xl sm:text-4xl lg:text-5xl">
              Product moments designed to feel lighter, clearer, and more reassuring
            </h3>
            <p className="section-copy mx-auto mt-6 max-w-2xl text-lg text-slate-500">
              The visual flow uses larger breathing spaces, stronger information hierarchy, and calmer interaction patterns so people can stay focused on getting support.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <motion.a
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://apps.apple.com/pk/app/soul-whispers/id6514315560"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white p-2 shadow-[0_20px_40px_rgba(15,79,36,0.12)] transition-shadow hover:shadow-[0_20px_50px_rgba(15,79,36,0.2)]"
              >
                <img src={appStoreImg} alt="Download on the App Store" className="h-12" />
              </motion.a>
              <motion.a
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://play.google.com/store/apps/details?id=com.innovadorsolutions.soulwispers"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white p-2 shadow-[0_20px_40px_rgba(15,79,36,0.12)] transition-shadow hover:shadow-[0_20px_50px_rgba(15,79,36,0.2)]"
              >
                <img src={googlePlayImg} alt="Get it on Google Play" className="h-12" />
              </motion.a>
            </div>
          </div>

          {/* Interactive Layout */}
          <div className="relative mt-20 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-16">

            {/* Left Capabilities */}
            <div className="order-2 flex flex-col gap-6 lg:order-1">
              {capabilities.slice(0, 2).map(({ title, description, icon: Icon }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.03, x: 10 }}
                  className="group relative overflow-hidden rounded-[28px] border border-[#3bab35]/10 bg-white/60 p-8 shadow-sm backdrop-blur-md transition-all hover:border-[#3bab35]/30 hover:bg-white hover:shadow-[0_20px_40px_rgba(15,79,36,0.08)]"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#3bab35]/5 blur-3xl transition-all group-hover:bg-[#3bab35]/15" />
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3bab35]/10 to-[#0f4f24]/5 text-[#0f4f24]">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="relative z-10 mt-5 text-xl font-bold text-[#0f4f24]">{title}</h4>
                  <p className="relative z-10 mt-3 text-[0.95rem] leading-relaxed text-slate-600">{description}</p>
                </motion.div>
              ))}
            </div>

            {/* Center Phone Showcase */}
            <PhoneShowcase />

            {/* Right Capabilities */}
            <div className="order-3 flex flex-col gap-6">
              {capabilities.slice(2, 4).map(({ title, description, icon: Icon }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.03, x: -10 }}
                  className="group relative overflow-hidden rounded-[28px] border border-[#3bab35]/10 bg-white/60 p-8 shadow-sm backdrop-blur-md transition-all hover:border-[#3bab35]/30 hover:bg-white hover:shadow-[0_20px_40px_rgba(15,79,36,0.08)]"
                >
                  <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-[#3bab35]/5 blur-3xl transition-all group-hover:bg-[#3bab35]/15" />
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3bab35]/10 to-[#0f4f24]/5 text-[#0f4f24]">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="relative z-10 mt-5 text-xl font-bold text-[#0f4f24]">{title}</h4>
                  <p className="relative z-10 mt-3 text-[0.95rem] leading-relaxed text-slate-600">{description}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
