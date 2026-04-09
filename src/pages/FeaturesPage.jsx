import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clientFeatures, consultantFeatures } from '../data/client&cons'

// Animation Variants
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
    }),
}

const slideX = (dir) => ({
    hidden: { opacity: 0, x: dir === 'left' ? -40 : 40 },
    visible: {
        opacity: 1, x: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
})

// Feature Row
function FeatureRow({ feature, index }) {
    const isEven = index % 2 === 1
    const textDir = isEven ? 'right' : 'left'
    const imgDir = isEven ? 'left' : 'right'

    return (
        <motion.div
            custom={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center`}
        >
            {/* Text */}
            <motion.div
                variants={slideX(textDir)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
            >
                {/* Step badge */}
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#3bab35]">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#e3f5e1] text-[#3bab35] font-bold text-[11px]">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    Feature
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-[#0f4f24] leading-tight">
                    {feature.title}
                </h3>

                <p className="text-[16px] text-slate-500 leading-[1.50]">
                    {feature.description}
                </p>

                {/* Decorative green line */}
                <div className="w-12 h-[3px] rounded-full bg-[#3bab35]/40" />
            </motion.div>

            {/* Image */}
            <motion.div
                variants={slideX(imgDir)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`${isEven ? 'lg:order-1' : 'lg:order-2'} flex justify-center`}
            >
                <div className="relative w-full max-w-[460px] mx-auto">
                    {/* Soft glow behind image */}
                    <div className="absolute inset-0 rounded-3xl bg-[#3bab35]/8 blur-2xl scale-90 -z-10" />

                    {/* Card frame */}
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#f2faf2]shadow-sm">
                        <motion.img
                            src={feature.image}
                            alt={feature.title}
                            className="w-full h-[260px] sm:h-[340px] object-contain"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

// Main Page
function FeaturesPage() {
    const [activeTab, setActiveTab] = useState('clients')
    const features = activeTab === 'clients' ? clientFeatures : consultantFeatures

    return (
        <section className="min-h-screen bg-[#f7faf7] py-16 sm:py-24 px-4 sm:px-6">
            <div className="container mx-auto max-w-6xl">

                {/* Header */}
                <motion.div
                    custom={0}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-12 sm:mb-16"
                >
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.35em] text-[#3bab35] mb-3">
                        What we offer
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#0f4f24] mb-4 leading-tight">
                        Powerful Features
                    </h1>
                    <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                        Discover everything designed to support your mental wellness journey — for clients and consultants alike.
                    </p>
                </motion.div>

                {/* Tab Toggle */}
                <motion.div
                    custom={1}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-center mb-14 sm:mb-20"
                >
                    <div className="relative flex w-full max-w-xs bg-white rounded-full p-1 shadow-md border border-slate-200/80">
                        {/* Sliding pill */}
                        <motion.div
                            layout
                            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-[#0f4f24]"
                            style={{ left: activeTab === 'clients' ? '4px' : 'calc(50%)' }}
                        />

                        {['clients', 'consultant'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 ${activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {tab === 'clients' ? 'For Clients' : 'For Consultants'}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Feature List */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="space-y-20 sm:space-y-28"
                    >
                        {features.map((feature, index) => (
                            <FeatureRow key={index} feature={feature} index={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>

            </div>
        </section>
    )
}

export default FeaturesPage