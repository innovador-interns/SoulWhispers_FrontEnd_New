import { motion } from 'framer-motion'

function BreathingOrb({
  className = '',
  duration = 8,
  delay = 0,
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`${className} will-change-[transform,opacity]`}
      animate={{
        scale: [1, 1.08, 0.96, 1],
        opacity: [0.3, 0.55, 0.35, 0.3],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default BreathingOrb
