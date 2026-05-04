import { motion, AnimatePresence } from 'framer-motion'
import { Quote, ArrowRight } from 'lucide-react'
import BreathingOrb from '../../ui/BreathingOrb'
import aemahPhoto from '../../../assets/aemah-iqbal.png'
import { ease } from './feature-data'

export default function FoundersNote({ founderRef, readMore, setReadMore }) {
  return (
    <div ref={founderRef} className="scene-panel relative overflow-hidden p-7 sm:p-10 lg:p-12">
      <BreathingOrb className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#3bab35]/07 blur-[80px]" duration={14} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,171,53,0.05),transparent_50%)]" />

      <motion.div
        layout
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative grid items-center gap-10 lg:grid-cols-[0.78fr_1.22fr]"
      >
        {/* Photo */}
        <motion.div
          layout
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          data-founder-photo
          className="flex justify-center lg:justify-start"
        >
          <div className="group relative">
            <motion.div
              className="absolute -inset-3 rounded-[38px] border border-[#3bab35]/20"
              animate={{ scale: [1, 1.015, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -inset-6 rounded-[44px] border border-[#3bab35]/10"
              animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            <div className="relative overflow-hidden rounded-[32px] shadow-[0_30px_80px_rgba(15,79,36,0.18)]">
              <img
                src={aemahPhoto}
                alt="Aemah Iqbal"
                className="h-[400px] w-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e12]/60 via-transparent to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl bg-white/90 px-4 py-3 backdrop-blur-xl"
              >
                <div className="h-2 w-2 rounded-full bg-[#3bab35]" />
                <div>
                  <p className="text-sm font-bold text-[#0a2e12]">Aemah Iqbal</p>
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-slate-400">Founder & Visionary</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Quote content */}
        <motion.div
          layout
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          data-founder-quote
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#3bab35]" data-gsap-line />
            <span className="section-kicker">Founder's note</span>
          </div>

          <h3 className="section-heading mt-5 max-w-xl">
            Built to reduce the emotional friction of asking for help
          </h3>

          <div className="relative mt-7">
            <Quote
              size={40}
              className="absolute -left-2 -top-3 text-[#3bab35]/20"
              strokeWidth={1}
            />
            <motion.div
              layout
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className={`relative pl-6 text-sm leading-[1.4] whitespace-pre-wrap text-slate-500 sm:text-[0.95rem] ${!readMore ? 'line-clamp-6' : ''}`}>
                In a world where mental health care is often out of reach or surrounded by stigma, especially in places like Pakistan, where I come from, our vision is to close the gap between those seeking help and the professionals who can truly support them. Our goal is to connect individuals with a certified online therapist who not only fits their needs but also understands their cultural background and personal experiences. Just like a well-fitted glove brings ease and protection, the right match through personalized therapy recommendations can offer the comfort and direction people need on their mental health journey.
                <br />
                <br />
                What sets our app apart is its ability to provide immediate care when it matters most. In moments of urgency, users can access an online psychologist consultation with the earliest available therapist, ensuring timely support without the frustration of long waits or repeated rejections. This approach helps reduce the emotional burden that often comes with seeking mental wellness counselling online, particularly during critical situations.
                <br />
                <br />
                Rooted in personal experiences and a strong commitment to mental health advocacy, especially in regions where these conversations are still considered taboo, this platform goes beyond being just a service. It becomes a lifeline. By combining technology with empathy, we aim to make emotional wellness counselling more accessible, understanding, and effective for people from all walks of life. The vision is simple: a world where mental health is treated as a priority, and everyone has the support they need to move forward with strength and clarity.
              </p>
            </motion.div>
            <AnimatePresence>
              {!readMore && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"
                />
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={() => setReadMore((p) => !p)}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.26 }}
            className="group relative mt-7 inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#0f4f24] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(15,79,36,0.22)]"
          >
            <motion.span
              className="absolute inset-0 bg-[#3bab35]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.35, ease: ease.out }}
            />
            <span className="relative z-10">{readMore ? 'Read less' : 'Read full note'}</span>
            <motion.span
              className="relative z-10"
              animate={{ rotate: readMore ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowRight size={14} />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
