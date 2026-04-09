import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { limitedBlogs } from "../../data/blogs";
import { fadeInUp } from "../../lib/animations";

export default function BlogPreview() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visibleCount = 3;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % limitedBlogs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Get visible blogs
  const visibleBlogs = Array.from({ length: visibleCount }, (_, i) => limitedBlogs[(currentIndex + i) % limitedBlogs.length]);

  return (
    <section className="bg-slate-50 py-20 px-6 overflow-hidden">
      <motion.div className="max-w-7xl mx-auto" variants={fadeInUp}>
        <div className="flex items-center justify-center mb-10 relative">
          <h2 className="text-3xl sm:text-4xl text-center font-bold text-[#0f4f24]">Latest Blogs</h2>
          <button
            onClick={() => navigate("/blogs")}
            className="text-sm font-semibold text-[#3bab35] hover:underline absolute right-0"
          >
            See All →
          </button>
        </div>

        <div
          className="relative overflow-hidden flex gap-6"
        >
          <AnimatePresence initial={false}>
            {visibleBlogs.slice(0,4).map(blog => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className="flex-shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] overflow-hidden cursor-pointer"
                onClick={() => navigate(`/blog/${blog.id}`)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="h-60 w-full overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs uppercase tracking-widest text-[#3bab35]">{blog.category}</span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900 leading-snug">{blog.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{blog.date}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}