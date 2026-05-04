import { memo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTilt } from './feature-hooks'
import { ease } from './feature-data'

// Step pill
export const StepPill = memo(function StepPill({ step, index, active, onClick }) {
  return (
    <motion.button
      onClick={() => onClick(index)}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.28, ease: ease.out }}
      className={`group relative w-full overflow-hidden rounded-[20px] border p-4 text-left transition-all duration-400 ${active
          ? 'border-[#3bab35]/50 bg-gradient-to-br from-[#3bab35]/10 via-[#3bab35]/5 to-transparent shadow-[0_12px_40px_rgba(59,171,53,0.14)]'
          : 'border-[#0f4f24]/10 bg-white/60 hover:border-[#3bab35]/25 hover:bg-white/80'
        }`}
    >
      {active && (
        <motion.div
          layoutId="step-active-bg"
          className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[#3bab35]/8 to-transparent"
          transition={{ duration: 0.45, ease: ease.out }}
        />
      )}
      <div className="relative flex items-center gap-3">
        <motion.div
          animate={{
            backgroundColor: active ? 'rgba(59,171,53,0.18)' : 'rgba(15,79,36,0.07)',
            scale: active ? 1.08 : 1,
          }}
          transition={{ duration: 0.35 }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#0f4f24]"
        >
          <step.icon size={18} strokeWidth={1.6} />
        </motion.div>
        <div className="min-w-0">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-[#3bab35]">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-0.5 truncate text-sm font-semibold text-[#0f4f24]">{step.title}</h3>
        </div>
      </div>
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#3bab35] to-transparent"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: ease.out }}
        />
      )}
    </motion.button>
  )
})

// Main feature card
export const FeatureCard = memo(function FeatureCard({ step, index }) {
  const tilt = useTilt(5)

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className="relative overflow-hidden rounded-[32px] border border-[#3bab35]/25 bg-white shadow-[0_30px_80px_rgba(15,79,36,0.10)]"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#3bab35]/8 blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#3bab35]/6 blur-[50px]" />

      <div className="relative grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-7 sm:p-9">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.55, delay: 0.15, type: 'spring', bounce: 0.55 }}
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3bab35]/18 to-[#0f4f24]/8 text-[#0f4f24]"
          >
            <step.icon size={28} strokeWidth={1.5} />
            <motion.div
              className="absolute inset-0 rounded-2xl border border-[#3bab35]/30"
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-6 text-[0.65rem] font-bold uppercase tracking-[0.36em] text-[#3bab35]"
          >
            Step {String(index + 1).padStart(2, '0')}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: ease.out }}
            className="mt-3 text-2xl font-bold leading-[1.18] text-[#0a2e12] sm:text-3xl lg:text-4xl"
          >
            {step.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: ease.out }}
            className="mt-4 text-sm leading-[1.85] text-slate-500 sm:text-[0.95rem]"
          >
            {step.desc}
          </motion.p>
        </div>

        <div className="flex items-center justify-center bg-slate-50/50 p-6 lg:p-0">
          <motion.div
            key={step.image}
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, ease: ease.out }}
            className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl lg:aspect-auto lg:h-full lg:rounded-none lg:shadow-none"
          >
            <img
              src={step.image}
              alt={step.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 lg:bottom-6 lg:right-6 z-[2] flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/40 px-2.5 py-1.5 sm:px-3 sm:py-1.5 lg:px-4 lg:py-2 backdrop-blur-xl border border-white/10">

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-white/90">
                Step
              </span>

              <span className="font-['Cormorant_Garamond',serif] text-lg sm:text-xl lg:text-2xl font-light text-white">
                {String(index + 1).padStart(2, '0')}
              </span>

            </div>
            <motion.div
              className="absolute inset-x-0 z-[2] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
})

// Pillar card
export const PillarCard = memo(function PillarCard({ title, description, icon: Icon, delay = 0 }) {
  const tilt = useTilt(6)
  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMove}
      onMouseLeave={tilt.onLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.75, delay, ease: ease.out }}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[28px] border border-[#0f4f24]/10 bg-white p-6 shadow-[0_8px_30px_rgba(15,79,36,0.06)] transition-shadow duration-400 hover:shadow-[0_20px_60px_rgba(15,79,36,0.12)]"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#3bab35]/6 blur-[40px] transition-all duration-500 group-hover:bg-[#3bab35]/14" />
      <motion.div
        whileHover={{ rotate: [0, -8, 8, 0], scale: 1.12 }}
        transition={{ duration: 0.5 }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3bab35]/14 to-[#0f4f24]/6 text-[#0f4f24]"
      >
        <Icon size={24} strokeWidth={1.6} />
      </motion.div>
      <h3 className="mt-5 text-lg font-bold text-[#0a2e12]">{title}</h3>
      <p className="mt-2 text-sm leading-[1.8] text-slate-500">{description}</p>
      <motion.div
        className="mt-5 h-px bg-gradient-to-r from-[#3bab35]/40 to-transparent"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.3, ease: ease.out }}
      />
    </motion.div>
  )
})

// Vertical timeline dot
export const TimelineDot = memo(function TimelineDot({ active, done, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.25 }}
      whileTap={{ scale: 0.9 }}
      className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center"
    >
      <motion.div
        animate={{
          scale: active ? 1.5 : 1,
          backgroundColor: active ? '#3bab35' : done ? '#3bab35' : '#d1fae5',
          boxShadow: active ? '0 0 0 6px rgba(59,171,53,0.18)' : '0 0 0 0px transparent',
        }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.45 }}
        className="h-3.5 w-3.5 rounded-full border-2 border-white shadow-md"
      />
    </motion.button>
  )
})
