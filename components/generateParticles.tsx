"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
        text: "We begin by understanding your vision, project goals, and target audience. This is where we map out requirements and build the foundation for your product.",
        bg: "/sec1.png",
    },
    {
        title: "Phase 2: Design (UI/UX)",
        text: "We transform your ideas into intuitive, beautiful user interfaces. Wireframes, mockups, and polished UI that reflect your identity.",
        bg: "/sec2.png",
    },
    {
        title: "Phase 3: Development",
        text: "Our developers bring designs to life with clean code, powerful back-end, database integration, and thorough testing to ensure flawless performance.",
        bg: "/sec3.jpg",
    },
    {
        title: "Phase 4: Launch",
        text: "After development and testing, we deploy your product to servers or cloud environments—ensuring a smooth launch and optimal performance.",
        bg: "/sec4.png",
    },
];

export default function NeonFullPagePulse() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const offsetX = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
    const offsetY = useTransform(mouseY, [0, window.innerHeight], [-15, 15]);

    useEffect(() => {
        setParticles(generateParticles(60));
        const handleMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, [mouseX, mouseY]);

    return (
        <div className="relative w-full min-h-screen bg-black overflow-hidden">
            {/* Neon Particles */}
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
                    transition={{ repeat: Infinity, duration: 4, delay: p.delay, ease: "easeInOut" }}
                />
            ))}

            {/* Light Gradient Glow */}
            <motion.div
                className="absolute inset-0 w-full h-full pointer-events-none"
                animate={{ opacity: [0.6, 0.9, 0.6] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
                <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-20 blur-2xl" />
            </motion.div>

            {/* Sections */}
            <div className="relative z-10 max-w-full">
                {phases.map((phase, i) => {
                    const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: false, rootMargin: "-100px 0px -100px 0px" });

                    return (
                        <section
                            key={i}
                            ref={ref}
                            className="studio-section relative h-screen flex items-center justify-center text-white overflow-hidden"
                            style={{ backgroundImage: `url(${phase.bg})`, backgroundSize: "cover", backgroundPosition: "center" }}
                        >
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-black/60" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-6xl w-full px-4">
                                {/* Text */}
                                <motion.div
                                    className="md:w-1/2 text-center md:text-left"
                                    initial={{ x: -200, opacity: 0 }}
                                    animate={inView ? { x: 0, opacity: 1 } : { x: -200, opacity: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    style={{ x: offsetX, y: offsetY }}
                                >
                                    <motion.h2
                                        className="text-5xl font-bold mb-4 text-cyan-400"
                                        animate={
                                            inView
                                                ? { scale: [1, 1.05, 1], textShadow: "0 0 40px #00eaff, 0 0 80px #00eaff" }
                                                : { scale: 1, textShadow: "0 0 20px #00eaff" }
                                        }
                                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                                    >
                                        {phase.title}
                                    </motion.h2>
                                    <motion.p
                                        className="text-xl opacity-90"
                                        initial={{ opacity: 0 }}
                                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                                        transition={{ duration: 0.8, delay: 0.1 }}
                                    >
                                        {phase.text}
                                    </motion.p>
                                </motion.div>

                                {/* Image Placeholder / Neon Glow Box */}
                                <motion.div
                                    className="md:w-1/2 flex justify-center mt-10 md:mt-0"
                                    initial={{ x: 200, opacity: 0 }}
                                    animate={inView ? { x: 0, opacity: 1 } : { x: 200, opacity: 0 }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                >
                                    {/* <div className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] bg-neutral-900/30 backdrop-blur-lg rounded-2xl border border-white/10 flex items-center justify-center shadow-xl">
                                        <span className="text-cyan-400 text-xl font-bold">IMAGE</span>
                                    </div> */}
                                </motion.div>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
