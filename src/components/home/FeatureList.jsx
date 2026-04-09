import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import img1 from '../../assets/details1.jpg'
import img2 from '../../assets/details2.jpg'
import img3 from '../../assets/details3.jpg'
import img4 from '../../assets/details4.jpg'
import img5 from '../../assets/details5.jpg'
import homeImg from '../../assets/home.png'
import aemahPhoto from '../../assets/aemah-iqbal.jpg'
import { HeartPulseIcon, LeafIcon } from 'lucide-react'

const features = [
    { title: 'Set Goals', desc: 'Define what you want to achieve', image: img1 },
    { title: 'Personal Profile', desc: 'Fill in your details for tailored recommendations', image: img2 },
    { title: 'Health Assessment', desc: 'Answer questions to help us create your plan', image: img3 },
    { title: 'Expert Supports', desc: 'Connect with our team for guidance', image: img4 },
    { title: 'AI Based Diagnosis', desc: 'Diagnose yourself through AI', image: img5 },
]

// shared animation system
const fade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
}

const stagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
}

function FeaturesSection() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [read, setRead] = useState(false);

    const feature = features[index]

    useEffect(() => {
        if (paused) return
        const timer = setInterval(() => {
            setIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1))
        }, 4000)
        return () => clearInterval(timer)
    }, [paused])

    return (
        <section className="bg-gradient-to-br from-[#f4fcf5] via-[#d9f4dc] to-[#e0f6df] px-6 py-20">

            {/* TOP SLIDER */}
            <div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-2 items-center">

                {/* LEFT */}
                <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6">
                    <motion.h2 variants={fade} className="text-3xl sm:text-4xl font-bold text-[#0f4f24]">
                        Your Personalized Mental Wellness Companion
                    </motion.h2>

                    <motion.p variants={fade} className="text-slate-600 max-w-md">
                        The mobile app that redefines therapy with personalized assessments. Set goals, create a customized profile, undergo health assessments, and receive expert support.
                    </motion.p>

                    {/* dots */}
                    <div className="flex gap-3 mt-4">
                        {features.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`h-2.5 rounded-full transition-all ${i === index ? 'w-6 bg-[#3bab35]' : 'w-2.5 bg-[#3bab35]/30'
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT */}
                <div
                    className="relative h-[350px] sm:h-[420px] w-full overflow-hidden rounded-3xl shadow-2xl"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            variants={fade}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute inset-0"
                        >
                            <img src={feature.image} className="h-full w-full object-cover" />

                            <div className="absolute inset-0 bg-black/40" />

                            <div className="absolute bottom-0 p-6 text-white">
                                <h3 className="text-xl font-semibold">{feature.title}</h3>
                                <p className="mt-2 text-sm text-white/90 max-w-sm">{feature.desc}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* SHOWCASE */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mx-auto mt-20 max-w-7xl"
            >
                <div className="relative overflow-hidden rounded-[2rem]">

                    <div className="mx-auto max-w-7xl mt-20 grid gap-12 md:grid-cols-2 items-center">

                        {/* IMAGE */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex justify-center rounded-xl"
                        >
                            <motion.img
                                src={homeImg}
                                className="w-[260px] sm:w-[320px] md:w-[360px] object-contain drop-shadow-2xl rounded-xl"
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </motion.div>

                        {/* TEXT */}
                        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-5">

                            <motion.h3 variants={fade} className="text-3xl sm:text-4xl font-bold text-slate-900">
                                Prioritizing Your Well-Being
                            </motion.h3>

                            <motion.p variants={fade} className="max-w-xl text-slate-600">
                                AYour well-being is of paramount importance to us. We are devoted to ensuring you have seamless access to your counselor or therapist, offering the guidance and support necessary to nurture a healthy, balanced, and fulfilling life.
                            </motion.p>

                            <motion.div variants={stagger} className="flex flex-wrap gap-10">
                                <motion.a
                                    href="#"
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="group inline-flex items-center gap-3 rounded-full"
                                >
                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3bab35] text-white transition group-hover:rotate-6">
                                        <HeartPulseIcon size={24} />
                                    </span>

                                    <span className="text-md font-medium text-slate-800">
                                        Health and Fitness
                                    </span>
                                </motion.a>
                                <motion.a
                                    href="#"
                                    whileHover={{ scale: 1.04, y: -2 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="group inline-flex items-center gap-3 rounded-full"
                                >
                                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3bab35] text-white transition group-hover:rotate-6">
                                        <LeafIcon size={24} />
                                    </span>

                                    <span className="text-md font-medium text-slate-800">
                                        Healthy Diet
                                    </span>
                                </motion.a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* FOUNDER NOTE */}
            <motion.div
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.8 }}
                className="mx-auto mt-24 max-w-7xl px-2"
            >
                <div className="relative overflow-hidden rounded-[2rem] py-6 sm:py-12">

                    <motion.div
                        animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute right-0 bottom-0 h-40 w-40 rounded-full bg-[#3bab35]/10 blur-3xl"
                    />

                    <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">

                        {/* IMAGE SIDE */}
                        <motion.div
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="relative flex justify-center"
                        >
                            <div className="relative group">

                                {/* image */}
                                <motion.img
                                    src={aemahPhoto}
                                    alt="Aemah Iqbal"
                                    className="relative w-[260px] sm:w-[320px] md:w-[360px] rounded-[2rem] object-cover shadow-2xl"
                                />

                                {/* name badge */}
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-18px] rounded-full bg-white px-6 py-3 text-sm font-semibold shadow-lg">
                                    Aemah Iqbal
                                </div>

                                {/* role badge */}
                                <div className="absolute top-4 left-4 rounded-full bg-[#3bab35] px-3 py-1 text-xs tracking-wider text-white shadow-md">
                                    Founder
                                </div>
                            </div>
                        </motion.div>

                        {/* TEXT SIDE */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={{
                                visible: { transition: { staggerChildren: 0.15 } }
                            }}
                            className="space-y-6 flex flex-col justify-start"
                        >
                            {/* HEADING */}
                            <motion.h3
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                className="text-3xl sm:text-4xl font-bold text-[#0f4f24]"
                            >
                                Founder’s Note
                            </motion.h3>

                            {/* TEXT WRAPPER */}
                            <motion.div
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                initial={false}
                                animate={{ height: read ? "auto" : 120 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="relative overflow-hidden"
                            >
                                <p className="text-slate-600 leading-5 tracking-wide text-sm">
                                    In a world where mental health care is often inaccessible and stigmatized, especially in places like Pakistan, where I am from, my vision for our app aims to bridge the gap between those in need and the therapists who can genuinely make a difference. Our mission is to connect clients with therapists who meet their specific needs and understand their unique cultural contexts. Just as a well-fitted glove provides comfort and protection, finding the right therapist can offer the crucial support and guidance individuals need to navigate their mental health journeys. Our app stands out by offering immediate support during crises. In urgent need, clients can connect with the earliest available therapist, ensuring they receive timely help without the distress of waiting and repeated rejections. This feature is designed to alleviate the immense toll that seeking mental health care can take, especially in emergencies. Inspired by personal experiences and a deep-seated commitment to mental health advocacy, particularly in taboo regions, our app is more than just a tool—it's a lifeline. By leveraging technology, we strive to make mental health care accessible, empathetic, and effective for everyone, regardless of their background or circumstances. Together, we can foster a world where mental health is prioritized, and everyone has the support they need to thrive.
                                </p>
                            </motion.div>

                            {/* CTA */}
                            <motion.button
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                onClick={() => setRead(prev => !prev)}
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.96 }}
                                className="group relative mt-2 inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#3bab35] px-8 py-3 text-sm font-semibold text-white shadow-lg w-36"
                            >
                                <span className="relative z-10">
                                    {read ? "Read Less" : "Read More"}
                                </span>

                                {/* shine animation */}
                                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition duration-700 group-hover:translate-x-[100%]" />
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default FeaturesSection