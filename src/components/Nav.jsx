import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import logoImg from '../assets/logo.png'

const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Features', to: '/features' },
    { label: 'Blogs', to: '/blogs' },
    { label: 'FAQs', to: '/faqs' },
    { label: 'Contact', to: '/contact' },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
}

// Each nav item animation
const itemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    exit: { opacity: 0, y: -10 },
}

// Dropdown animation
const dropdownVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
    exit: {
        opacity: 0,
        y: -15,
        scale: 0.98,
        transition: { duration: 0.2 },
    },
}

function Nav() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 px-4 pt-3 sm:px-6">
            <div className="container flex items-center justify-between rounded-[28px] border border-[#0f4f24]/10 bg-white/70 py-3 shadow-[0_18px_50px_rgba(15,79,36,0.08)] backdrop-blur-2xl">
                
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-4 text-lg font-semibold text-[#0f4f24]">
                    <img src={logoImg} alt="Logo" className="h-12 w-30" />
                </NavLink>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-3 md:flex">
                    {navItems.map((item) => (
                        <motion.div
                            key={item.to}
                            whileHover={{ y: -2 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `rounded-full px-4 py-2 text-sm font-medium transition ${
                                        isActive
                                            ? 'bg-[#3bab35]/12 text-[#0f4f24] shadow-[inset_0_0_0_1px_rgba(59,171,53,0.18)]'
                                            : 'text-slate-600 hover:bg-white/80 hover:text-[#0f4f24]'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        </motion.div>
                    ))}
                </nav>

                {/* Mobile Button */}
                <motion.button
                    onClick={() => setOpen((prev) => !prev)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm md:hidden"
                    aria-label="Menu"
                    whileInView={{ rotate: open ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        className="md:hidden"
                    >
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            exit="exit"
                            className="mx-2 mt-2 rounded-[24px] border border-slate-200/80 bg-white/90 px-4 py-5 shadow-lg backdrop-blur-xl"
                        >
                            <div className="flex flex-col gap-3">
                                {navItems.map((item) => (
                                    <motion.div key={item.to} variants={itemVariants}>
                                        <NavLink
                                            to={item.to}
                                            onClick={() => setOpen(false)}
                                            className={({ isActive }) =>
                                                `block rounded-2xl px-4 py-3 text-base font-medium transition ${
                                                    isActive
                                                        ? 'bg-[#e9f8eb] text-[#0f4f24]'
                                                        : 'text-slate-700 hover:bg-slate-50'
                                                }`
                                            }
                                        >
                                            {item.label}
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Nav
