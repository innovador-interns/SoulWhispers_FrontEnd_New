import { motion } from 'framer-motion'
import testimonialImage from '../../assets/iqbal-sheikh.jpg'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

function TestimonialSection() {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.div
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[#3bab35]">
            Testimonials
          </p>

          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-[#0f4f24] leading-tight">
            Trusted by professionals for meaningful mental health support
          </h2>
        </motion.div>

        {/* CARD */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-10 rounded-[32px] bg-white/80 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-white/40 lg:grid-cols-[320px_1fr]"
        >

          {/* IMAGE */}
          <motion.div
            variants={item}
            className="flex items-center justify-center"
          >
            <div className="relative overflow-hidden rounded-[28px]">
              <img
                src={testimonialImage}
                alt="Iqbal Yousuf Shaikh"
                className="h-80 w-80 object-cover rounded-[28px] transform-gpu transition duration-700 hover:scale-105"
              />

              {/* subtle glow */}
              <div className="absolute inset-0 rounded-[28px] ring-1 ring-black/5" />
            </div>
          </motion.div>

          {/* CONTENT */}
          <motion.div
            variants={item}
            className="flex flex-col justify-between"
          >
            <div>
              {/* QUOTE ICON */}
              <div className="text-5xl text-[#3bab35] opacity-20 leading-none">
                “
              </div>

              <p className="mt-0 text-md md:text-lg leading-relaxed text-slate-700">
                As I see SoulWhispers would be a game-changer in mental health management. As a Tech person I could see the innovation and implementation of Artificial Intelligence features make this app unique and catering to today’s needs. This is going to be a great service for remote areas where physical availability of therapist is challenge. The intuitive interface and powerful features allow us to focus on what matters most. Highly recommended, not only for those who are in need of mental health diagnosis and therapy but also for the Counsellors and Therapists.
              </p>
            </div>

            {/* AUTHOR */}
            <div className="mt-10 flex items-center gap-4 border-t pt-6">
              <div className="h-12 w-12 rounded-full bg-[#3bab35]/10 flex items-center justify-center text-[#3bab35] font-semibold">
                IY
              </div>

              <div>
                <p className="text-lg font-semibold text-slate-900">
                  Iqbal Yousuf Shaikh
                </p>
                <p className="text-sm text-slate-500">
                  Innovador Solutions
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}

export default TestimonialSection