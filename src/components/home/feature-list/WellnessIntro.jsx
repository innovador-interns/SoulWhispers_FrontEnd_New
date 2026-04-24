import { motion } from 'framer-motion'
import BreathingOrb from '../../ui/BreathingOrb'
import { PillarCard } from './FeatureComponents'
import { supportPillars, ease } from './feature-data'

function AnimatedBorder() {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[28px] overflow-hidden">
      {/* Soft glowing border frame */}
      <motion.div
        className="absolute inset-0 rounded-[28px] border border-[#3bab35]/20"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          boxShadow: [
            'inset 0 0 20px rgba(59,171,53,0.1)',
            'inset 0 0 30px rgba(59,171,53,0.2)',
            'inset 0 0 20px rgba(59,171,53,0.1)'
          ]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Corner accent glow dots - subtle pulsing */}
      <motion.div
        className="absolute -top-2 -left-2 w-5 h-5 bg-[#3bab35]/10 rounded-full blur-lg"
        animate={{
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
      <motion.div
        className="absolute -top-2 -right-2 w-5 h-5 bg-[#3bab35]/10 rounded-full blur-lg"
        animate={{
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
      />
      <motion.div
        className="absolute -bottom-2 -right-2 w-5 h-5 bg-[#3bab35]/10 rounded-full blur-lg"
        animate={{
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
      />
      <motion.div
        className="absolute -bottom-2 -left-2 w-5 h-5 bg-[#3bab35]/10 rounded-full blur-lg"
        animate={{
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5
        }}
      />
    </div>
  )
}

export default function WellnessIntro() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease: ease.out }}
      className="scene-panel relative overflow-hidden p-7 sm:p-10"
    >
      <AnimatedBorder />

      <BreathingOrb className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-[#3bab35]/14 blur-[70px]" />
      <BreathingOrb className="absolute right-10 bottom-0 h-32 w-32 rounded-full bg-[#3bab35]/08 blur-[50px]" duration={11} delay={2} />

      <div className="relative grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div>
          <div className="flex items-center gap-3">
            <motion.span
              className="h-px w-10 bg-[#3bab35]"
              data-gsap-line
            />
            <span className="section-kicker">Guided journey</span>
          </div>
          <h2
            data-gsap-reveal
            className="section-heading mt-5 max-w-lg"
          >
            A more intentional wellness journey from first reflection to lasting support
          </h2>
        </div>
        <p
          data-gsap-reveal
          className="section-copy max-w-xl self-end text-slate-500 lg:mt-12"
        >
          We redesigned the experience as a sequence of calm, focused scenes so each step feels understandable, supportive, and emotionally safe.
        </p>
      </div>

      <div className="relative my-8 h-px bg-gradient-to-r from-[#3bab35]/30 via-[#3bab35]/10 to-transparent" data-gsap-line />

      <div className="grid gap-5 sm:grid-cols-2">
        {supportPillars.map((p, i) => (
          <PillarCard key={p.title} {...p} delay={i * 0.12} />
        ))}
      </div>
    </motion.div>
  )
}
