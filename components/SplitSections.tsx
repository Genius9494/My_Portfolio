"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import Image from "next/image";

const scenes = [
    {
        title: "Ideation",
        text: "It all starts with an idea. We brainstorm and plan innovative web solutions.",
        image: "/section1.png",
        bg: "bg-black/90",
    },
    {
        title: "Development",
        text: "Building scalable, efficient, and secure full-stack applications with modern technologies.",
        image: "/section2.png",
        bg: "bg-black/80",
    },
    {
        title: "Innovation",
        text: "Adding creative features and intuitive designs to elevate user experience.",
        image: "/section3.png",
        bg: "bg-black/70",
    },
    {
        title: "Deployment",
        text: "Delivering reliable, high-performance applications that meet real-world demands.",
        image: "/section4.png",
        bg: "bg-black/60",
    },
];

const SplitSections: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Motion values for mouse parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });

            const handleMouse = (e: MouseEvent) => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            };

            window.addEventListener("mousemove", handleMouse);
            return () => window.removeEventListener("mousemove", handleMouse);
        }
    }, [mouseX, mouseY]);

    // Safe transforms: only create after window size is set
    const offsetX = useTransform(mouseX, [0, windowSize.width || 1], [-15, 15]);
    const offsetY = useTransform(mouseY, [0, windowSize.height || 1], [-15, 15]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div ref={containerRef} className="w-full text-white relative">
            {/* ---- Vertical Neon Line ---- */}
            <motion.div
                style={{ height: lineHeight }}
                className="
                    absolute left-1/2 top-0 
                    w-[4px] 
                    bg-cyan-400 
                    rounded-full
                    shadow-[0_0_20px_6px_rgba(0,255,255,0.9)]
                    before:content-['']
                    before:absolute
                    before:inset-0
                    before:w-full
                    before:h-full
                    before:blur-[20px]
                    before:bg-cyan-400
                    before:opacity-90
                "
            />

            {scenes.map((scene, i) => (
                <section
                    key={i}
                    className={`split-section h-screen flex items-center justify-center px-6 md:px-20 ${scene.bg}`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full items-center">
                        {/* LEFT SIDE (Text comes from left) */}
                        <motion.div
                            className="split-left flex flex-col justify-center"
                            style={{ x: offsetX, y: offsetY }}
                            initial={{ x: -300, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                        >
                            <motion.h2
                                className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-cyan-400"
                                whileHover={{ scale: 1.05, textShadow: "0 0 15px #0ff, 0 0 30px #0ff" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                {scene.title}
                            </motion.h2>
                            <motion.p
                                className="text-xl text-gray-300 max-w-lg leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                {scene.text}
                            </motion.p>
                        </motion.div>

                        {/* RIGHT SIDE (Image comes from right) */}
                        <motion.div
                            className="split-right flex justify-center items-center"
                            style={{ x: offsetX, y: offsetY }}
                            initial={{ x: 300, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                        >
                            <motion.div
                                className="img-wrapper w-[280px] h-[280px] md:w-[340px] md:h-[340px] bg-neutral-900/40 backdrop-blur-lg rounded-2xl border border-white/10 flex items-center justify-center shadow-xl"
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 40px #00eaff, 0 0 80px #00eaff",
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Image
                                    src={scene.image}
                                    width={440}
                                    height={440}
                                    alt="preview"
                                    className="object-cover opacity-90"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default SplitSections;
