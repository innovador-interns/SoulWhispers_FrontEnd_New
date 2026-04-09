import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { blogs } from '../data/blogs'
import { ArrowRight, Clock, Search } from 'lucide-react'

//  Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 },
    }),
}

//  Get all unique categories 
const ALL = 'All'
const categories = [ALL, ...Array.from(new Set(blogs.map(b => b.category)))]

//  Featured Card (first blog)
function FeaturedCard({ blog, navigate }) {
    return (
        <motion.article
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onClick={() => navigate(`/blog/${blog.id}`)}
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer col-span-full mb-2"
        >
            {/* Image */}
            <div className="relative h-[280px] sm:h-[400px] md:h-[480px] w-full overflow-hidden">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
            </div>

            {/* Text overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                {/* <span className="inline-block bg-[#3bab35] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                    {blog.category}
                </span> */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight max-w-2xl">
                    {blog.title}
                </h2>
                <p className="mt-3 text-white/70 text-sm sm:text-base leading-relaxed line-clamp-2 max-w-xl hidden sm:block">
                    {blog.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-4">
                    <span className="text-white/50 text-xs">{blog.date}</span>
                    {blog.readTime && (
                        <span className="flex items-center gap-1 text-white/50 text-xs">
                            <Clock size={12} />
                            {blog.readTime}
                        </span>
                    )}
                    <span className="ml-auto flex items-center gap-1.5 text-white font-semibold text-sm group-hover:gap-2.5 transition-all duration-200">
                        Read article <ArrowRight size={15} />
                    </span>
                </div>
            </div>
        </motion.article>
    )
}

//  Regular Blog Card 
function BlogCard({ blog, navigate, index }) {
    return (
        <motion.article
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onClick={() => navigate(`/blog/${blog.id}`)}
            className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-100 hover:border-[#3bab35]/30 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-400 cursor-pointer"
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden flex-shrink-0">
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0f4f24] text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {blog.category}
                </span> */}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5 sm:p-6">
                <h2 className="text-[16px] font-semibold text-slate-900 leading-snug group-hover:text-[#0f4f24] transition-colors line-clamp-2">
                    {blog.title}
                </h2>
                <p className="mt-2.5 text-sm text-slate-500 leading-relaxed line-clamp-3 flex-1">
                    {blog.excerpt}
                </p>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span>{blog.date}</span>
                        {blog.readTime && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-slate-200" />
                                <span className="flex items-center gap-1">
                                    <Clock size={11} />
                                    {blog.readTime}
                                </span>
                            </>
                        )}
                    </div>
                    <span className="text-[#3bab35] font-semibold text-xs flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                        Read <ArrowRight size={13} />
                    </span>
                </div>
            </div>
        </motion.article>
    )
}

//  Main Page 
function BlogsPage() {
    const navigate = useNavigate()
    const [activeCategory, setActiveCategory] = useState(ALL)
    const [query, setQuery] = useState('')

    const filtered = blogs.filter(b => {
        const matchCat = activeCategory === ALL || b.category === activeCategory
        const matchQ = query.trim() === '' || b.title.toLowerCase().includes(query.toLowerCase()) || b.excerpt?.toLowerCase().includes(query.toLowerCase())
        return matchCat && matchQ
    })

    const [featured, ...rest] = filtered

    return (
        <section className="min-h-screen bg-[#f7faf7] py-14 sm:py-20 text-slate-900">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">

                {/* Header */}
                <motion.div
                    custom={0}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-2xl mx-auto text-center mb-10 sm:mb-14"
                >
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.35em] text-[#3bab35] mb-3">
                        Our Blog
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-semibold text-[#0f4f24] leading-tight">
                        Stories & Insights
                    </h1>
                    <p className="mt-4 text-slate-500 text-base sm:text-lg leading-relaxed">
                        Fresh perspectives on wellness, self-care, and mindful living — all in one place.
                    </p>
                </motion.div>

                {/* Search + Filter Row */}
                <motion.div
                    custom={1}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8"
                >
                    {/* Search */}
                    <div className="relative flex-1 max-w-sm">
                        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search articles…"
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3bab35]/30 focus:border-[#3bab35] placeholder:text-slate-400 transition"
                        />
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-200 ${activeCategory === cat
                                    ? 'bg-[#0f4f24] text-white border-[#0f4f24]'
                                    : 'bg-white text-slate-500 border-slate-200 hover:border-[#3bab35] hover:text-[#3bab35]'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Blog Grid */}
                {filtered.length === 0 ? (
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        className="text-center py-24 text-slate-400"
                    >
                        <p className="text-lg font-medium">No articles found</p>
                        <p className="text-sm mt-1">Try a different search or category.</p>
                    </motion.div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {/* Featured — spans full width */}
                        {featured && (
                            <FeaturedCard blog={featured} navigate={navigate} />
                        )}

                        {/* Rest of the grid */}
                        {rest.map((blog, i) => (
                            <BlogCard key={blog.id} blog={blog} navigate={navigate} index={i + 1} />
                        ))}
                    </div>
                )}

            </div>
        </section>
    )
}

export default BlogsPage