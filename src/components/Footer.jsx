import { Link } from 'react-router-dom'
import { Facebook, Linkedin } from 'lucide-react'
import appStoreImg from '../assets/app-store.png'
import googlePlayImg from '../assets/google-play.png'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.18,
      duration: 0.8,
      ease: 'easeOut',
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

function Footer() {
  return (
    <motion.footer
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative overflow-hidden text-white bg-gradient-to-b from-[#0f2f1f] via-[#0c3d25] to-[#051d12]"
    >

      {/* Soft Green Glow Background (NO BUBBLES) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.18),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.15),transparent_45%)]" />

      {/* Glass Overlay */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        <motion.div
          variants={container}
          className="grid gap-12 lg:grid-cols-3"
        >

          {/* LINKS */}
          <motion.div variants={item}>
            <h3 className="text-xl font-semibold text-green-300">Shortcut links</h3>
            <ul className="mt-6 space-y-3 text-sm text-green-100/80">
              {["Home", "Features", "Blogs", "FAQs", "Contact"].map((text, i) => (
                <motion.li key={i} whileHover={{ x: 8, scale: 1.05 }}>
                  <Link
                    to={text === "Home" ? "/" : `/${text.toLowerCase().replace(" ", "")}`}
                    className="transition hover:text-green-300"
                  >
                    {text}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* FEATURES */}
          <motion.div variants={item}>
            <h3 className="text-xl font-semibold text-green-300">Features</h3>
            <ul className="mt-6 space-y-3 text-sm text-green-100/80">
              {["Health & Fitness", "Healthy Diet"].map((text, i) => (
                <motion.li key={i} whileHover={{ x: 8, scale: 1.05 }}>
                  <Link
                    to={`/${text.toLowerCase().replace(" ", "")}`}
                    className="transition hover:text-green-300"
                  >
                    {text}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={appStoreImg} className="h-12 drop-shadow-lg" />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.1, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={googlePlayImg} className="h-12 drop-shadow-lg" />
              </motion.a>
            </div>
          </motion.div>

          {/* CONTACT */}
          <motion.div variants={item}>
            <h3 className="text-xl font-semibold text-green-300">Contact</h3>
            <ul className="mt-6 space-y-4 text-sm text-green-100/80">
              <motion.li whileHover={{ x: 8 }}>+92 332 466 6823</motion.li>
              <motion.li whileHover={{ x: 8 }}>info@soulwhispers.live</motion.li>
            </ul>

            <div className="mt-8 flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.3, rotate: 8 }}
                className="p-3 rounded-full bg-green-500/10 backdrop-blur-md"
              >
                <Facebook size={18} />
              </motion.a>

              <motion.a
                href="#"
                whileHover={{ scale: 1.3, rotate: -8 }}
                className="p-3 rounded-full bg-green-500/10 backdrop-blur-md"
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        variants={item}
        className="relative z-10 border-t border-green-400/10"
      >
        <div className="mx-auto px-6 py-6 text-sm text-green-100/70 text-center">
          <p>
            © 2026 Soul Whispers — Powered by <span className="text-green-300 font-semibold">Innovador Solutions</span>
          </p>
        </div>
      </motion.div>
    </motion.footer>
  )
}

export default Footer