import { motion } from 'framer-motion'
import BreathingOrb from '../../ui/BreathingOrb'
import homeImg from '../../../assets/home.png'
import { ease } from './feature-data'

export default function MobileSanctuary() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: ease.out }}
        className="scene-panel relative overflow-hidden p-7 sm:p-10"
      >
        <BreathingOrb className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[#3bab35]/10 blur-[60px]" duration={10} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,171,53,0.06),transparent_55%)]" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#3bab35]" data-gsap-line />
            <span className="section-kicker">Mobile sanctuary</span>
          </div>
          <h3 data-gsap-reveal className="section-heading mt-5 max-w-xl">
            Prioritizing your well-being in a format that feels reassuring, not clinical
          </h3>
          <p data-gsap-reveal className="section-copy mt-5 max-w-lg text-slate-500">
            The app experience focuses on a softer structure, clearer actions, and more space to pause, helping people stay grounded while navigating deeply personal decisions through stress management counselling online, counselling sessions online, and guidance from an online wellness consultant.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {['Daily check-ins', 'Therapist access', 'Mindful habit support'].map((pill, i) => (
              <motion.span
                key={pill}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: ease.out }}
                whileHover={{ y: -2, scale: 1.04 }}
                className="cursor-default rounded-full border border-[#0f4f24]/14 bg-white/80 px-5 py-2.5 text-sm font-medium text-[#0f4f24] shadow-[0_2px_12px_rgba(15,79,36,0.06)] backdrop-blur-sm"
              >
                {pill}
              </motion.span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-0 border-t border-[#0f4f24]/8 pt-7">
            {[
              { val: '98%', label: 'Satisfaction' },
              { val: '2.4k+', label: 'Users' },
              { val: '24/7', label: 'Support' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: ease.out }}
                className={`${i !== 0 ? 'border-l border-[#0f4f24]/8 pl-4' : ''}`}
              >
                <p className="font-['Cormorant_Garamond',serif] text-3xl font-light text-[#0a2e12]">{s.val}</p>
                <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 32 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: ease.out }}
        className="flex aspect-square items-center justify-center overflow-hidden rounded-[32px]"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full flex justify-center"
          >
            <motion.img
              src={homeImg}
              alt="Soul Whispers mobile app"
              className="relative w-full max-w-[480px] rounded-2xl object-cover drop-shadow-2xl"
              whileHover={{ scale: 1.03, rotateY: 5 }}
              transition={{ duration: 0.5, ease: ease.out }}
              style={{ transformStyle: 'preserve-3d' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
