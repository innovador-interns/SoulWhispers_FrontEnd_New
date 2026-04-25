import { useEffect, useMemo, useState, useRef, useCallback, useLayoutEffect, memo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { limitedBlogs } from '../../data/blogs'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)
CustomEase.create('silk', 'M0,0 C0.25,0 0.1,1 1,1')

function getCardsPerPage(width) {
  if (width >= 1024) return 3
  if (width >= 768) return 2
  return 1
}

// ─── Magnetic Button ──────────────────────────────────────────────────────
const MagneticBtn = memo(({ children, className, onClick, 'aria-label': ariaLabel }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 22 })
  const sy = useSpring(y, { stiffness: 300, damping: 22 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.3)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.9 }}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  )
})

MagneticBtn.displayName = 'MagneticBtn'

// ─── Progress Bar ─────────────────────────────────────
const ProgressBar = memo(({ duration, isPlaying, page }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.killTweensOf(ref.current)
    if (!isPlaying) {
      gsap.set(ref.current, { scaleX: 0 })
      return
    }
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      { scaleX: 1, duration: duration / 1000, ease: 'none' }
    )
  }, [page, isPlaying, duration])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#3bab35]/10 overflow-hidden z-20">
      <div
        ref={ref}
        className="h-full bg-gradient-to-r from-[#3bab35] to-[#0f4f24] origin-left rounded-full"
      />
    </div>
  )
})

ProgressBar.displayName = 'ProgressBar'

// ─── Blog Card ────────────────────────────────────────────────────────────
const BlogCard = memo(({ blog, index, navigate }) => {
  const ref = useRef(null)

  // 3D tilt
  const handleMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -6
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 6
    gsap.to(el, { rotationX: rx, rotationY: ry, duration: 0.4, ease: 'power2.out', transformPerspective: 800 })
  }, [])

  const handleLeave = useCallback(() => {
    gsap.to(ref.current, { rotationX: 0, rotationY: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' })
  }, [])

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => navigate(`/blog/${blog.id}`)}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer flex flex-col h-full rounded-[24px] border border-slate-200/80 bg-white overflow-hidden"
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        boxShadow: '0 4px 24px rgba(15,79,36,0.06)',
      }}
    >
      {/* Image */}
      <div className="overflow-hidden rounded-t-[24px] relative">
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="h-56 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-[#0f4f24]/50 to-transparent pointer-events-none"
        />

        <div className="absolute top-4 left-4">
          <motion.span
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.07 + 0.2 }}
            className="inline-flex items-center bg-white/90 backdrop-blur-sm text-[#0f4f24] text-[10px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
          >
            {blog.category}
          </motion.span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-[#0f4f24] text-white text-xs font-bold px-3 py-1.5 rounded-full"
        >
          Read <ArrowRight size={11} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-[17px] font-bold leading-snug text-[#0f4f24] line-clamp-2 min-h-[3.2rem] group-hover:text-[#3bab35] transition-colors duration-300">
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p className="mt-2.5 text-sm leading-relaxed text-slate-500 line-clamp-2 flex-1">
            {blog.excerpt}
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Calendar size={10} /> {blog.date}
            </span>
            {blog.readTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <span className="flex items-center gap-1"><Clock size={10} /> {blog.readTime}</span>
              </>
            )}
          </div>

          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
            className="text-[#3bab35]"
          >
            <ArrowRight size={14} />
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
})

BlogCard.displayName = 'BlogCard'

// ─── Dot Indicator ────────────────────────────────────────────────────────
const DotIndicator = memo(({ total, current, onSelect }) => {
  return (
    <div className="mt-8 flex justify-center items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onSelect(i)}
          animate={{
            width: i === current ? 28 : 8,
            backgroundColor: i === current ? '#0f4f24' : 'rgba(15,79,36,0.2)',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="h-2 rounded-full cursor-pointer"
          aria-label={`Go to page ${i + 1}`}
        />
      ))}
    </div>
  )
})

DotIndicator.displayName = 'DotIndicator'

// ─── Section Header ───────────────────────────────────────────────────────
const SectionHeader = memo(({ navigate, onPrev, onNext }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const lineRef = useRef(null)
  const kickerRef = useRef(null)
  const headRef = useRef(null)
  const paraRef = useRef(null)

  useLayoutEffect(() => {
    if (!isInView) return
    const ctx = gsap.context(() => {
      // Kicker
      gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'silk', delay: 0.1 })
      gsap.fromTo(kickerRef.current, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.6, ease: 'silk', delay: 0.25 })

      // Heading split
      const splitHead = new SplitText(headRef.current, { type: 'words,chars' })
      gsap.fromTo(splitHead.chars,
        { opacity: 0, y: 40, rotationX: -50, transformOrigin: '50% 100%' },
        { opacity: 1, y: 0, rotationX: 0, duration: 0.75, ease: 'silk', stagger: 0.02, delay: 0.3 }
      )

      // Para reveal
      const splitPara = new SplitText(paraRef.current, { type: 'lines' })
      gsap.fromTo(splitPara.lines,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'silk', stagger: 0.07, delay: 0.5 }
      )
    }, ref)

    return () => ctx.revert()
  }, [isInView])

  return (
    <div ref={ref} className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <span ref={lineRef} className="h-px w-8 bg-[#3bab35] origin-left block" />
          <span ref={kickerRef} className="section-kicker opacity-0">Latest reflections</span>
        </div>

        <h2
          ref={headRef}
          className="section-heading mt-5"
          style={{ perspective: '600px' }}
        >
          Editorial guidance that extends the same calm experience beyond the app
        </h2>

        <p ref={paraRef} className="section-copy mt-4 max-w-2xl">
          The blog area now follows the same container, spacing, and card rhythm as the rest of the page, so it feels stable instead of visually detached.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
        className="flex flex-wrap items-center gap-3"
      >
        <MagneticBtn
          onClick={onPrev}
          aria-label="Previous blog page"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0f4f24]/15 bg-white/80 text-[#0f4f24] hover:border-[#3bab35]/40 hover:bg-[#e3f5e1] transition-colors duration-200"
        >
          <ArrowLeft size={17} />
        </MagneticBtn>

        <MagneticBtn
          onClick={onNext}
          aria-label="Next blog page"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0f4f24]/15 bg-white/80 text-[#0f4f24] hover:border-[#3bab35]/40 hover:bg-[#e3f5e1] transition-colors duration-200"
        >
          <ArrowRight size={17} />
        </MagneticBtn>

        <motion.button
          onClick={() => navigate('/blogs')}
          whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(15,79,36,0.28)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="inline-flex items-center gap-2 rounded-full bg-[#0f4f24] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_32px_rgba(15,79,36,0.22)] overflow-hidden relative"
        >
          <motion.span
            className="absolute inset-0 w-1/2 pointer-events-none"
            style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)', skewX: '-20deg' }}
            initial={{ x: '-100%' }}
            whileHover={{ x: '250%' }}
            transition={{ duration: 0.6 }}
          />
          See all blogs
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowRight size={15} />
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  )
})

SectionHeader.displayName = 'SectionHeader'

// ─── Slide direction variants ─────────────────────────────────────────────
const gridVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
}

// ─── Main Component ───────────────────────────────────────────────────────
export default function BlogPreview() {
  const navigate = useNavigate()
  const AUTO_DURATION = 5000

  const [cardsPerPage, setCardsPerPage] = useState(() =>
    getCardsPerPage(typeof window === 'undefined' ? 1440 : window.innerWidth)
  )
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  // Resize
  useEffect(() => {
    const handleResize = () => setCardsPerPage(getCardsPerPage(window.innerWidth))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const pages = useMemo(() => {
    const chunks = []
    for (let i = 0; i < limitedBlogs.length; i += cardsPerPage)
      chunks.push(limitedBlogs.slice(i, i + cardsPerPage))
    return chunks
  }, [cardsPerPage])

  useEffect(() => {
    setPage((prev) => Math.min(prev, Math.max(pages.length - 1, 0)))
  }, [pages.length])

  // Auto-advance
  useEffect(() => {
    if (isPaused || pages.length <= 1) return
    const id = window.setInterval(() => {
      setDirection(1)
      setPage((prev) => (prev + 1) % pages.length)
    }, AUTO_DURATION)
    return () => window.clearInterval(id)
  }, [isPaused, pages.length])

  const goTo = useCallback((next) => {
    setDirection(next > page ? 1 : -1)
    setPage(next)
  }, [page])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setPage((prev) => (prev === 0 ? pages.length - 1 : prev - 1))
  }, [pages.length])

  const goNext = useCallback(() => {
    setDirection(1)
    setPage((prev) => (prev + 1) % pages.length)
  }, [pages.length])

  const visibleBlogs = pages[page] ?? []

  // Swipe support
  const dragStartX = useRef(0)
  const onDragStart = useCallback((_, info) => { dragStartX.current = info.point.x }, [])
  const onDragEnd = useCallback((_, info) => {
    const delta = dragStartX.current - info.point.x
    if (delta > 50) goNext()
    else if (delta < -50) goPrev()
  }, [goNext, goPrev])

  return (
    <section className="section-space px-4 sm:px-6 lg:px-8">
      <div className="container">
        <div className="scene-panel overflow-hidden p-6 sm:p-8 lg:p-10 relative">

          <ProgressBar duration={AUTO_DURATION} isPlaying={!isPaused && pages.length > 1} page={page} />

          <SectionHeader navigate={navigate} onPrev={goPrev} onNext={goNext} />

          <div
            className="mt-10 relative overflow-hidden min-h-[480px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={page}
                custom={direction}
                variants={gridVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.08}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                className={`grid gap-5 w-full ${cardsPerPage === 1
                  ? 'grid-cols-1'
                  : cardsPerPage === 2
                    ? 'md:grid-cols-2'
                    : 'md:grid-cols-2 lg:grid-cols-3'
                  }`}
              >
                {visibleBlogs.map((blog, i) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    index={i}
                    navigate={navigate}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {pages.length > 1 && (
            <DotIndicator total={pages.length} current={page} onSelect={goTo} />
          )}

        </div>
      </div>
    </section>
  )
}