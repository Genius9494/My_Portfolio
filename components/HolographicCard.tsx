"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const features = [
    {
        title: "Smart Architecture",
        text: "Scalable, modular, and built for long-term growth — our systems evolve with your business.",
    },
    {
        title: "High-End Performance",
        text: "Optimized backend logic and ultra-smooth UI ensure unmatched stability and speed.",
    },
    {
        title: "Modern UI / UX",
        text: "Clean design, fluid motion, and meaningful interactions define our visual identity.",
    },
    {
        title: "Full-Stack Integration",
        text: "APIs, databases, and frontend rendering work together as one unified digital system.",
    },
];

const generateParticles = (count: number) =>
    Array.from({ length: count }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
    }));

export default function NeonFullSection() {
    const [particles, setParticles] = useState<{ top: number; left: number; size: number; delay: number }[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 }); // افتراضي

    const offsetX = useTransform(mouseX, [0, windowSize.w], [-20, 20]);
    const offsetY = useTransform(mouseY, [0, windowSize.h], [-20, 20]);

    useEffect(() => {
        setParticles(generateParticles(80));

        if (typeof window === "undefined") return;

        setWindowSize({ w: window.innerWidth, h: window.innerHeight });

        const handleMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, [mouseX, mouseY]);

    return (
        <section className="relative py-32 px-6 md:px-20 text-white overflow-hidden bg-black min-h-screen">
            {/* STARFIELD PARTICLES */}
            {particles.map((p, i) => (
                <motion.span
                    key={i}
                    className="absolute bg-cyan-400 rounded-full"
                    style={{ top: `${p.top}%`, left: `${p.left}%`, width: p.size, height: p.size }}
                    animate={{ y: ["0%", "20%", "0%"], opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 3, delay: p.delay, ease: "easeInOut" }}
                />
            ))}

            {/* LIGHT STREAKS */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
            >
                <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-10 blur-3xl" />
            </motion.div>

            {/* MAIN TITLE */}
            <motion.h2
                className="text-6xl md:text-7xl font-extrabold text-center mb-16 text-[#00eaff] drop-shadow-[0_0_25px_#00eaff] relative z-10"
                style={{ x: offsetX, y: offsetY }}
            >
                Integrated solutions characterized by elegance, speed, and aesthetics inspired by creativity.
            </motion.h2>



            {/* FEATURES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-5xl mx-auto relative z-10">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        className="p-10 rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl shadow-[0_0_35px_#00eaff30] transition-all duration-300 hover:shadow-[0_0_45px_#00eaff80] hover:scale-[1.03]"
                        initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                        onHoverStart={() => setHoveredIndex(i)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        style={{ x: offsetX, y: offsetY }}
                    >
                        <h3 className="text-3xl font-bold text-[#00eaff] drop-shadow-[0_0_15px_#00eaff] mb-3">
                            {f.title}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">{f.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
