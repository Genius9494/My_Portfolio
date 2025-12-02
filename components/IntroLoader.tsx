"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export default function IntroLoader({ text = "E-commerce Platform" }: { text?: string }) {
    const [visible, setVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const charRef = useRef<HTMLImageElement | null>(null);
    const swordRef = useRef<HTMLImageElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    
    useEffect(() => {
        const lastShown = localStorage.getItem("introLastShown");

        const now = Date.now();
        const oneHour = 60 * 60 * 1000;

        if (!lastShown) {
            // أول زيارة
            setVisible(true);
            localStorage.setItem("introLastShown", String(now));
            return;
        }

        const last = Number(lastShown);
        if (now - last >= oneHour) {
            // مرّت ساعة → اعرضه مرة أخرى
            setVisible(true);
            localStorage.setItem("introLastShown", String(now));
        } else {
            
            setVisible(false);
        }
    }, []);

    
    useEffect(() => {
        const unlockSound = () => {
            if (audioRef.current) {
                audioRef.current.play().catch(() => { });
            }
        };

        window.addEventListener("click", unlockSound, { once: true });
        window.addEventListener("touchstart", unlockSound, { once: true });

        return () => {
            window.removeEventListener("click", unlockSound);
            window.removeEventListener("touchstart", unlockSound);
        };
    }, []);

    useEffect(() => {
        if (!visible) return ; 

        audioRef.current = new Audio("/entry.mp3");
        audioRef.current.volume = 0.6;
        audioRef.current.play().catch(() => { });

        const container = containerRef.current;
        const char = charRef.current;
        const sword = swordRef.current;
        if (!container || !char || !sword) return;

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(container, {
                    opacity: 0,
                    scale: 1.08,
                    duration: 0.9,
                    ease: "power2.inOut",
                    onComplete: () => setVisible(false),
                });
            },
        });

        tl.fromTo(container, { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 0.2 });

        tl.fromTo(
            char,
            { y: 60, scale: 0.6, autoAlpha: 0, rotation: -4 },
            { y: 0, scale: 1, autoAlpha: 1, rotation: 0, duration: 0.9, delay: 3, ease: "back.out(1.2)" },
            0.25
        );

        tl.to(char, { boxShadow: "5px 10px 104px 68px rgba(0,0,0,1)", duration: 0.6 }, 0.6);

        tl.fromTo(
            sword,
            { x: -380, y: -40, rotation: -25, autoAlpha: 0, scale: 0.9 },
            {
                x: 40,
                y: -18,
                rotation: 0,
                autoAlpha: 1,
                scale: 1,
                duration: 0.72,
                ease: "power3.out",
                onComplete: () => {
                    audioRef.current?.play();
                    gsap.fromTo(char, { filter: "brightness(1)" }, { filter: "brightness(1.6)", duration: 0.08, yoyo: true, repeat: 3 });
                },
            },
            0.9
        );

        tl.to(char, { x: -8, duration: 0.08 }, ">");
        tl.to(char, { x: 0, duration: 0.24, ease: "elastic.out(1,0.6)" });

        tl.to(sword, { x: 80, rotation: 8, duration: 0.6 }, "+=0.18");

        tl.to(container, { backgroundColor: "rgba(255,255,255,0.02)", duration: 0.18 }, "+=0.18");

        return () => {tl.kill()};
    }, [visible]);

    if (!visible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed w-full inset-0 z-[9999] flex items-center justify-center bg-black text-white"
        >
            
            {/* moving background layers (subtle parallax via CSS variables updated by gsap if needed) */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('/mnt/data/A_digital_image_of_outer_space_displays_stars_of_v.png')`,
                    opacity: 0.6,
                    transform: "scale(1.06)",
                    filter: "contrast(1.05) saturate(1.05) blur(0.6px)",
                    mixBlendMode: "screen",
                }}
            />

            {/* scanline / moving light */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute left-[-30%] top-1/3 w-[160%] h-[12%] rounded-full"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.06) 60%, transparent 100%)",
                        transform: "rotate(-6deg)",
                        filter: "blur(14px)",
                        opacity: 0.85,
                    }}
                />
            </div>

            {/* center scene container */}
            <div className="relative z-20 w-full max-w-3xl flex flex-col items-center gap-6 select-none px-6">
                {/* character */}
                


                <img
                    ref={charRef}
                    src="/clash.png"
                    alt="character"
                    className="w-56 md:w-72  z-30 "
                    style={{ transformStyle: "preserve-3d" }}
                />

                {/* sword (absolute so it can fly from side) */}
                <img
                    ref={swordRef}
                    src="/sword.png"
                    alt="sword"
                    className="absolute z-40 w-40 md:w-48 -translate-y-10"
                    style={{ left: "10%", transform: "rotate(-18deg)" }}
                />

                {/* subtitle / loading text */}
                <div className="mt-6 text-center">
                    <h2 className="text-xl md:text-2xl font-semibold tracking-wide">Welcome to chaoTechX   </h2>
                    <p className="text-sm text-white/70 mt-2"> Go ahead — downloading now  </p>
                    {/* NEON PULSING TEXT ABOVE CHARACTER */}
                    <motion.h2
                        initial={{ opacity: 1, y: -30, scale: 1 }}
                        animate={{
                            scale: [1, 1.06, 1], // نبض خفيف مستمر
                            textShadow: [
                                "0 0 4px #00fff7, 0 0 10px #00fff7, 0 0 20px #00fff7",
                                "0 0 6px #00fff7, 0 0 12px #00fff7, 0 0 24px #00fff7",
                                "0 0 4px #00fff7, 0 0 10px #00fff7, 0 0 20px #00fff7",
                            ],
                        }}
                        transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className=" md:top-8 mt-12 text-3xl md:text-3xl font-extrabold text-cyan-400 z-50 flex flex-wrap justify-center gap-1 pointer-events-none"
                    >
                        {"E-commerce Platform".split("").map((char, i) => (
                            <motion.span
                                key={i}
                                className="inline-block"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.8 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.h2>
                </div>
            </div>

            {/* subtle vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.02), rgba(0,0,0,0.7))" }} />
            
        </div>
    );
}
