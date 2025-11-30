"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, Variants, Easing } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

interface Particle {
    top: number;
    left: number;
    size: number;
    delay: number;
}

const generateParticles = (count: number) =>
    Array.from({ length: count }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 2,
    }));

const phases = [
    {
        title: "Phase 1: Discovery",
        text: "We begin by understanding your vision, project goals, and target audience.",
        bg: "/sec1.png",
    },
    {
        title: "Phase 2: Design (UI/UX)",
        text: "Transforming ideas into intuitive and beautiful user interfaces.",
        bg: "/sec2.png",
    },
    {
        title: "Phase 3: Development",
        text: "Bringing designs to life with clean code and powerful backend logic.",
        bg: "/sec3.jpg",
    },
    {
        title: "Phase 4: Launch",
        text: "Deploying your product and ensuring a smooth launch.",
        bg: "/sec4.png",
    },
];

// VALID easing for framer-motion
const cubic: Easing = [0.16, 1, 0.3, 1];

const fadeInSmooth: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: cubic },
    },
};

const slideInSmooth: Variants = {
    hidden: { opacity: 0, x: 80 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1.4, ease: cubic },
    },
};

export default function NeonFullSection() {
    const [particles, setParticles] = useState<{ top: number; left: number; size: number; delay: number }[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const [offsetX, setOffsetX] = useState(mouseX);
    const [offsetY, setOffsetY] = useState(mouseY);


    // إنشاء transforms بعد التأكد من window
    const ox = useTransform(mouseX, [0, window.innerWidth], [-20, 20]);
    const oy = useTransform(mouseY, [0, window.innerHeight], [-20, 20]);

    useEffect(() => {
        setParticles(generateParticles(80));

        if (typeof window === "undefined") return;

        const handleMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouse);

        
        setOffsetX(ox);
        setOffsetY(oy);

        return () => window.removeEventListener("mousemove", handleMouse);
    }, [mouseX, mouseY]);


    return (
        <div className="relative w-full min-h-screen bg-black overflow-hidden">
            {/* PARTICLES */}
            {particles.map((p, i) => (
                <motion.span
                    key={i}
                    className="absolute bg-cyan-400 rounded-full pointer-events-none"
                    style={{
                        top: `${p.top}%`,
                        left: `${p.left}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{ y: ["0%", "10%", "0%"], opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 4, delay: p.delay }}
                />
            ))}

            {/* BACKGROUND GLOW */}
            <motion.div
                className="absolute inset-0 w-full h-full pointer-events-none"
                animate={{ opacity: [0.6, 0.9, 0.6] }}
                transition={{ repeat: Infinity, duration: 6 }}
            >
                <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-20 blur-2xl" />
            </motion.div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 max-w-full">
                {phases.map((phase, i) => {
                    const { ref, inView } = useInView({
                        threshold: 0.3,
                        triggerOnce: false, // لا يخفي عند الرجوع
                    });

                    return (
                        <section
                            key={i}
                            ref={ref}
                            className="relative h-screen flex items-center justify-center text-white overflow-hidden"
                            style={{
                                backgroundImage: `url(${phase.bg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/60" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-6xl w-full px-6 gap-8">

                                {/* TEXT */}
                                <motion.div
                                    style={{ x: offsetX, y: offsetY }}
                                    initial="hidden"
                                    animate={inView ? "visible" : "hidden"}
                                    variants={slideInSmooth}
                                    className="max-w-lg"
                                >
                                    <h2 className="text-5xl font-bold mb-4 text-cyan-400">{phase.title}</h2>
                                    <p className="text-xl opacity-90 leading-relaxed">{phase.text}</p>
                                </motion.div>

                                {/* IMAGE BOX */}
                                <motion.div
                                    initial="hidden"
                                    animate={inView ? "visible" : "hidden"}
                                    variants={fadeInSmooth}
                                >
                                    <div className="w-[300px] h-[300px] bg-neutral-900/40 border border-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-[0_0_30px_#0ff]">
                                        <Image src="/logo.png" width={260} height={260} alt="Logo" />
                                    </div>
                                </motion.div>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
