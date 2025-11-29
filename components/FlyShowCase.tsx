"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

type Direction = "left" | "right" | "top" | "bottom";

export default function FlyShowCase() {
    return (
        <section
            className="relative py-32 px-6 md:px-20 text-white overflow-hidden"
        >
            {/* STARFIELD BACKGROUND */}
            <div className="absolute inset-0 -z-10 opacity-40 bg-[url('/stars.webp')] bg-cover bg-center" />

            {/* MAIN TITLE */}
            <FlyItem
                delay={0.1}
                from="top"
                className="text-6xl font-extrabold text-center mb-16 text-[#00eaff] drop-shadow-[0_0_25px_#00eaff]"
            >
                Elevating Digital Experiences
            </FlyItem>

            {/* SUBTITLE */}
            <FlyItem
                delay={0.3}
                from="bottom"
                className="text-center text-gray-300 text-xl max-w-2xl mx-auto mb-24"
            >
                We craft full-stack solutions that fuse performance, modern
                aesthetics, and advanced engineering into seamless digital products.
            </FlyItem>

            {/* FEATURES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-5xl mx-auto">

                <Feature
                    from="left"
                    title="Smart Architecture"
                    text="Scalable, modular, and built for long-term growth — our systems evolve with your business."
                />

                <Feature
                    from="right"
                    title="High-End Performance"
                    text="Optimized backend logic and ultra-smooth UI ensure unmatched stability and speed."
                />

                <Feature
                    from="left"
                    title="Modern UI / UX"
                    text="Clean design, fluid motion, and meaningful interactions define our visual identity."
                />

                <Feature
                    from="right"
                    title="Full-Stack Integration"
                    text="APIs, databases, and frontend rendering work together as one unified digital system."
                />

            </div>
        </section>
    );
}

/* ------------------------------------------
 * FEATURE CARD COMPONENT
 * ----------------------------------------- */
function Feature({ title, text, from }: { title: string; text: string; from: Direction }) {
    return (
        <FlyItem
            delay={0.2}
            from={from}
            className="p-10 rounded-3xl border border-white/10 bg-neutral-900/40 backdrop-blur-xl 
                       shadow-[0_0_35px_#00eaff30] transition-all duration-300
                       hover:shadow-[0_0_45px_#00eaff80] hover:scale-[1.03]"
        >
            <h3 className="text-3xl font-bold text-[#00eaff] drop-shadow-[0_0_15px_#00eaff] mb-3">
                {title}
            </h3>
            <p className="text-gray-300 leading-relaxed">{text}</p>
        </FlyItem>
    );
}

/* ------------------------------------------
 * INTERSECTION + FRAMER MOTION (NO LIBRARIES)
 * ----------------------------------------- */
function FlyItem({
    children,
    delay = 0,
    from = "bottom",
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    from?: Direction;
    className?: string;
}) {
    const controls = useAnimation();
    const ref = useRef<HTMLDivElement | null>(null);

    const directions: Record<Direction, { x: number; y: number }> = {
        left: { x: -100, y: 0 },
        right: { x: 100, y: 0 },
        top: { x: 0, y: -100 },
        bottom: { x: 0, y: 100 },
    };

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        controls.start({
                            x: 0,
                            y: 0,
                            opacity: 1,
                            transition: { duration: 0.6, ease: "easeOut", delay },
                        });
                    } else {
                        controls.start({
                            ...directions[from],
                            opacity: 0,
                            transition: { duration: 0.4, ease: "easeIn" },
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [controls, delay, from]);

    return (
        <motion.div
            ref={ref}
            initial={{ ...directions[from], opacity: 0 }}
            animate={controls}
            className={className}
        >
            {children}
        </motion.div>
    );
}
