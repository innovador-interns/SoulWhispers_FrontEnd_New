import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import appStoreImg from '../../assets/app-store.png'
import googlePlayImg from '../../assets/google-play.png'
import mentalHealthImg from '../../assets/Mental-Health-Psychiatrist.jpg'
import nutritionImg from '../../assets/Nutrition.jpg'
import dietitianImg from '../../assets/Dietitian.jpg'
import healthImg from '../../assets/Health.jpg'
import { useNavigate } from 'react-router-dom'

const slides = [
    {
        badge: 'Balanced Living',
        heading: 'Healthy Eating Made Simple',
        description:
            'Receive online diet consultation from a tele-dietitian with personalized therapeutic diet plans and sustainable nutrition strategies for your long-term health.',
        image: nutritionImg,
    },
    {
        badge: 'Mindful Wellness',
        heading: 'Find Harmony in Every Meal',
        description:
            'Support your wellness journey with thoughtful meal planning, habit coaching, and mindful eating guidance.',
        image: mentalHealthImg,
    },
    {
        badge: 'Nutrition Coaching',
        heading: 'Personalized Plans That Work',
        description:
            'Get tailored diet plans, progress tracking, and sustainable goals designed for your lifestyle.',
        image: dietitianImg,
    },
    {
        badge: 'Wellness Support',
        heading: 'Build Better Health Habits',
        description:
            'Create lasting routines with expert advice, balanced meals, and accountability that keeps you moving forward.',
        image: healthImg,
    },
]

// Animations
const fadeSlide = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.4, ease: 'easeIn' },
    },
}

function HeroSlider() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const navigate = useNavigate();

    const slide = slides[activeIndex];

    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setActiveIndex((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
            )
        }, 5000);

        return () => clearInterval(timer);
    }, [isPaused])

    const handlePrev = () => {
        setActiveIndex((prev) =>
            prev === 0 ? slides.length - 1 : prev - 1
        )
    }

    const handleNext = () => {
        setActiveIndex((prev) =>
            prev === slides.length - 1 ? 0 : prev + 1
        )
    }

    return (
        <motion.section
            className="relative overflow-hidden"
            variants={fadeSlide}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
        >
            {/* Background layer */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    variants={fadeSlide}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${slide.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-[#266623]/60" />
                </motion.div>
            </AnimatePresence>

            {/* Content layer */}
            <div className="relative mx-auto max-w-6xl py-28 text-center text-white px-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        variants={fadeSlide}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex flex-col items-center gap-6"
                    >
                        <span className="rounded-full bg-white/20 px-4 py-2 text-sm uppercase tracking-widest">
                            {slide.badge}
                        </span>

                        <h1 className="text-4xl sm:text-5xl font-extrabold max-w-3xl">
                            {slide.heading}
                        </h1>

                        <p className="mx-auto w-[85%] max-w-2xl text-base sm:text-lg text-white/90 sm:w-full px-4 sm:px-0">
                            {slide.description}
                        </p>

                        <motion.button
                            onClick={() => navigate('/contact')}
                            className="relative overflow-hidden rounded-full bg-[#3bab35] px-8 py-2 font-semibold text-white shadow-xl"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            {/* shimmer layer */}
                            <motion.span
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.6), transparent 70%)',
                                }}
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: 'linear',
                                }}
                            />

                            {/* button text */}
                            <span className="relative z-10">Book a Session</span>
                        </motion.button>

                        <motion.p className="text-lg italic text-white/90">
                            Soul Whispers - Your Path to Inner Peace
                        </motion.p>
                    </motion.div>
                </AnimatePresence>

                {/* store buttons */}
                <div className="flex justify-center gap-4 mt-8">
                    <motion.a
                        href="https://apps.apple.com/pk/app/soul-whispers/id6514315560"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <img src={appStoreImg} className="h-12" />
                    </motion.a>
                    <motion.a
                        href="https://play.google.com/store/apps/details?id=com.innovadorsolutions.soulwispers"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <img src={googlePlayImg} className="h-12" />
                    </motion.a>
                </div>

                {/* dots */}
                <div className="flex justify-center gap-2 mt-6">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-2.5 rounded-full transition-all ${index === activeIndex
                                ? 'w-6 bg-[#3bab35]'
                                : 'w-2.5 bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* arrows */}
            <button
                onClick={handlePrev}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-white"
            >
                <ChevronLeft size={32} />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-white"
            >
                <ChevronRight size={32} />
            </button>
        </motion.section>
    )
}

export default HeroSlider