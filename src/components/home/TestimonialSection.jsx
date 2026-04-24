import { motion } from 'framer-motion'
import testimonialImage from '../../assets/iqbal-sheikh.jpg'

function TestimonialSection() {
  return (
    <section className="section-space !mt-0 px-4 pb-20 sm:px-6 lg:px-8">
      <div className="container mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="scene-panel flex flex-col lg:flex-row items-center gap-10 overflow-hidden p-6 sm:p-8 lg:p-10"
        >

          {/* IMAGE SIDE (SMALL + CONTROLLED) */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-[240px] w-[320px] overflow-hidden rounded-[24px] sm:h-[320px]">
              <img
                src={testimonialImage}
                alt="Iqbal Yousuf Shaikh"
                className="h-full w-full object-contain"
              />

              {/* <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(15,79,36,0.35))]" /> */}
            </div>
          </div>

          {/* CONTENT SIDE (BALANCED WITH SMALL IMAGE) */}
          <div className="flex h-full flex-col justify-center">

            <div>
              <span className="section-kicker">Testimonial</span>

              <div className="mt-5 text-6xl leading-none text-[#3bab35]/20">
                “
              </div>

              <p className="mt-3 text-base leading-7 text-slate-700 sm:text-lg">
                As I see SoulWhispers would be a game-changer in mental health management. The innovation and implementation of artificial intelligence features make this app especially relevant to today’s needs. It has the potential to be a meaningful service for remote areas where access to therapists is limited, while offering an interface and feature set that feel intuitive and genuinely helpful for both clients and professionals.
              </p>
            </div>

            {/* AUTHOR */}
            <div className="mt-8 flex items-center gap-4 border-t border-[#0f4f24]/10 pt-5">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3bab35]/12 font-semibold text-[#0f4f24]">
                IY
              </div>

              <div>
                <p className="text-base font-semibold text-[#0f4f24]">
                  Iqbal Yousuf Shaikh
                </p>
                <p className="text-sm text-slate-600">
                  Innovador Solutions
                </p>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default TestimonialSection