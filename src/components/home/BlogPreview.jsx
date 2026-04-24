import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { limitedBlogs } from '../../data/blogs'

function getCardsPerPage(width) {
  if (width >= 1024) return 3
  if (width >= 768) return 2
  return 1
}

export default function BlogPreview() {
  const navigate = useNavigate()
  const [cardsPerPage, setCardsPerPage] = useState(() =>
    getCardsPerPage(typeof window === 'undefined' ? 1440 : window.innerWidth),
  )
  const [page, setPage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(getCardsPerPage(window.innerWidth))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const pages = useMemo(() => {
    const chunks = []
    for (let index = 0; index < limitedBlogs.length; index += cardsPerPage) {
      chunks.push(limitedBlogs.slice(index, index + cardsPerPage))
    }
    return chunks
  }, [cardsPerPage])

  useEffect(() => {
    setPage((prev) => Math.min(prev, Math.max(pages.length - 1, 0)))
  }, [pages.length])

  useEffect(() => {
    if (isPaused || pages.length <= 1) return undefined

    const interval = window.setInterval(() => {
      setPage((prev) => (prev + 1) % pages.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [isPaused, pages.length])

  const visibleBlogs = pages[page] ?? []

  return (
    <section className="section-space px-4 sm:px-6 lg:px-8">
      <div className="container">
        <div className="scene-panel overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <span className="section-kicker">Latest reflections</span>
              <h2 className="section-heading mt-5">
                Editorial guidance that extends the same calm experience beyond the app
              </h2>
              <p className="section-copy mt-4 max-w-2xl">
                The blog area now follows the same container, spacing, and card rhythm as the rest of the page, so it feels stable instead of visually detached.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPage((prev) => (prev === 0 ? pages.length - 1 : prev - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0f4f24]/10 bg-white/80 text-[#0f4f24]"
                aria-label="Previous blog page"
              >
                <ArrowLeft size={18} />
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPage((prev) => (prev + 1) % pages.length)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0f4f24]/10 bg-white/80 text-[#0f4f24]"
                aria-label="Next blog page"
              >
                <ArrowRight size={18} />
              </motion.button>
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/blogs')}
                className="inline-flex items-center gap-2 rounded-full bg-[#0f4f24] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(15,79,36,0.16)]"
              >
                See all blogs
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </div>

          <div
            className="mt-10"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${cardsPerPage}-${page}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`grid gap-5 ${cardsPerPage === 1 ? 'grid-cols-1' : cardsPerPage === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}
              >
                {visibleBlogs.map((blog, index) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    className="surface-card surface-card-hover group cursor-pointer overflow-hidden flex flex-col h-full"
                  >
                    <div className="overflow-hidden rounded-t-[28px]">
                      <motion.img
                        src={blog.image}
                        alt={blog.title}
                        className="h-64 w-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <span className="text-xs uppercase tracking-[0.32em] text-[#3bab35]">
                        {blog.category}
                      </span>
                      <h3 className="mt-4 text-xl font-semibold leading-snug text-[#0f4f24] line-clamp-2 min-h-[3.5rem]">
                        {blog.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{blog.date}</p>
                      <div className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0f4f24]">
                        Read article
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight size={15} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {pages.length > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === page ? 'w-8 bg-[#0f4f24]' : 'w-2.5 bg-[#3bab35]/30'
                  }`}
                  aria-label={`Go to blog page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
