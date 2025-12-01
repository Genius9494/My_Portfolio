"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";

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
        id: "phase1",
        title: "Phase 1: Discovery",
        text: "We begin by understanding your vision, project goals, and target audience.",
        bg: "/sec1.png",
    },
    {
        id: "phase2",
        title: "Phase 2: Design (UI/UX)",
        text: "Transforming ideas into intuitive and beautiful user interfaces.",
        bg: "/sec2.png",
    },
    {
        id: "phase3",
        title: "Phase 3: Development",
        text: "Bringing designs to life with clean code and powerful backend logic.",
        bg: "/sec3.jpg",
    },
    {
        id: "phase4",
        title: "Phase 4: Launch",
        text: "Deploying your product and ensuring a smooth launch.",
        bg: "/sec4.png",
    },
];

export default function NeonFullSection() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [activePhase, setActivePhase] = useState<string | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const ox =
        typeof window !== "undefined"
            ? useTransform(mouseX, [0, window.innerWidth], [-20, 20])
            : 0;
    const oy =
        typeof window !== "undefined"
            ? useTransform(mouseY, [0, window.innerHeight], [-20, 20])
            : 0;

    useEffect(() => {
        setParticles(generateParticles(80));
        const handleMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, []);

    // Handle click on phase image
    const handlePhaseClick = (idx: number) => {
        const el = imageRefs.current[idx];
        if (!el) return;

        // تذبذب الصورة قليلاً قبل الظهور
        gsap.fromTo(
            el,
            { y: 0, rotation: 0, scale: 1 },
            {
                y: -20,
                rotation: 5,
                scale: 1.05,
                duration: 0.25,
                yoyo: true,
                repeat: 1,
                ease: "power1.inOut",
                onComplete: () => {
                    setActivePhase(phases[idx].id);
                    setShowOverlay(true);
                    try {
                        const audio = new Audio("/electro.mp3");
                        audio.play();
                    } catch { }
                },
            }
        );
    };

    const closeOverlay = () => {
        setShowOverlay(false);
        setActivePhase(null);
    };

    return (
        <div className="relative w-full min-h-screen bg-black overflow-hidden">
            {/* PARTICLES */}
            {particles.map((p, i) => (
                <motion.span
                    key={i}
                    className="absolute bg-green-400 rounded-full pointer-events-none"
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
                <div className="w-full h-full bg-gradient-to-r from-green-500 via-lime-400 to-emerald-500 opacity-20 blur-2xl" />
            </motion.div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 max-w-full">
                {phases.map((phase, i) => {
                    const { ref, inView } = useInView({
                        threshold: 0.4,
                        triggerOnce: false,
                    });

                    return (
                        <motion.section
                            key={i}
                            ref={ref}
                            initial={{ opacity: 0, y: 120 }}
                            animate={inView ? { opacity: 1, y: 0, transition: { duration: 1.2 } } : { opacity: 0, y: 120 }}
                            className="relative h-screen flex items-center justify-center text-white overflow-hidden"
                            style={{
                                backgroundImage: `url(${phase.bg})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/60" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-6xl w-full px-6 gap-10">
                                {/* TEXT */}
                                <motion.div style={{ x: ox, y: oy }} className="max-w-lg cursor-pointer">
                                    <h2
                                        className="text-5xl font-bold mb-4 text-green-400"
                                        onClick={() => handlePhaseClick(i)}
                                    >
                                        {phase.title}
                                    </h2>
                                    <p className="text-xl opacity-90 leading-relaxed">{phase.text}</p>
                                </motion.div>

                                {/* IMAGE */}
                                <motion.div>
                                    <div
                                        ref={(el) => {(imageRefs.current[i] = el)}}
                                        className="w-[300px] h-[300px] bg-neutral-900/40 border border-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-[0_0_30px_#0f0]"
                                        onClick={() => handlePhaseClick(i)}
                                    >
                                        <Image src="/logo.png" width={260} height={260} alt="Logo" />
                                    </div>
                                </motion.div>
                            </div>
                        </motion.section>
                    );
                })}
            </div>

            {/* OVERLAY LIVING GREEN */}
            {showOverlay && activePhase && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={closeOverlay}
                >
                    <motion.div
                        ref={(el) => {
                            if (!el) return;
                            // heartbeat overlay
                            gsap.to(el, {
                                scale: 1.02,
                                boxShadow: "0 0 30px #00ff66,0 0 60px #00ff66",
                                duration: 1,
                                repeat: -1,
                                yoyo: true,
                                ease: "sine.inOut",
                            });

                            // particles green inside overlay
                            const count = 40;
                            const particles: HTMLDivElement[] = [];
                            for (let i = 0; i < count; i++) {
                                const p = document.createElement("div");
                                p.className = "absolute rounded-full bg-green-400 opacity-40 pointer-events-none";
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
                                duration: 3.6,
                                ease: "sine.inOut",
                                stagger: { each: 0.05 },
                            });
                        }}
                        className="relative bg-neutral-900 rounded-xl p-8 max-w-lg text-white overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Neon title */}
                        <h2
                            className="text-2xl font-bold mb-4 text-green-400 cursor-pointer relative z-10"
                            onMouseEnter={(e) => {
                                gsap.to(e.currentTarget, {
                                    scale: 1.08,
                                    textShadow: "0 0 8px #00ff66, 0 0 16px #00ff66, 0 0 24px #00ff66",
                                    duration: 0.3,
                                    yoyo: true,
                                    repeat: -1,
                                    ease: "sine.inOut",
                                });
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.currentTarget, {
                                    scale: 1,
                                    textShadow: "0 0 0px #00ff66",
                                    duration: 0.3,
                                });
                            }}
                        >
                            {phases.find((p) => p.id === activePhase)?.title}
                        </h2>

                        {/* Auto-generated description */}
                        <p className="text-gray-300 relative z-10">
                            {(() => {
                                const phase = phases.find((p) => p.id === activePhase);
                                if (!phase) return "";
                                return `Full-Stack Web Developers handled "${phase.title}" by creating responsive, scalable, and visually appealing solutions. ${phase.text}`;
                            })()}
                        </p>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
