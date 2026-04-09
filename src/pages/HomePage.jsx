import { motion } from 'framer-motion'
import { fadeInUp } from '../lib/animations'
import HeroSlider from '../components/home/HeroSlider'
import FeatureList from '../components/home/FeatureList'
import BlogPreview from '../components/home/BlogPreview'
import AdvisorSection from '../components/home/AdvisorSection'
import TestimonialSection from '../components/home/TestimonialSection'

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <HeroSlider />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <FeatureList />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <AdvisorSection />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <BlogPreview />
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <TestimonialSection />
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage
