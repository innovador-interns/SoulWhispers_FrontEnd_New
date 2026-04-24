import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useInView } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { blogs } from '../data/blogs'
import { ArrowRight, Clock, Search, SearchIcon } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)
CustomEase.create('silk', 'M0,0 C0.25,0 0.1,1 1,1')
CustomEase.create('snap', 'M0,0 C0.6,0 0.4,1 1,1')

const ALL = 'All'
const categories = [ALL, ...Array.from(new Set(blogs.map(b => b.category)))]

// ─── Cursor Glow ──────────────────────────────────────────────────────────
function CursorGlow() {
    const ref = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const xTo = gsap.quickTo(ref.current, "x", { duration: 0.8, ease: "power2.out" })
            const yTo = gsap.quickTo(ref.current, "y", { duration: 0.8, ease: "power2.out" })

            const move = (e) => {
                xTo(e.clientX - 220)
                yTo(e.clientY - 220)
            }
            window.addEventListener('mousemove', move)
            return () => window.removeEventListener('mousemove', move)
        })
        return () => ctx.revert()
    }, [])

    return (
        <div ref={ref} className="pointer-events-none fixed top-0 left-0 w-[440px] h-[440px] rounded-full z-0 opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(59,171,53,0.15) 0%, transparent 70%)' }} />
    )
}

// ─── Floating Orbs ────────────────────────────────────────────────────────
function FloatingOrbs() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[
                { w: 320, h: 320, top: '-5%', left: '-8%', opacity: 0.04, anim: 'float-slow' },
                { w: 200, h: 200, top: '30%', right: '-5%', opacity: 0.05, anim: 'float-med' },
                { w: 140, h: 140, bottom: '10%', left: '15%', opacity: 0.04, anim: 'float-fast' },
            ].map((s, i) => (
                <div
                    key={i}
                    className={`orb absolute rounded-full bg-[#3bab35] ${s.anim}`}
                    style={{
                        width: s.w,
                        height: s.h,
                        top: s.top,
                        left: s.left,
                        right: s.right,
                        bottom: s.bottom,
                        opacity: s.opacity,
                    }}
                />
            ))}
        </div>
    )
}

// ─── GSAP Split Headline ──────────────────────────────────────────────────
function SplitHeadline({ text, className, delay = 0 }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (isInView) {
                const split = new SplitText(ref.current, { type: 'chars,words' })
                gsap.fromTo(split.chars,
                    { opacity: 0, y: 50, rotationX: -55, transformOrigin: '50% 100%' },
                    { opacity: 1, y: 0, rotationX: 0, duration: 0.8, ease: 'silk', stagger: 0.025, delay }
                )
            }
        }, ref)

        return () => ctx.revert()
    }, [isInView, delay])
    return <h1 ref={ref} className={className} style={{ perspective: '600px' }}>{text}</h1>
}

// ─── Magnetic Category Pill ───────────────────────────────────────────────
function MagneticPill({ cat, isActive, onClick }) {
    const ref = useRef(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const sx = useSpring(x, { stiffness: 280, damping: 22 })
    const sy = useSpring(y, { stiffness: 280, damping: 22 })

    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect()
        x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
        y.set((e.clientY - (r.top + r.height / 2)) * 0.28)
    }
    const onLeave = () => { x.set(0); y.set(0) }

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ x: sx, y: sy }}
            whileTap={{ scale: 0.94 }}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${isActive
                ? 'bg-[#0f4f24] text-white border-[#0f4f24] shadow-lg shadow-[#0f4f24]/20'
                : 'bg-white text-slate-500 border-slate-200 hover:border-[#3bab35] hover:text-[#3bab35]'
                }`}
        >
            {cat}
        </motion.button>
    )
}

// ─── Animated Search Input ────────────────────────────────────────────────
function SearchInput({ query, setQuery }) {
    const [focused, setFocused] = useState(false)
    return (
        <motion.div
            animate={{ width: focused ? 320 : 240 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative"
        >
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
                type="text"
                placeholder="Search articles…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3bab35]/30 focus:border-[#3bab35] placeholder:text-slate-400 transition shadow-sm"
            />
        </motion.div>
    )
}

// ─── Featured Card ────────────────────────────────────────────────────────
function FeaturedCard({ blog, navigate }) {
    const ref = useRef(null)
    const imgRef = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    // Persistent animations (Parallax)
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (imgRef.current) {
                gsap.fromTo(imgRef.current, {
                    y: '-10%'
                }, {
                    y: '5%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 0.8,
                        fastScrollEnd: true
                    },
                    lazy: true
                })
            }
        }, ref)
        return () => ctx.revert()
    }, [])

    // One-time entrance
    useLayoutEffect(() => {
        if (!isInView) return
        const ctx = gsap.context(() => {
            gsap.fromTo(ref.current,
                { clipPath: 'inset(2% 1% 2% 1% round 24px)', opacity: 0, scale: 0.99 },
                {
                    clipPath: 'inset(0% 0% 0% 0% round 24px)',
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                    delay: 0.05,
                    lazy: true,
                    force3D: true
                }
            )
        }, ref)
        return () => ctx.revert()
    }, [isInView])

    const handleMove = (e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -4 // Reduced intensity for stability
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 4
        gsap.to(el, {
            rotationX: rx,
            rotationY: ry,
            duration: 0.4,
            ease: 'power2.out',
            transformPerspective: 1000,
            force3D: true
        })
    }
    const handleLeave = () => gsap.to(ref.current, { rotationX: 0, rotationY: 0, duration: 0.8, ease: 'elastic.out(1,0.5)' })

    return (
        <article
            ref={ref}
            onClick={() => navigate(`/blog/${blog.id}`)}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="group relative overflow-hidden rounded-3xl cursor-pointer col-span-full"
            style={{
                willChange: 'transform, opacity',
                transformStyle: 'preserve-3d',
                opacity: 0,
                transform: 'scale(0.98)'
            }}
        >
            {/* Image with parallax */}
            <div className="relative h-[280px] sm:h-[420px] md:h-[500px] w-full overflow-hidden">
                <img ref={imgRef} src={blog.image} alt={blog.title}
                    className="h-[115%] w-full object-cover group-hover:scale-[1.03] transition-transform duration-1000"
                />
                {/* Layered gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-60" />

                {/* Shimmer on hover */}
                <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    whileHover={{ opacity: 1, x: '200%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 w-1/3 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)', skewX: '-15deg' }}
                />
            </div>

            {/* Featured badge */}
            <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute top-5 left-5 bg-[#3bab35] text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
            >
                Featured
            </motion.span>

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                    className="text-2xl sm:text-3xl md:text-[2.6rem] font-bold text-white leading-[1.15] max-w-2xl"
                >
                    {blog.title}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                    className="mt-3 text-white/65 text-sm sm:text-base leading-relaxed line-clamp-2 max-w-xl hidden sm:block"
                >
                    {blog.excerpt}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.65 }}
                    className="mt-5 flex items-center gap-4"
                >
                    <span className="text-white/45 text-xs font-medium">{blog.date}</span>
                    {blog.readTime && (
                        <span className="flex items-center gap-1.5 text-white/45 text-xs">
                            <Clock size={11} /> {blog.readTime}
                        </span>
                    )}
                    <motion.span
                        whileHover={{ gap: '12px' }}
                        className="ml-auto flex items-center gap-2 text-white font-bold text-sm tracking-wide"
                    >
                        Read article
                        <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                            <ArrowRight size={15} />
                        </motion.span>
                    </motion.span>
                </motion.div>
            </div>
        </article>
    )
}

// ─── Blog Card ────────────────────────────────────────────────────────────
function BlogCard({ blog, navigate, index }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    useLayoutEffect(() => {
        if (!isInView) return
        const ctx = gsap.context(() => {
            gsap.fromTo(ref.current,
                { opacity: 0, y: 30, scale: 0.98 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                    delay: (index % 3) * 0.06,
                    lazy: true,
                    force3D: true
                }
            )
        }, ref)
        return () => ctx.revert()
    }, [isInView])

    const handleMove = (e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -8
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 8
        gsap.to(el, {
            rotationX: rx,
            rotationY: ry,
            duration: 0.35,
            ease: 'power2.out',
            transformPerspective: 800,
            boxShadow: '0 20px 40px rgba(15,79,36,0.1)',
            force3D: true
        })
    }
    const handleLeave = () => {
        gsap.to(ref.current, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.7,
            ease: 'elastic.out(1,0.5)',
            boxShadow: '0 0px 0px rgba(0,0,0,0)'
        })
    }

    return (
        <article
            ref={ref}
            onClick={() => navigate(`/blog/${blog.id}`)}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 hover:border-[#3bab35]/25 cursor-pointer shadow-none"
            style={{
                willChange: 'transform, opacity',
                transformStyle: 'preserve-3d',
                opacity: 0,
                transform: 'translateY(30px) scale(0.98)'
            }}
        >
            {/* Image */}
            <div className="relative h-52 overflow-hidden flex-shrink-0">
                <img src={blog.image} alt={blog.title}
                    className="h-full w-full object-cover group-hover:scale-[1.06] duration-700 ease-out"
                />
                {/* Scan-line reveal on hover */}
                <motion.div
                    initial={{ scaleY: 0, originY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-gradient-to-t from-[#0f4f24]/40 to-transparent pointer-events-none"
                />

                {/* Category chip */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0f4f24] text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {blog.category}
                </span>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 sm:p-6">
                <h2 className="text-[15.5px] font-semibold text-slate-900 leading-snug group-hover:text-[#0f4f24] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                </h2>
                <p className="mt-2.5 text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                    {blog.excerpt}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 text-xs text-slate-400">
                        <span>{blog.date}</span>
                        {blog.readTime && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                <span className="flex items-center gap-1"><Clock size={10} /> {blog.readTime}</span>
                            </>
                        )}
                    </div>
                    <motion.span
                        whileHover={{ x: 3 }}
                        className="text-[#3bab35] font-bold text-xs flex items-center gap-1"
                    >
                        Read
                        <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}>
                            <ArrowRight size={12} />
                        </motion.span>
                    </motion.span>
                </div>
            </div>
        </article>
    )
}

// ─── Empty State ──────────────────────────────────────────────────────────
function EmptyState() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-full flex flex-col items-center justify-center py-24 text-center"
        >
            {/* Icon */}
            <motion.div
                animate={{ rotate: [0, 8, -8, 0], y: [0, -8, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-5 flex items-center justify-center text-slate-400"
            >
                <SearchIcon className="w-14 h-14" />
            </motion.div>

            {/* Heading */}
            <p className="text-lg font-semibold text-slate-500">
                No articles found
            </p>

            {/* Subtext */}
            <p className="text-sm mt-1 text-slate-400">
                Try a different search or category
            </p>
        </motion.div>
    )
}

// ─── Main Page ─────────────────────────────────────────────────────────────
function BlogsPage() {
    const navigate = useNavigate()
    const [activeCategory, setActiveCategory] = useState(ALL)
    const [query, setQuery] = useState('')
    const gridRef = useRef(null)

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22 })

    const filtered = blogs.filter(b => {
        const matchCat = activeCategory === ALL || b.category === activeCategory
        const matchQ = query.trim() === '' || b.title.toLowerCase().includes(query.toLowerCase()) || b.excerpt?.toLowerCase().includes(query.toLowerCase())
        return matchCat && matchQ
    })
    const [featured, ...rest] = filtered

    // Animate badge + subheading on mount
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.blog-badge',
                { opacity: 0, y: -14, letterSpacing: '0.5em' },
                { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 0.9, ease: 'silk', delay: 0.05 }
            )
            gsap.fromTo('.blog-sub',
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'silk', delay: 0.5 }
            )
            gsap.fromTo('.blog-filter-row',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'silk', delay: 0.65 }
            )
        })

        return () => ctx.revert()
    }, [])

    // Category / search switch
    const handleCategoryChange = (cat) => {
        if (cat === activeCategory) return
        setActiveCategory(cat)
    }

    return (
        <section className="relative min-h-screen bg-[#f7faf7] py-14 sm:py-20 text-slate-900 overflow-hidden">

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

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">

                {/* ── Header ── */}
                <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
                    <span className="blog-badge inline-block text-xs font-bold uppercase tracking-[0.35em] text-[#3bab35] mb-4">
                        Our Blog
                    </span>

                    <SplitHeadline
                        text="Stories & Insights"
                        delay={0.2}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0f4f24] leading-[1.1] tracking-tight"
                    />

                    <p className="blog-sub mt-4 text-slate-500 text-base sm:text-lg leading-relaxed">
                        Fresh perspectives on wellness, self-care, and mindful living — all in one place.
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

                {/* ── Search + Filter ── */}
                <div className="blog-filter-row flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
                    <SearchInput query={query} setQuery={setQuery} />
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <MagneticPill key={cat} cat={cat} isActive={activeCategory === cat} onClick={() => handleCategoryChange(cat)} />
                        ))}
                    </div>
                </div>

                {/* ── Blog Grid ── */}
                <div ref={gridRef} className="relative min-h-[600px]">
                    <AnimatePresence mode="wait">
                        {filtered.length === 0 ? (
                            <EmptyState key="empty" />
                        ) : (
                            <motion.div
                                key={activeCategory}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                            >
                                {featured && <FeaturedCard blog={featured} navigate={navigate} />}
                                {rest.map((blog, i) => (
                                    <BlogCard key={blog.id} blog={blog} navigate={navigate} index={i + 1} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    )
}

export default BlogsPage