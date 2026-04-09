import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: 'How does the app help with mental wellness?',
    answer: 'Our app provides personalized assessments, goal setting, and connects you with certified therapists for tailored mental health support.'
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Yes, we use industry-standard encryption and comply with privacy regulations to ensure your personal information remains confidential.'
  },
  {
    question: 'Can I access therapy sessions anytime?',
    answer: 'Our platform offers flexible scheduling with therapists available during various time slots to accommodate your needs.'
  },
  {
    question: 'What makes Soul Whispers different from other apps?',
    answer: 'We focus on culturally aware support, combining AI-driven insights with human connection for a holistic wellness experience.'
  },
  {
    question: 'How do I get started?',
    answer: 'Simply download the app, create your profile, complete the initial assessment, and start your personalized wellness journey.'
  }
]

function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="container mx-auto px-6 py-16 bg-slate-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl text-[#0f4f24] font-semibold mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Find answers to common questions about our mental wellness platform and how it can support your journey.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-md shadow border border-slate-200 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <span className="text-lg text-slate-900 pr-4">
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-slate-500" />
              </motion.div>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default FaqsPage
