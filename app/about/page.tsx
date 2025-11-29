"use client";
import { useEffect, useState } from "react";
import { motion, easeInOut, Variants } from "framer-motion";


type Star = {
    x: number;
    y: number;
    duration: number;
    delay: number;
};

const blocks = [
    {
        title: "Overview",
        text:
            "We are a multidisciplinary team of engineers, designers and innovators focused on crafting next-generation digital solutions. Our core mission is to build scalable, high-performance experiences that are both beautiful and reliable.",
    },
    {
        title: "Full-Stack & Backend",
        text:
            "Our full-stack developers excel with React.js, Next.js, Node.js, Express and MongoDB, while our backend specialists build robust systems using Node.js frameworks and PHP Laravel. We design APIs, databases and architectures that scale with business demands.",
    },
    {
        title: "Frontend & Mobile",
        text:
            "Front-end engineers focus on polished, responsive UIs using TypeScript, Material-UI and TailwindCSS. Our mobile team ships performant cross-platform apps with Flutter, using clean architecture and UX-driven design.",
    },
    {
        title: "AI & Innovation",
        text:
            "We craft AI-powered learning experiences, LLM-based tools and automation workflows — from avatars and content generation to production ML systems. Our product leadership turns research into practical, user-centric features.",
    },
    {
        title: "Games & Creative",
        text:
            "Our creative division builds 2D/3D games with C++ and Unreal Engine, and delivers branding, UI/UX, logos and high-impact visual identities that harmonize with engineering for cohesive digital products.",
    },
    {
        title: "Approach & Values",
        text:
            "We emphasize performance, scalability and user-centered design. Collaboration, continuous learning and rigorous testing guide our process — we deliver solutions that are maintainable, measurable and memorable.",
    },
];

export default function About() {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        // generate stars on client only (prevents hydration mismatch)
        const s: Star[] = Array.from({ length: 40 }).map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            duration: 8 + Math.random() * 10,
            delay: Math.random() * 6,
        }));
        setStars(s);
    }, []);

    // entrance variants for blocks (stagger)
    const containerVariants = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.12,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 18,
            scale: 0.98,
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: easeInOut,
            },
        },
        hover: {
            scale: 1.03,
            boxShadow: "0 6px 30px rgba(0,255,255,0.12), 0 0 40px rgba(0,200,255,0.06)",
            transition: {
                duration: 0.25,
                ease: easeInOut,
            },
        },
    };

    return (
        <section className="w-full min-h-screen bg-black text-white relative overflow-hidden px-6 py-24">
            {/* strong cyan glow background (subtle) */}
            <motion.div
                className="absolute inset-0 bg-cyan-500/8 blur-[120px] -z-10"
                animate={{ opacity: [0.25, 0.55, 0.25] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
            />

            {/* stars (client-only) */}
            <div className="absolute inset-0 pointer-events-none -z-20">
                {stars.map((star, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-300 rounded-full opacity-70"
                        style={{ left: star.x, top: star.y }}
                        animate={{
                            y: [0, -140],
                            opacity: [0.4, 1, 0.35],
                            scale: [0.4, 1.1, 0.4],
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: "easeInOut",
                        }}
                        aria-hidden
                    />
                ))}
            </div>

            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-extrabold text-cyan-300 text-center mb-10 drop-shadow-[0_0_12px_rgba(0,255,255,0.18)]"
            >
                Who We Are
            </motion.h2>

            {/* Grid of blocks */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
            >
                {blocks.map((b, idx) => (
                    <motion.article
                        key={idx}
                        variants={cardVariants}
                        whileHover="hover"
                        className="bg-neutral-900/40 backdrop-blur-lg border border-white/6 rounded-2xl p-6 md:p-8 hover:cursor-default"
                        role="article"
                    >
                        <motion.h3
                            className="text-xl md:text-2xl font-semibold mb-3 text-cyan-200"
                            initial={{ color: "#9ef6f0" }}
                            whileHover={{ color: "#00f0ff", textShadow: "0 0 20px #00f0ff, 0 0 40px rgba(0,255,255,0.25)" }}
                            transition={{ duration: 0.25 }}
                        >
                            {b.title}
                        </motion.h3>

                        <motion.p
                            className="text-neutral-300 leading-relaxed text-sm md:text-base"
                            initial={{ opacity: 0.95 }}
                            whileHover={{ color: "#c8fff9", scale: 1.01 }}
                            transition={{ duration: 0.25 }}
                        >
                            {b.text}
                        </motion.p>
                    </motion.article>
                ))}
            </motion.div>

            {/* subtle bottom line */}
            <motion.div
                className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-8 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
                animate={{ opacity: [0.2, 0.7, 0.2] }}
                transition={{ duration: 6, repeat: Infinity }}
                aria-hidden
            />
        </section>
    );
}
