"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const timelineSteps = [
    { title: "Start", text: "Our passion sparked from a simple idea that grew into a strong project." },
    { title: "Development", text: "Foundations were built one by one with precision and care." },
    { title: "Innovation", text: "Modern touches were added to elevate the user experience." },
    { title: "Achievement", text: "We reached an amazing outcome that speaks for itself." },
];

const generateParticles = (count: number) =>
    Array.from({ length: count }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2,
    }));

const Timeline3D = () => {
    const [particles, setParticles] = useState<{ top: number; left: number; size: number; delay: number }[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 });

    // Motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Parallax transforms
    const offsetX = useTransform(mouseX, [0, windowSize.w], [-20, 20]);
    const offsetY = useTransform(mouseY, [0, windowSize.h], [-20, 20]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        setParticles(generateParticles(40));

        const handleMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouse);

        // تحديث أبعاد الشاشة بعد mount
        setWindowSize({ w: window.innerWidth, h: window.innerHeight });

        return () => window.removeEventListener("mousemove", handleMouse);
    }, [mouseX, mouseY]);

    return (
        <section className="relative py-32 px-6 md:px-20 text-white overflow-hidden bg-black">
            {/* Floating Particles */}
            {particles.map((p, i) => (
                <motion.span
                    key={i}
                    className="absolute bg-cyan-400 rounded-full"
                    style={{ top: `${p.top}%`, left: `${p.left}%`, width: p.size, height: p.size }}
                    animate={{ y: ["0%", "20%", "0%"], opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 3, delay: p.delay, ease: "easeInOut" }}
                />
            ))}

            {/* Light Streaks Background */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
            >
                <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-10 blur-3xl" />
            </motion.div>

            <motion.h2
                className="text-5xl font-extrabold text-center mb-20 text-cyan-400"
                style={{ x: offsetX, y: offsetY }}
            >
                🚀 Our Creative Journey
            </motion.h2>

            <div className="relative border-l border-white/20 mx-auto max-w-3xl">
                {timelineSteps.map((step, i) => (
                    <motion.div
                        key={i}
                        className="relative pl-14 mb-20 cursor-pointer"
                        initial={{ opacity: 0, x: -50, z: 0 }}
                        whileInView={{ opacity: 1, x: 0, z: 10 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                        onHoverStart={() => setHoveredIndex(i)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        style={{ x: offsetX, y: offsetY }}
                    >
                        {/* Glowing Circle */}
                        <motion.div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cyan-400 shadow-[0_0_20px_#00eaff]"
                            animate={{
                                scale: hoveredIndex === i ? 2 : [1, 1.3, 1],
                                boxShadow:
                                    hoveredIndex === i
                                        ? "0 0 40px #00eaff, 0 0 80px #00eaff, 0 0 120px #00eaff"
                                        : "0 0 20px #00eaff",
                            }}
                            transition={{ repeat: hoveredIndex === i ? 0 : Infinity, duration: 1.5, ease: "easeInOut" }}
                        />

                        <motion.h3
                            className="text-3xl font-bold text-white"
                            animate={{ color: hoveredIndex === i ? "#00eaff" : "#fff" }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {step.title}
                        </motion.h3>
                        <motion.p
                            className="text-gray-300 text-lg mt-2 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                        >
                            {step.text}
                        </motion.p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Timeline3D;
