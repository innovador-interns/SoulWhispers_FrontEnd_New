import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { TimelineDot, FeatureCard, StepPill } from './FeatureComponents'
import { featureSteps, ease } from './feature-data'
import { ScrollTrigger } from '../../../lib/gsap'
import { gsap } from '../../../lib/gsap'
import BackgroundLines from '../../ui/BackgroundLines'

export default function HowItWorks({ storytellingRef, activeIndex, updateActiveIndex, activeIndexRef }) {
  const activeStep = featureSteps[activeIndex]

  return (
    <div ref={storytellingRef} className="scene-panel overflow-hidden p-7 sm:p-10">
      <BackgroundLines />
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-[#3bab35]" data-gsap-line />
            <span className="section-kicker">How it works</span>
          </div>
          <h2 data-gsap-reveal className="section-heading mt-4 max-w-xl">
            Five calm steps to lasting support
          </h2>
        </div>
        <div className="hidden shrink-0 items-baseline gap-1.5 lg:flex">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="font-['Cormorant_Garamond',serif] text-5xl font-light text-[#0a2e12]"
            >
              {String(activeIndex + 1).padStart(2, '0')}
            </motion.span>
          </AnimatePresence>
          <span className="font-['Cormorant_Garamond',serif] text-xl text-slate-300">
            / {String(featureSteps.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="hidden lg:grid lg:grid-cols-[48px_1fr_300px] lg:gap-8">
        <div className="flex flex-col items-center pt-1">
          <div className="relative flex flex-col items-center gap-0">
            {featureSteps.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center">
                <TimelineDot
                  active={i === activeIndex}
                  done={i < activeIndex}
                  onClick={() => updateActiveIndex(i)}
                />
                {i < featureSteps.length - 1 && (
                  <div className="relative h-16 w-px overflow-hidden bg-[#e5e7eb]">
                    <motion.div
                      className="absolute top-0 w-full bg-[#3bab35]"
                      animate={{ height: i < activeIndex ? '100%' : '0%' }}
                      transition={{ duration: 0.5, ease: ease.out }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <AnimatePresence mode="wait">
            <FeatureCard key={activeIndex} step={activeStep} index={activeIndex} />
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-3">
          {featureSteps.map((step, i) => (
            <StepPill
              key={step.title}
              step={step}
              index={i}
              active={i === activeIndex}
              onClick={updateActiveIndex}
            />
          ))}
        </div>
      </div>

      <div className="space-y-5 lg:hidden">
        {featureSteps.map((step, i) => (
          <motion.div
            key={step.title}
            data-story-card
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: ease.out }}
            onClick={() => updateActiveIndex(i)}
            className={`cursor-pointer transition-all duration-400 ${i === activeIndex ? 'scale-[1.01]' : 'opacity-85'}`}
          >
            <FeatureCard step={step} index={i} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
