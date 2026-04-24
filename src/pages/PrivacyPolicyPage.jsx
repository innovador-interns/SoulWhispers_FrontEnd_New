import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import privacyData from "../data/privacyPolicy";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
CustomEase.create("silk", "M0,0 C0.25,0 0.1,1 1,1");

// ─── Cursor Glow ──────────────────────────────────────────────────────────
function CursorGlow() {
    const ref = useRef(null)
    useEffect(() => {
        const move = (e) => {
            if (!ref.current) return
            gsap.to(ref.current, { x: e.clientX - 220, y: e.clientY - 220, duration: 1.2, ease: 'power2.out' })
        }
        window.addEventListener('mousemove', move)
        return () => window.removeEventListener('mousemove', move)
    }, [])
    return (
        <div ref={ref} className="pointer-events-none fixed top-0 left-0 w-[440px] h-[440px] rounded-full z-0 opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(59,171,53,0.05) 0%, transparent 70%)' }} />
    )
}

// ─── Floating Orbs ────────────────────────────────────────────────────────
function FloatingOrbs() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[
                { w: 350, h: 350, top: '-10%', left: '-5%', opacity: 0.02, anim: 'float-slow' },
                { w: 250, h: 250, bottom: '15%', right: '-5%', opacity: 0.03, anim: 'float-med' },
            ].map((s, i) => (
                <div key={i} className={`orb absolute rounded-full bg-[#3bab35] ${s.anim}`}
                    style={{ width: s.w, height: s.h, top: s.top, left: s.left, right: s.right, bottom: s.bottom, opacity: s.opacity }} />
            ))}
        </div>
    )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
    const [active, setActive] = useState(privacyData[0].title);
    const sidebarRef = useRef();

    // ----------------- SCROLL REFRESH & PROGRESS -----------------
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // Animate Hero
            const split = new SplitText(".privacy-hero-title", { type: "words,chars" });
            gsap.from(split.chars, {
                opacity: 0,
                y: 30,
                stagger: 0.02,
                duration: 0.8,
                ease: "silk",
                delay: 0.2
            });

            // CRITICAL: Refresh ScrollTrigger after initial mount/animations
            // We do it multiple times to catch staggered layout shifts
            [100, 500, 1500].forEach(delay => {
                setTimeout(() => ScrollTrigger.refresh(), delay);
            });
        });
        return () => ctx.revert();
    }, []);

    // ----------------- SECTION OBSERVER -----------------
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            privacyData.forEach((section) => {
                const id = section.title.replace(/\s+/g, '-').toLowerCase();
                const el = document.getElementById(id);
                if (!el) return;

                ScrollTrigger.create({
                    trigger: el,
                    start: "top 40%",
                    end: "bottom 40%",
                    onEnter: () => setActive(section.title),
                    onEnterBack: () => setActive(section.title),
                });

                const heading = el.querySelector('h2');
                if (heading) {
                    gsap.from(heading, {
                        opacity: 0,
                        x: -15,
                        duration: 0.8,
                        ease: "silk",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                        }
                    });
                }
            });
        });
        return () => ctx.revert();
    }, []);

    const scrollToSection = (e, title) => {
        e.preventDefault();
        const id = title.replace(/\s+/g, '-').toLowerCase();
        const el = document.getElementById(id);
        if (el) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-[#fcfdfc] text-[#1a1c1a] min-h-screen relative font-inter">
            <CursorGlow />
            <FloatingOrbs />

            <div className="container mx-auto flex gap-12 lg:gap-20 px-6 sm:px-12 relative">
                
                {/* ---------------- LEFT NAV ---------------- */}
                <aside className="hidden lg:block w-64 sticky top-32 h-fit z-20">
                    <div className="py-8">
                        <div className="text-[#3bab35] text-[10px] font-bold uppercase tracking-[0.3em] mb-8 opacity-60">
                            Privacy Index
                        </div>
                        
                        {/* 
                           Scrollable Sidebar List: 
                           Max height ensures that if the list is long, it can be scrolled internally 
                           instead of being cut off.
                        */}
                        <div 
                            ref={sidebarRef}
                            className="relative border-l border-slate-100 max-h-[calc(100vh-220px)] overflow-y-auto no-scrollbar overflow-x-hidden"
                        >
                            {privacyData.map((sec) => (
                                <a
                                    key={sec.title}
                                    href={`#${sec.title.replace(/\s+/g, '-').toLowerCase()}`}
                                    onClick={(e) => scrollToSection(e, sec.title)}
                                    className={`group relative block py-2.5 text-[13px] font-medium transition-all duration-300 pl-6 ${
                                        active === sec.title
                                            ? "text-[#0f4f24]"
                                            : "text-slate-400 hover:text-[#3bab35]"
                                    }`}
                                >
                                    <AnimatePresence>
                                        {active === sec.title && (
                                            <motion.div
                                                layoutId="navIndicator"
                                                className="absolute left-[-1px] top-2 -translate-y-1/2 w-[2px] h-6 bg-[#3bab35]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                    <span className="relative z-10 block transition-transform duration-300 group-hover:translate-x-1">
                                        {sec.title}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* ---------------- CONTENT ---------------- */}
                <main className="flex-1 pb-20 pt-10 max-w-3xl relative z-10">

                    {/* HERO */}
                    <div className="mb-24">
                        <div className="inline-block px-3 py-1 rounded-full bg-[#3bab35]/5 border border-[#3bab35]/10 text-[#3bab35] text-[10px] font-bold uppercase tracking-widest mb-6">
                            Security & Transparency
                        </div>
                        <h1 className="privacy-hero-title text-3xl md:text-5xl font-bold tracking-tight text-[#0f4f24] leading-[1.1] mb-8">
                            Privacy Policy.
                        </h1>
                        <p className="text-slate-500 text-base md:text-lg max-w-xl leading-relaxed">
                            Structured, clear, and designed for your peace of mind. We take your data security as seriously as your wellness.
                        </p>
                    </div>

                    {/* SECTIONS */}
                    <div className="space-y-24">
                        {privacyData.map((section) => (
                            <article
                                key={section.title}
                                id={section.title.replace(/\s+/g, '-').toLowerCase()}
                                className="group scroll-mt-32"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-6 h-[2px] bg-[#3bab35]/30" />
                                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0f4f24]">
                                        {section.title}
                                    </h2>
                                </div>

                                <div className="space-y-5 text-slate-600 leading-relaxed text-sm md:text-base pl-10 border-l border-slate-50 group-hover:border-[#3bab35]/10 transition-colors duration-500">
                                    {section.blocks?.map((block, i) => {
                                        if (block.type === "text") {
                                            return <p key={i}>{block.value}</p>;
                                        }
                                        if (block.type === "list") {
                                            return (
                                                <ul key={i} className="space-y-3">
                                                    {block.items.map((item, idx) => (
                                                        <li key={idx} className="flex gap-4">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#3bab35]/40 mt-2 flex-shrink-0" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-10 pt-16 border-t border-slate-100 text-center">
                        <p className="text-slate-400 text-sm italic">
                            Last updated: April 2024 • Soul Whispers Platform
                        </p>
                    </div>
                </main>

            </div>
        </div>
    );
}