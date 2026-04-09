import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Clock, User, Tag, ChevronRight, ChevronLeft } from 'lucide-react'
import { blogs } from '../data/blogs'
import { useEffect, useState, useRef } from 'react'

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
    }),
}

const slideIn = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, x: -60, transition: { duration: 0.4, ease: 'easeIn' } },
}

// Content Block Renderers 
function ParagraphBlock({ block, idx }) {
    return (
        <motion.p
            key={idx}
            custom={idx}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="text-[17px] leading-[1.85] text-slate-600 whitespace-pre-wrap"
        >
            {block.text}
        </motion.p>
    )
}

function HeadingBlock({ block, idx }) {
    return (
        <motion.h2
            key={idx}
            custom={idx}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="text-2xl sm:text-3xl font-semibold text-[#0f4f24] mt-10 mb-3 leading-tight"
        >
            {block.text}
        </motion.h2>
    )
}

function ListBlock({ block, idx }) {
    return (
        <motion.ul
            key={idx}
            custom={idx}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-2 pl-2"
        >
            {block.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[17px] text-slate-600 leading-relaxed">
                    <span className="mt-[6px] flex-shrink-0 w-[7px] h-[7px] rounded-full bg-[#3bab35]" />
                    {item}
                </li>
            ))}
        </motion.ul>
    )
}

function BannerBlock({ block, idx }) {
    const isCta = block.style === 'cta';
    const hasImage = block.style === 'image';
    const navigate = useNavigate();

    return (
        <motion.div
            key={idx}
            custom={idx}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className={`my-8 rounded-2xl overflow-hidden ${isCta
                ? 'bg-gradient-to-br from-[#2e8f34] to-[#0a3d18] p-8 sm:p-10 text-white'
                : 'bg-gradient-to-br from-[#1a5c22] to-[#0a3d18] text-white'
                }`}
        >
            <div className={hasImage ? 'flex flex-col md:flex-row items-stretch' : ''}>
                {hasImage && block.image && (
                    <div className="md:w-2/5 h-56 md:h-auto overflow-hidden">
                        <img
                            src={block.image}
                            alt={block.heading}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className={`${hasImage ? 'md:w-3/5 flex flex-col justify-center' : ''}`}>
                    <h3 className="text-2xl font-semibold leading-snug">{block.heading}</h3>
                    <p className="mt-3 text-white/80 text-[16px] leading-relaxed">{block.text}</p>
                    {block.buttonText && (
                        <button className="mt-5 self-start inline-flex items-center gap-2 bg-white text-[#0f4f24] text-sm font-semisemibold px-5 py-2.5 rounded-full hover:bg-green-50 transition-all duration-200 group" onClick={() => navigate('/contact')}>
                            {block.buttonText}
                            <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

function TableBlock({ block, idx }) {
    return (
        <motion.div
            key={idx}
            custom={idx}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="my-8 overflow-x-auto rounded-xl border border-slate-200"
        >
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="bg-[#f0faf2]">
                        {block.data.headers.map((h, i) => (
                            <th key={i} className="px-5 py-3.5 font-semisemibold text-[#0f4f24] border-b border-slate-200 whitespace-nowrap">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {block.data.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={`transition-colors ${rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-green-50/40`}>
                            {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-5 py-3.5 text-slate-600 border-b border-slate-100">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </motion.div>
    )
}

function FAQBlock({ block, idx }) {
    const [openIdx, setOpenIdx] = useState(null)
    return (
        <motion.div
            key={idx}
            custom={idx}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="my-8"
        >
            <h3 className="text-2xl font-semibold text-[#0f4f24] mb-5">Frequently Asked Questions</h3>
            <div className="space-y-3">
                {block.data.map((item, fIdx) => (
                    <div
                        key={fIdx}
                        className="border border-slate-200 rounded-xl overflow-hidden"
                    >
                        <button
                            className="w-full flex items-center justify-between px-5 py-4 text-left font-semisemibold text-slate-800 hover:bg-green-50/40 transition-colors"
                            onClick={() => setOpenIdx(openIdx === fIdx ? null : fIdx)}
                        >
                            <span className="text-[15px]">{item.question}</span>
                            <motion.span
                                whileInView={{ rotate: openIdx === fIdx ? 45 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-[#3bab35] flex-shrink-0 ml-4 text-xl leading-none font-light"
                            >
                                +
                            </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                            {openIdx === fIdx && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    whileInView={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                >
                                    <p className="px-5 pb-5 pt-1 text-slate-6000 text-[15px] leading-relaxed border-t border-slate-100">
                                        {item.answer}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

function ContentRenderer({ content }) {
    if (!content) return null
    return (
        <div className="space-y-5">
            {content.map((block, idx) => {
                if (block.type === 'paragraph') return <ParagraphBlock key={idx} block={block} idx={idx} />
                if (block.type === 'heading') return <HeadingBlock key={idx} block={block} idx={idx} />
                if (block.type === 'list') return <ListBlock key={idx} block={block} idx={idx} />
                if (block.type === 'banner') return <BannerBlock key={idx} block={block} idx={idx} />
                if (block.type === 'table') return <TableBlock key={idx} block={block} idx={idx} />
                if (block.type === 'faq') return <FAQBlock key={idx} block={block} idx={idx} />
                return null
            })}
        </div>
    )
}

// Related Card
function RelatedCard({ blog, navigate, onHover }) {
    return (
        <motion.div
            layout
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            onClick={() => navigate(`/blog/${blog.id}`)}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 hover:border-[#3bab35]/30 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-400 cursor-pointer w-full sm:w-[calc(50%-12px)]"
        >
            <div className="relative h-56 overflow-hidden rounded-tr rounded-tl-2xl bg-slate-100">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0f4f24] text-xs font-semisemibold uppercase tracking-widest px-3 py-1 rounded-full">
                    {blog.category}
                </span> */}
            </div>
            <div className="p-4">
                <h3 className="text-[16px] font-semisemibold text-slate-900  leading-snug group-hover:text-[#3bab35] transition-colors line-clamp-2">
                    {blog.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-400">{blog.date}</p>
            </div>
        </motion.div>
    )
}

// Main Component
function BlogDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [readProgress, setReadProgress] = useState(0)
    const articleRef = useRef(null)
    const VISIBLE = 2

    const blog = blogs.find(b => b.id === id)

    useEffect(() => {
        if (isPaused) return
        const iv = setInterval(() => {
            setCurrentIndex(p => (p + 1) % blogs.length)
        }, 3500)
        return () => clearInterval(iv)
    }, [isPaused])

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 60)
            if (!articleRef.current) return
            const { top, height } = articleRef.current.getBoundingClientRect()
            const progress = Math.min(100, Math.max(0, ((window.scrollY - (articleRef.current.offsetTop - window.innerHeight * 0.1)) / (height - window.innerHeight)) * 100))
            setReadProgress(progress)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const visibleBlogs = Array.from({ length: VISIBLE }, (_, i) =>
        blogs[(currentIndex + i) % blogs.length]
    )

    const viewedBlogIndex = blogs.findIndex(b => b.id === id)

    const handlePrev = () => {
        const prevIdx = (viewedBlogIndex - 1 + blogs.length) % blogs.length
        navigate(`/blog/${blogs[prevIdx].id}`)
    }

    const handleNext = () => {
        const nextIdx = (viewedBlogIndex + 1) % blogs.length
        navigate(`/blog/${blogs[nextIdx].id}`)
    }

    //  404 State 
    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold text-[#0f4f24] mb-3">Blog not found</h1>
                    <p className="text-slate-500 mb-8">This article may have been moved or removed.</p>
                    <button
                        onClick={() => navigate('/blogs')}
                        className="inline-flex items-center gap-2 rounded-full bg-[#3bab35] px-8 py-3 text-sm font-semisemibold text-white hover:bg-[#2f8f2d] transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Blogs
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            {/*  Read Progress Bar  */}
            <div
                className="fixed top-0 left-0 z-50 h-[3px] bg-[#3bab35] transition-all duration-100"
                style={{ width: `${readProgress}%` }}
            />

            <motion.article
                ref={articleRef}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="min-h-screen bg-white relative"
            >
                {/* arrows */}
                <button
                    onClick={handlePrev}
                    className="fixed left-5 top-1/2 -translate-y-1/2 text-[#3bab35] z-50 p-2 rounded-full bg-white/20 backdrop-blur-md border border-[#3bab35]/20 hover:bg-[#3bab35] hover:text-white transition-all duration-300 shadow-lg group hover:scale-110 active:scale-95"
                    aria-label="Previous blog"
                >
                    <ChevronLeft size={32} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <button
                    onClick={handleNext}
                    className="fixed right-5 top-1/2 -translate-y-1/2 text-[#3bab35] z-50 p-2 rounded-full bg-white/20 backdrop-blur-md border border-[#3bab35]/20 hover:bg-[#3bab35] hover:text-white transition-all duration-300 shadow-lg group hover:scale-110 active:scale-95"
                    aria-label="Next blog"
                >
                    <ChevronRight size={32} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/*  Sticky Nav Back Button  */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className={`sticky top-0 z-40 px-4 sm:px-8 py-3 flex items-center transition-all duration-300 ${scrolled
                        ? 'bg-white/90 backdrop-blur-md border-b border-slate-100'
                        : 'bg-transparent'
                        }`}
                >
                    <button
                        onClick={() => navigate('/blogs')}
                        className="inline-flex items-center gap-2 text-[#3bab35] font-medium text-sm hover:gap-3 hover:text-[#0f4f24] transition-all duration-200 group"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                        Back to Blogs
                    </button>
                </motion.div>

                {/*  Hero  */}
                <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 mt-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full h-[260px] sm:h-[380px] md:h-[520px] overflow-hidden rounded-2xl sm:rounded-3xl"
                    >
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        {/* Category over image */}
                        {/* <span className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm text-[#0f4f24] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
                            {blog.category}
                        </span> */}
                    </motion.div>
                </div>

                {/* Content */}
                <div className="md:mx-40 mx-auto max-w-full px-4 sm:px-6 py-10 sm:py-14">

                    {/* Header */}
                    <motion.div
                        custom={0}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        className="mb-8"
                    >
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#0f4f24] leading-tight mb-5">
                            {blog.title}
                        </h1>

                        {/* Meta Row */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-500">
                            {blog.author && (
                                <span className="flex items-center gap-1.5">
                                    <User size={14} className="text-[#3bab35]" />
                                    <span className="font-medium text-slate-700">{blog.author}</span>
                                </span>
                            )}
                            <span className="flex items-center gap-1.5">
                                <Clock size={14} className="text-[#3bab35]" />
                                {blog.readTime || '5 min read'}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Tag size={14} className="text-[#3bab35]" />
                                {blog.date}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="mt-6 h-px bg-gradient-to-r from-[#3bab35]/30 via-[#3bab35]/10 to-transparent" />
                    </motion.div>

                    {/* Blog Content */}
                    {blog.content
                        ? <ContentRenderer content={blog.content} />
                        : (
                            <motion.p
                                custom={1}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.15 }}
                                className="text-[17px] leading-[1.85] text-slate-600"
                            >
                                {blog.excerpt}
                            </motion.p>
                        )
                    }

                    {/* Author Card */}
                    {blog.author && (
                        <motion.div
                            custom={3}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            className="mt-14 flex items-center gap-5 rounded-2xl border border-slate-200 bg-[#f8fdf8] p-5 sm:p-6"
                        >
                            <div className="flex-shrink-0 relative">
                                {blog.authorImage
                                    ? <img
                                        src={blog.authorImage}
                                        alt={blog.author}
                                        className="h-14 w-14 rounded-full object-cover ring-2 ring-[#3bab35]/30"
                                    />
                                    : (
                                        <div className="h-14 w-14 rounded-full bg-[#e0f5e1] flex items-center justify-center text-[#0f4f24] font-semibold text-lg">
                                            {blog.author.charAt(0)}
                                        </div>
                                    )
                                }
                                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#3bab35] border-2 border-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 ">{blog.author}</p>
                                <p className="text-sm text-slate-500 mt-0.5">Wellness Expert at Soul Whispers</p>
                            </div>
                        </motion.div>
                    )}

                    {/*  Related Articles  */}
                    <div className="mt-16">
                        <motion.div
                            custom={4}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.15 }}
                            className="flex items-center justify-between mb-6"
                        >
                            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0f4f24]">Related Articles</h2>
                            <button
                                onClick={() => navigate('/blogs')}
                                className="text-sm text-[#3bab35] font-medium hover:text-[#0f4f24] transition-colors flex items-center gap-1 group"
                            >
                                View all
                                <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Carousel Dots */}
                        {/* <div className="flex gap-1.5 mb-5">
                            {blogs.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-[#3bab35]' : 'w-1.5 bg-slate-200 dark:bg-slate-700'}`}
                                />
                            ))}
                        </div> */}

                        <div className="flex flex-wrap sm:flex-nowrap gap-6 overflow-hidden">
                            <AnimatePresence mode="wait" initial={false}>
                                {visibleBlogs.map((b) => (
                                    <RelatedCard
                                        key={b.id + currentIndex}
                                        blog={b}
                                        navigate={navigate}
                                        onHover={setIsPaused}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.article>
        </>
    )
}

export default BlogDetailPage