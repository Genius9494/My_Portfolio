"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useScroll } from "framer-motion";
import { gsap } from "gsap";

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
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [activeScene, setActiveScene] = useState<number | null>(null);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

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

    const offsetX = useTransform(mouseX, [0, windowSize.width || 1], [-15, 15]);
    const offsetY = useTransform(mouseY, [0, windowSize.height || 1], [-15, 15]);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const handleImageClick = (idx: number) => {
        const el = imageRefs.current[idx];
        if (!el) return;

        // تذبذب الصورة عند الضغط
        gsap.fromTo(
            el,
            { y: 0, scale: 1, rotation: 0 },
            {
                y: -20,
                scale: 1.05,
                rotation: 5,
                duration: 0.25,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut",
                onComplete: () => {setActiveScene(idx)
                    try {
                        const audio = new Audio("/click.mp3");
                        audio.play();
                    } catch { }
                }
            }
        );
    };

    const closeOverlay = () => setActiveScene(null);

    return (
        <div ref={containerRef} className="w-full text-white relative">
            {/* Vertical Line */}
            <motion.div
                style={{ height: lineHeight }}
                className="absolute left-1/2 top-0 w-[4px] bg-cyan-400 rounded-full shadow-[0_0_20px_6px_rgba(0,255,255,0.9)] hidden md:block"
            />

            {scenes.map((scene, i) => (
                <section
                    key={i}
                    className={`split-section h-screen flex items-center justify-center px-6 md:px-20 ${scene.bg}`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full items-center">
                        {/* Left Text */}
                        <motion.div
                            className="split-left flex flex-col justify-center"
                            style={{ x: offsetX, y: offsetY }}
                            initial={{ x: -300, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                        >
                            <motion.h2
                                className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-cyan-400 cursor-pointer"
                                whileHover={{ scale: 1.05, textShadow: "0 0 15px #0ff, 0 0 30px #0ff" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                onClick={() => handleImageClick(i)}
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

                        {/* Right Image */}
                        <motion.div
                            className="split-right flex justify-center items-center"
                            style={{ x: offsetX, y: offsetY }}
                            initial={{ x: 300, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                        >
                            <motion.div
                                ref={(el) => {(imageRefs.current[i] = el)}}
                                className="img-wrapper w-[280px] h-[280px] md:w-[340px] md:h-[340px] bg-neutral-900/40 backdrop-blur-lg rounded-2xl border border-white/10 flex items-center justify-center shadow-xl cursor-pointer"
                                whileHover={{ scale: 1.05, boxShadow: "0 0 40px #00eaff, 0 0 80px #00eaff" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                onClick={() => handleImageClick(i)}
                            >
                                <Image src={scene.image} width={440} height={440} alt="preview" className="object-cover opacity-90" />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            ))}

            {/* Overlay Information */}
            {activeScene !== null && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={closeOverlay}
                >
                    <motion.div
                        className="relative bg-neutral-900 rounded-xl p-8 max-w-lg text-white overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } }}
                        onClick={(e) => e.stopPropagation()}
                        ref={(el) => {
                            if (!el) return;

                            // Neon pulse effect
                            gsap.to(el, {
                                boxShadow: "0 0 30px #a855f7, 0 0 60px #c084fc",
                                scale: 1.02,
                                duration: 1,
                                repeat: -1,
                                yoyo: true,
                                ease: "sine.inOut",
                            });

                            // Floating particles inside overlay
                            const count = 25;
                            const particles: HTMLDivElement[] = [];
                            for (let i = 0; i < count; i++) {
                                const p = document.createElement("div");
                                p.className = "absolute rounded-full bg-purple-500/50 pointer-events-none";
                                const size = Math.random() * 4 + 2;
                                p.style.width = `${size}px`;
                                p.style.height = `${size}px`;
                                p.style.top = `${Math.random() * 100}%`;
                                p.style.left = `${Math.random() * 100}%`;
                                el.appendChild(p);
                                particles.push(p);
                            }
                            gsap.to(particles, {
                                y: "random(-10,10)",
                                x: "random(-10,10)",
                                repeat: -1,
                                yoyo: true,
                                duration: 3,
                                ease: "sine.inOut",
                                stagger: { each: 0.05 },
                            });
                        }}
                    >
                        {/* Neon title */}
                        <h2
                            className="text-2xl font-bold mb-4 text-purple-400 cursor-pointer relative z-10"
                            onMouseEnter={(e) => {
                                gsap.to(e.currentTarget, {
                                    scale: 1.08,
                                    textShadow: "0 0 8px #a855f7, 0 0 16px #c084fc, 0 0 24px #d8b4fe",
                                    duration: 0.3,
                                    yoyo: true,
                                    repeat: -1,
                                    ease: "sine.inOut",
                                });
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.currentTarget, {
                                    scale: 1,
                                    textShadow: "0 0 0px #c084fc",
                                    duration: 0.3,
                                });
                            }}
                        >
                            {scenes[activeScene].title}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-300">
                            {`Full-Stack Developers handled "${scenes[activeScene].title}" by creating responsive, scalable, and visually appealing solutions. ${scenes[activeScene].text}`}
                        </p>
                    </motion.div>
                </div>
            )}

        </div>
    );
};

export default SplitSections;
