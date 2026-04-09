import { Link } from 'react-router-dom'
import { Facebook, Linkedin } from 'lucide-react'
import appStoreImg from '../assets/app-store.png'
import googlePlayImg from '../assets/google-play.png'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

function Footer() {
  return (
    <motion.footer
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-[radial-gradient(circle_at_top,_rgba(74,222,128,0.18),_transparent_35%),linear-gradient(180deg,#2e8f34,#0f4f24)] text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          variants={container}
          className="grid gap-10 lg:grid-cols-3"
        >

          {/* LINKS */}
          <motion.div variants={item}>
            <h3 className="text-lg font-semibold text-white">Shortcut links</h3>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              {["Home", "Features", "Blogs", "FAQs", "Contact"].map((text, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                  transition={{ type: "tween" }}
                >
                  <Link
                    to={text === "Home" ? "/" : `/${text.toLowerCase().replace(" ", "")}`}
                    className="transition hover:text-white"
                  >
                    {text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* FEATURES */}
          <motion.div variants={item}>
            <h3 className="text-lg font-semibold text-white">Features</h3>
            <ul className="mt-6 space-y-3 text-sm text-slate-200">
              {["Health & Fitness", "Healthy Diet"].map((text, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    to={`/${text.toLowerCase().replace(" ", "")}`}
                    className="transition hover:text-white"
                  >
                    {text}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <motion.a
                href="https://apps.apple.com/pk/app/soul-whispers/id6514315560"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
              >
                <img src={appStoreImg} className="h-12" />
              </motion.a>

              <motion.a
                href="https://play.google.com/store/apps/details?id=com.innovadorsolutions.soulwispers"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                target="_blank"
              >
                <img src={googlePlayImg} className="h-12" />
              </motion.a>
            </div>
          </motion.div>

          {/* CONTACT */}
          <motion.div variants={item}>
            <h3 className="text-lg font-semibold text-white">Contact with us</h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-200">
              <motion.li whileHover={{ x: 5 }}>
                +92 332 466 6823
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                info@soulwhispers.live
              </motion.li>
            </ul>
          </motion.div>

        </motion.div>
      </div>

      {/* BOTTOM BAR */}
      <motion.div
        variants={item}
        className="border-t border-white/10"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 text-sm text-slate-200 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 Soul Whispers by <span className="font-semibold text-white">Innovador Solutions</span> | All Rights Reserved
          </p>

          <div className="flex items-center gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="transition hover:text-white"
            >
              <Facebook size={18} />
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="transition hover:text-white"
            >
              <Linkedin size={18} />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  )
}

export default Footer