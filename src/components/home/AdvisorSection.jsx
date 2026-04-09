import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import sheebaImg from "../../assets/sheeba-farhan.png";
import nasreenImg from "../../assets/maam-nasreen.png";
import tahirImg from "../../assets/tahir-aziz.png";
import screen1 from "../../assets/screen1.jpg";
import screen2 from "../../assets/screen2.jpg";
import screen3 from "../../assets/screen3.jpg";
import screen4 from "../../assets/screen4.jpg";
import screen5 from "../../assets/screen5.jpg";
import screen6 from "../../assets/screen6.jpg";
import appStoreImg from "../../assets/app-store.png";
import googlePlayImg from "../../assets/google-play.png";

const advisors = [
  {
    name: "Dr. Sheeba Farhan",
    role: "Assistant Professor at FUUAST",
    img: sheebaImg,
  },
  {
    name: "Nasreen Iqbal",
    role: "COO at Innovador Solutions",
    img: nasreenImg,
  },
  {
    name: "Tahir Aziz",
    role: "MD at Innovador Solutions",
    img: tahirImg,
  },
];

const screens = [
  screen1,
  screen2,
  screen3,
  screen4,
  screen5,
  screen6,
];

export default function AdvisorSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % screens.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="bg-slate-50 py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* BOARD OF ADVISORS */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f4f24]">
            Board of Advisors
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {advisors.map((advisor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="w-40 h-40 rounded-full overflow-hidden border-4 border-green-600 shadow-lg"
                >
                  <img
                    src={advisor.img}
                    alt={advisor.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <h3 className="mt-4 text-lg font-semibold text-[#0f4f24]">
                  {advisor.name}
                </h3>
                <p className="text-sm text-slate-500 text-center">
                  {advisor.role}
                </p>

                <div className="mt-3 w-12 h-[2px] bg-green-600" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* FEATURES SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* IMAGE SLIDER */}
          <div
            className="relative w-full max-w-lg mx-auto overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={screens[index]}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                className="rounded-3xl shadow-2xl absolute w-full"
              />
            </AnimatePresence>

            {/* ! spacer */}
            <img
              src={screens[0]}
              className="invisible w-full rounded-3xl"
              alt=""
            />
          </div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-[#0f4f24]">Features</h3>

            <p className="text-[#0f4f24] leading-7">
              The Soul Whispers app aims to provide a comprehensive mental health therapy experience through advanced AI-driven assessment, personalized therapy recommendations, and user-friendly features for seamless interaction between users and therapists. By focusing on user comfort, privacy, and effective therapy matching, the app aims to improve mental well-being and support users on their journey to better mental health.
            </p>

            <div className="grid grid-cols-2 gap-4 text-md text-[#0f4f24]">
              <ul className="space-y-2">
                <li>• AI Assessment</li>
                <li>• Therapy Recommendation</li>
                <li>• Profile Management</li>
              </ul>
              <ul className="space-y-2">
                <li>• Appointment Booking</li>
                <li>• Daily Feedback</li>
                <li>• Health Coach</li>
              </ul>
            </div>

            {/* store buttons */}
            <div className="flex justify-start gap-4 mt-8">
              <motion.a
                href="https://apps.apple.com/pk/app/soul-whispers/id6514315560"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <img src={appStoreImg} className="h-10" />
              </motion.a>
              <motion.a
                href="https://play.google.com/store/apps/details?id=com.innovadorsolutions.soulwispers"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <img src={googlePlayImg} className="h-10" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
