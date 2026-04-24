import { motion, useScroll, useSpring } from 'framer-motion'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  })

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-1 bg-white/10 backdrop-blur-sm">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[#0f4f24] via-[#3bab35] to-[#7ecb74]"
        style={{ scaleX }}
      />
    </div>
  )
}

export default ScrollProgress
