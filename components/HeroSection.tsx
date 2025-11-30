"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import ContactButton from "./ContactButton";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Transform values (SSR-safe)
    const rotateX = useTransform(mouseY, [0, 1], [12, -12]);
    const rotateY = useTransform(mouseX, [0, 1], [-18, 18]);
    const scale = useTransform(mouseX, [0, 1], [1, 1.08]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const mx = (e.clientX - rect.left) / rect.width;
        const my = (e.clientY - rect.top) / rect.height;

        mouseX.set(mx);
        mouseY.set(my);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-10 relative overflow-hidden bg-black"
        >
            {/* PARTICLES */}
            <motion.div className="absolute inset-0 pointer-events-none">
                {[...Array(35)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full shadow-lg"
                        initial={{ x: Math.random() * 800 - 400, y: Math.random() * 800 - 400, scale: 0 }}
                        animate={{ x: Math.random() * 800 - 400, y: Math.random() * 800 - 400, scale: [0, 1, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.15 }}
                    />
                ))}
            </motion.div>

            {/* STARS */}
            <motion.div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-white opacity-30 shadow-xl"
                        initial={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, scale: 0 }}
                        animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.5, 1, 0.5] }}
                        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: i * 0.1 }}
                    />
                ))}
            </motion.div>

            {/* IMAGE + FX */}
            <motion.div
                className="relative flex items-center justify-center w-full md:w-1/2 z-10"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
            >
                <motion.div
                    className="absolute inset-0 rounded-2xl blur-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-2xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 150, damping: 10 }}
                    className="relative z-10"
                >
                    <Image src="/logo.png" alt="Logo" width={420} height={200} className="rounded-2xl shadow-xl" priority />
                </motion.div>
            </motion.div>

            {/* TEXT SECTION */}
            <motion.div
                className="w-full md:w-1/2 mt-10 md:mt-0 z-20 relative"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
            >
                <motion.h1
                    style={{ rotateX, rotateY, scale, transformPerspective: 800, transformStyle: "preserve-3d" }}
                    className="text-3xl md:text-6xl font-extrabold leading-tight tracking-tight text-white hover:cursor-pointer transition-transform duration-300"
                >
                    {"Hello from there, we are not a company".split("").map((l, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{
                                y: [-2, 2, 0],
                                textShadow: [
                                    "0 0 5px #fff,0 0 10px #ff00ff,0 0 20px #ff00ff,0 0 60px #ff00ff",
                                    "0 0 10px #fff,0 0 20px #00ffff,0 0 30px #ff00ff,0 0 70px #00ffff",
                                    "0 0 5px #fff,0 0 10px #ff00ff,0 0 20px #ff00ff,0 0 60px #ff00ff",
                                ],
                                transition: { duration: 0.8, repeat: Infinity },
                            }}
                            transition={{ delay: i * 0.03 }}
                        >
                            {l}
                        </motion.span>
                    ))}
                    {" but a team built".split("").map((l, i) => (
                        <motion.span
                            key={"b" + i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{
                                y: [-2, 2, 0],
                                textShadow: [
                                    "0 0 5px #fff,0 0 10px #ff00ff,0 0 20px #ff00ff,0 0 60px #ff00ff",
                                    "0 0 10px #fff,0 0 20px #00ffff,0 0 30px #ff00ff,0 0 70px #00ffff",
                                    "0 0 5px #fff,0 0 10px #ff00ff,0 0 20px #ff00ff,0 0 60px #ff00ff",
                                ],
                                transition: { duration: 0.8, repeat: Infinity },
                            }}
                            transition={{ delay: i * 0.03 }}
                        >
                            {l}
                        </motion.span>
                    ))}
                    {" on love and respect".split("").map((l, i) => (
                        <motion.span
                            key={"c" + i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{
                                y: [-2, 2, 0],
                                textShadow: [
                                    "0 0 5px #fff,0 0 10px #ff00ff,0 0 20px #ff00ff,0 0 60px #ff00ff",
                                    "0 0 10px #fff,0 0 20px #00ffff,0 0 30px #ff00ff,0 0 70px #00ffff",
                                    "0 0 5px #fff,0 0 10px #ff00ff,0 0 20px #ff00ff,0 0 60px #ff00ff",
                                ],
                                transition: { duration: 0.8, repeat: Infinity },
                            }}
                            transition={{ delay: i * 0.03 }}
                        >
                            {l}
                        </motion.span>
                    ))}
                </motion.h1>
                <ContactButton />
            </motion.div>
        </section>
    );
}
