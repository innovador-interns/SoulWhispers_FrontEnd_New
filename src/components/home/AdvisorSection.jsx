import { useEffect, useRef, useState, memo, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, MessageCircleHeart, ShieldCheck, Stars } from 'lucide-react'
import imranImg from '../../assets/Imran.png'
import beenishImg from '../../assets/Beenish.png'
import sheebaImg from '../../assets/sheeba-farhan.png'
import nasreenImg from '../../assets/maam-nasreen.png'
import screen1 from '../../assets/screen1.jpg'
import screen2 from '../../assets/screen2.jpg'
import screen3 from '../../assets/screen3.jpg'
import screen4 from '../../assets/screen4.jpg'
import appStoreImg from '../../assets/app-store.png'
import googlePlayImg from '../../assets/google-play.png'

gsap.registerPlugin(ScrollTrigger)

const advisors = [
  { id: '01', name: 'Dr. Imran Yousuf', role: ['International Trainer', '& Psychologist'], img: imranImg },
  { id: '02', name: 'Dr. Beenish Qamar', role: ['Maxillofacial Surgeon', '& Public Health'], img: beenishImg },
  { id: '03', name: 'Dr. Sheeba Farhan', role: ['Assistant Professor', 'at FUUAST'], img: sheebaImg },
  { id: '04', name: 'Nasreen Iqbal', role: ['COO at Innovador', 'Solutions'], img: nasreenImg },
]

const phoneScreens = [screen1, screen2, screen3, screen4]

const capabilities = [
  { title: 'AI Assessment', desc: 'Reduce uncertainty with a guided intake that surfaces meaningful next steps.', icon: Stars, side: 'left' },
  { title: 'Appointment Flow', desc: 'Move from reflection to booking with less friction and a clearer sense of control.', icon: Calendar, side: 'left' },
  { title: 'Daily Feedback', desc: 'Check in gently and stay connected to your progress without pressure.', icon: MessageCircleHeart, side: 'right' },
  { title: 'Private by Design', desc: 'Every interaction is shaped to feel safe, intentional, and respectful.', icon: ShieldCheck, side: 'right' },
]

const stats = [
  { target: 98, suffix: '%', label: 'Satisfaction', dec: 0 },
  { target: 12, suffix: 'K+', label: 'Sessions', dec: 0 },
  { target: 4, suffix: '', label: 'Expert Advisors', dec: 0 },
  { target: 4.9, suffix: '★', label: 'App Rating', dec: 1 },
]

// ADVISOR CARD
function AdvisorCard({ advisor }) {
  const cardRef = useRef(null)

  const onMouseMove = useCallback((e) => {
    const r = cardRef.current.getBoundingClientRect()
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2)
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2)
    gsap.to(cardRef.current, {
      rotateX: dy * -7, rotateY: dx * 7, scale: 1.025,
      duration: 0.4, ease: 'power2.out',
      transformPerspective: 900, transformOrigin: 'center center',
    })
  }, [])

  const onMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0, scale: 1,
      duration: 0.65, ease: 'elastic.out(1,0.55)',
    })
  }, [])

  return (
    <article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="sw-advisor-card group relative flex flex-col items-center overflow-hidden py-4 text-center opacity-0 translate-y-10 cursor-default will-change-transform duration-500"
    >

      {/* Avatar stack */}
      <div className="relative mb-5 h-36 w-36">
        <div className="absolute -inset-3 rounded-full border border-brand/15 transition-all duration-500 group-hover:border-brand/40 group-hover:scale-105" />
        <div className="h-full w-full overflow-hidden rounded-full border-[3px] border-white shadow-[0_4px_20px_rgba(26,46,28,0.12)]">
          <img
            src={advisor.img}
            alt={advisor.name}
            loading="lazy"
            className="h-full w-full object-cover grayscale-[15%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Text */}
      <h3 className="font-syne text-[0.96rem] font-bold leading-snug text-forest-900 transition-colors duration-300 group-hover:text-brand">
        {advisor.name}
      </h3>
      <div className="mt-1.5 text-[0.73rem] leading-relaxed text-forest-500">
        {Array.isArray(advisor.role) ? (
          advisor.role.map((line, idx) => (
            <span key={idx}>{line}{idx < advisor.role.length - 1 && <br />}</span>
          ))
        ) : (
          advisor.role
        )}
      </div>
    </article>
  )
}

// CAPABILITY CARD

function CapCard({ item }) {
  const cardRef = useRef(null)
  const Icon = item.icon
  const isLeft = item.side === 'left'

  const onMouseMove = useCallback((e) => {
    const r = cardRef.current.getBoundingClientRect()
    const dx = (e.clientX - r.left) / r.width - 0.5
    const dy = (e.clientY - r.top) / r.height - 0.5
    gsap.to(cardRef.current, {
      rotateX: dy * -6, rotateY: dx * 6,
      duration: 0.35, ease: 'power2.out', transformPerspective: 700,
    })
  }, [])

  const onMouseLeave = useCallback(() => {
    gsap.to(cardRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.55, ease: 'elastic.out(1,0.5)',
    })
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`sw-cap-card group relative overflow-hidden rounded-[1.35rem] border border-brand/10 bg-forest-50 p-7 cursor-default will-change-transform opacity-0 translate-y-10 transition-[border-color,background-color,box-shadow] duration-400 hover:border-brand/25 hover:bg-white hover:shadow-[0_8px_40px_rgba(26,46,28,0.10)] ${isLeft ? 'hover:translate-x-2' : 'hover:-translate-x-2'}`}
    >
      {/* Blob */}
      <div
        className={`pointer-events-none absolute h-24 w-24 rounded-full bg-brand/5 opacity-0 transition-opacity duration-400 group-hover:opacity-100 ${isLeft ? '-right-5 -top-5' : '-bottom-5 -left-5'}`}
      />
      {/* Icon */}
      <div className="relative z-10 mb-3.5 flex h-11 w-11 items-center justify-center rounded-[.85rem] border border-brand/20 bg-gradient-to-br from-brand/10 to-brand-light/5 text-brand">
        <Icon size={19} strokeWidth={1.6} />
      </div>
      <h4 className="relative z-10 font-syne text-[0.97rem] font-bold text-[#0f4f24]">
        {item.title}
      </h4>
      <p className="relative z-10 mt-1.5 text-[0.86rem] leading-relaxed text-[#0f4f24]">
        {item.desc}
      </p>
    </div>
  )
}

// PHONE SHOWCASE

const PhoneShowcase = memo(function PhoneShowcase() {
  const [cur, setCur] = useState(0)
  const [paused, setPaused] = useState(false)
  const imgRef = useRef(null)

  const switchTo = useCallback((idx) => {
    setCur(idx)
    gsap.to(imgRef.current, {
      opacity: 0, y: -18, scale: 0.94, duration: 0.32, ease: 'power2.in',
      onComplete: () => {
        imgRef.current.src = phoneScreens[idx]
        imgRef.current.onload = () =>
          gsap.to(imgRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out' })
      },
    })
  }, [])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setCur(prev => {
        const next = (prev + 1) % phoneScreens.length
        switchTo(next)
        return next
      })
    }, 3800)
    return () => clearInterval(id)
  }, [paused, switchTo])

  const dotTimeoutRef = useRef(null)
  const onDotClick = (i) => {
    setPaused(true)
    switchTo(i)
    if (dotTimeoutRef.current) clearTimeout(dotTimeoutRef.current)
    dotTimeoutRef.current = setTimeout(() => setPaused(false), 6000)
  }

  useEffect(() => {
    return () => {
      if (dotTimeoutRef.current) clearTimeout(dotTimeoutRef.current)
    }
  }, [])

  return (
    <div className="sw-phone-col flex flex-col items-center justify-center relative opacity-0 translate-y-16 scale-90">
      {/* Glow */}
      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-brand-light/15 blur-2xl animate-pulse-glow" />

      {/* Frame */}
      <div
        className="relative z-10 w-[230px] overflow-hidden rounded-[2.6rem] border-[6px] border-white bg-forest-100 shadow-[0_40px_80px_rgba(26,46,28,0.16),0_0_0_1px_rgba(42,140,38,0.12)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <img
          ref={imgRef}
          src={phoneScreens[0]}
          alt="App screen"
          className="block h-auto w-full rounded-[2.6rem]"
        />
      </div>

      {/* Shadow ellipse */}
      <div className="mt-1 h-5 w-44 rounded-full bg-brand/10 blur-md" />

      {/* Dots */}
      <div className="mt-4 flex gap-2">
        {phoneScreens.map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            aria-label={`Screen ${i + 1}`}
            className={`rounded-full border-none p-0 transition-all duration-400 ${i === cur ? 'h-1.5 w-4 bg-brand' : 'h-1.5 w-1.5 bg-brand/20 hover:bg-brand/40'}`}
          />
        ))}
      </div>
    </div>
  )
})

// MAIN SECTION

export default function AdvisorSection() {
  const sectionRef = useRef(null)
  const mesh1Ref = useRef(null)
  const mesh2Ref = useRef(null)
  const countTimeoutRef = useRef(null)

  const countUp = useCallback(() => {
    if (!sectionRef.current) return
    sectionRef.current.querySelectorAll('[data-count-target]').forEach(el => {
      const target = parseFloat(el.dataset.countTarget)
      const dec = parseInt(el.dataset.countDec || 0)
      gsap.fromTo(
        { v: 0 }, { v: target },
        {
          duration: 1.9, ease: 'power2.out',
          onUpdate: function () {
            el.textContent = dec
              ? this.targets()[0].v.toFixed(dec)
              : Math.round(this.targets()[0].v)
          },
        }
      )
    })
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      console.log('AdvisorSection GSAP Context initialized')

      // Parallax mesh blobs
      gsap.to(mesh1Ref.current, {
        y: '-=100', x: '+=50', ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1.8 },
      })
      gsap.to(mesh2Ref.current, {
        y: '+=80', x: '-=30', ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 2.2 },
      })

      const rev = (sel, delay = 0) =>
        gsap.to(sel, { opacity: 1, y: 0, duration: 1.05, delay, ease: 'power3.out' })

      // Panel 1
      gsap.fromTo('#sw-panel1', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '#sw-panel1', start: 'top 88%' },
      })
      ScrollTrigger.create({
        trigger: '#sw-panel1', start: 'top 78%',
        onEnter: () => {
          console.log('Panel 1 Entered')
          rev('#sw-k1', 0); rev('#sw-h1', 0.12); rev('#sw-copy1', 0.22); rev('#sw-tags1', 0.32)
          gsap.utils.toArray('.sw-advisor-card').forEach((c, i) =>
            gsap.to(c, { opacity: 1, y: 0, duration: 1, delay: 0.42 + i * 0.11, ease: 'power3.out' })
          )
        },
      })

      // Panel 2
      gsap.fromTo('#sw-panel2', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '#sw-panel2', start: 'top 88%' },
      })
      ScrollTrigger.create({
        trigger: '#sw-panel2', start: 'top 78%',
        onEnter: () => {
          rev('#sw-dline', 0); rev('#sw-k2', 0.08); rev('#sw-h2', 0.18)
          rev('#sw-copy2', 0.28); rev('#sw-store', 0.38)
          gsap.utils.toArray('.sw-cap-card').forEach((c, i) =>
            gsap.to(c, { opacity: 1, y: 0, duration: 1, delay: 0.52 + i * 0.12, ease: 'power3.out' })
          )
          gsap.utils.toArray('.sw-stat-item').forEach((s, i) =>
            gsap.to(s, { opacity: 1, y: 0, duration: 1, delay: 0.7 + i * 0.1, ease: 'power3.out' })
          )
          countTimeoutRef.current = setTimeout(countUp, 900)
        },
      })

      // Phone entrance
      gsap.fromTo('.sw-phone-col', { opacity: 0, y: 70, scale: 0.9 }, {
        opacity: 1, y: 0, scale: 1, duration: 1.3, ease: 'power3.out',
        scrollTrigger: { trigger: '.sw-phone-col', start: 'top 85%' },
      })

    }, sectionRef)

    return () => {
      ctx.revert()
      if (countTimeoutRef.current) clearTimeout(countTimeoutRef.current)
    }
  }, [countUp])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-forest-50 py-16 lg:py-18"
    >
      {/* Mesh blobs */}
      <div
        ref={mesh1Ref}
        className="pointer-events-none absolute -left-64 -top-72 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(59,171,53,0.10)_0%,transparent_65%)]"
      />
      <div
        ref={mesh2Ref}
        className="pointer-events-none absolute -right-48 top-[30%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(42,140,38,0.07)_0%,transparent_65%)]"
      />

      {/* Main container */}
      <div className="relative z-10 mx-auto flex max-w-[1360px] flex-col gap-8 px-6 lg:px-12">

        {/* PANEL 1 — ADVISORS  */}
        <div
          id="sw-panel1"
          className="relative overflow-hidden rounded-[2.25rem] border border-brand/10 bg-white shadow-[0_8px_40px_rgba(26,46,28,0.08)]"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-brand/[0.03] via-transparent to-transparent" />

          <div className="relative px-8 pb-16 pt-14 lg:px-16 lg:pb-20 lg:pt-16">

            {/* Header */}
            <div className="mb-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

              {/* Left */}
              <div className="max-w-2xl">
                <div
                  id="sw-k1"
                  className="inline-flex translate-y-10 items-center gap-2.5 text-[11px] font-bold uppercase tracking-[.2em] text-brand opacity-0"
                >
                  <div className="h-px w-7 rounded-full bg-gradient-to-r from-brand to-brand-light" />
                  Trusted guidance
                </div>
                <h2
                  id="sw-h1"
                  className="section-heading mt-4 translate-y-10 font-display text-3xl md:text-5xl font-normal leading-[1.08] tracking-[-0.025em] text-forest-900 opacity-0"
                >
                  Support shaped by people who understand{' '}
                  <em className="italic text-brand">care, trust &amp; delivery</em>
                </h2>
              </div>

              {/* Right */}
              <div className="shrink-0 lg:max-w-sm">
                <p
                  id="sw-copy1"
                  className="translate-y-10 text-[1.02rem] leading-[1.78] text-forest-500 opacity-0"
                >
                  Advisory presence treated as part of the product story — giving the platform
                  credibility and warmth without overwhelming the visual rhythm.
                </p>
              </div>
            </div>

            {/* Advisor grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {advisors.map(a => <AdvisorCard key={a.id} advisor={a} />)}
            </div>

          </div>
        </div>

        {/*  PANEL 2 — APP */}
        <div
          id="sw-panel2"
          className="relative overflow-hidden rounded-[2.25rem] border border-brand/10 bg-white shadow-[0_8px_40px_rgba(26,46,28,0.08)]"
        >
          <div className="pointer-events-none absolute inset-0 rounded-[2.25rem] bg-gradient-to-br from-brand/[0.03] via-transparent to-transparent" />

          <div className="relative px-8 pb-20 pt-16 lg:px-16 lg:pt-20">

            {/* Intro */}
            <div className="mx-auto mb-20 max-w-3xl text-center">

              {/* Deco line */}
              <div
                id="sw-dline"
                className="mb-5 flex translate-y-10 items-center gap-3 opacity-0"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand/15" />
                <div className="h-1.5 w-1.5 rounded-full bg-brand" />
                <div className="h-1.5 w-1.5 rounded-full bg-brand opacity-30" />
                <div className="h-1.5 w-1.5 rounded-full bg-brand opacity-10" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand/15" />
              </div>

              <div
                id="sw-k2"
                className="inline-flex translate-y-10 items-center justify-center gap-2.5 font-syne text-[11px] font-bold uppercase tracking-[.2em] text-brand opacity-0"
              >
                <span className="h-px w-7 rounded-full bg-gradient-to-r from-brand to-brand-light" />
                App experience
              </div>

              <h2
                id="sw-h2"
                className="mt-4 section-heading translate-y-10 font-display text-3xl md:text-5xl font-normal leading-[1.08] tracking-[-0.025em] text-forest-900 opacity-0"
              >
                Moments designed to feel{' '}
                <em className="italic text-brand">lighter, clearer &amp; more reassuring</em>
              </h2>

              <p
                id="sw-copy2"
                className="mx-auto mt-5 max-w-xl translate-y-10 text-[1.02rem] leading-[1.78] text-forest-500 opacity-0"
              >
                Larger breathing spaces, stronger hierarchy, and calmer interaction patterns —
                so people can stay focused on getting support.
              </p>

              {/* Store buttons */}
              <div
                id="sw-store"
                className="mt-8 flex translate-y-10 flex-wrap items-center justify-center gap-4 opacity-0"
              >
                <a
                  href="https://apps.apple.com/pk/app/soul-whispers/id6514315560"
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(26,46,28,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(42,140,38,0.18)]"
                >
                  <img src={appStoreImg} alt="Download on the App Store" className="block h-12" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.innovadorsolutions.soulwispers"
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(26,46,28,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(42,140,38,0.18)]"
                >
                  <img src={googlePlayImg} alt="Get it on Google Play" className="block h-12" />
                </a>
              </div>
            </div>

            {/* Triple — left caps | phone | right caps */}
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_300px_1fr] lg:gap-10">

              <div className="flex flex-col gap-4">
                {capabilities.filter(c => c.side === 'left').map(item => (
                  <CapCard key={item.title} item={item} />
                ))}
              </div>

              <PhoneShowcase />

              <div className="flex flex-col gap-4">
                {capabilities.filter(c => c.side === 'right').map(item => (
                  <CapCard key={item.title} item={item} />
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}