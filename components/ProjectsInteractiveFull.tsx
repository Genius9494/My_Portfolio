"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { motion, useAnimation } from "framer-motion";

const projects = [
    { id: "project1", title: "Website Design", img: "/pro1.png" },
    { id: "project2", title: "SEO Optimization", img: "/pro2.jpg" },
    { id: "project3", title: "E-commerce Platform", img: "/pro3.jpg" },
    { id: "project4", title: "AI Application", img: "/pro4.png" },
];

export default function HeroCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(2);
    const controls = useAnimation();
    const animationRefs = useRef<(HTMLImageElement | null)[]>([]);

    useEffect(() => {
        const onScroll = () => {
            const top = containerRef.current?.getBoundingClientRect().top || 0;
            const windowHeight = window.innerHeight;
            if (top < windowHeight * 0.8) {
                controls.start({ opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } });
            }
        };
        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, [controls]);

    useEffect(() => {
        if (!containerRef.current) return;
        const children = Array.from(containerRef.current.children) as HTMLElement[];
        children.forEach((child, idx) => {
            const offset = (idx - currentIndex) * window.innerWidth;
            gsap.to(child, { x: offset, duration: 1.2, ease: "power3.inOut" });

            if (idx === currentIndex) {
                gsap.to(child, { scale: 1, opacity: 1, duration: 1.2 });
            } else {
                gsap.to(child, { scale: 0.8, opacity: 0.3, duration: 1.2 });
            }
        });
        
    }, [currentIndex]);

    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!el.current) return;
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(el.current, { x: 12, y: 8, duration: 3, ease: "sine.inOut" });
        tl.to(el.current, { x: -12, y: -8, duration: 3, ease: "sine.inOut" });
        return () => {
            tl.kill();
        };
    }, []);

    const prev = () => setCurrentIndex((prev) => (prev - 1 < 0 ? projects.length - 1 : prev - 1));
    const next = () => setCurrentIndex((prev) => (prev + 1) % projects.length);

    return (
        <section className="w-full h-screen relative bg-black flex items-center justify-center overflow-hidden">
            <motion.div
                ref={containerRef}
                className="absolute w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, y: 100 }}
                animate={controls}
            >
                {projects.map((project, idx) => (
                    <div
                        key={project.id}
                        id={project.id}
                        className="absolute w-full h-full flex items-center justify-center"
                    >
                        <div ref={idx === currentIndex ? el : null} className="relative">
                            <img
                                ref={(el) => { (animationRefs.current[idx] = el) }}
                                src={project.img}
                                alt={project.title}
                                className="w-full max-w-full h-4/5 object-cover rounded-xl shadow-2xl pointer-events-none"
                            />

                            {/*  image address */}
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{
                                    opacity: idx === currentIndex ? 1 : 0,
                                    y: idx === currentIndex ? 0 : 20,
                                    scale: idx === currentIndex ? [1, 1.04, 1] : 0.95,
                                    transition: {
                                        duration: 1,
                                        ease: "easeOut",
                                        scale: { repeat: Infinity, repeatType: "mirror", duration: 2 }
                                    }
                                }}
                                whileHover={{
                                    scale: 1.14,
                                    textShadow: `
            0 0 30px rgba(0,255,255,1),
            0 0 60px rgba(0,255,255,1),
            0 0 90px rgba(0,255,255,1)
        `,
                                    transition: { duration: 0.25 }
                                }}
                                className="
        top-10 left-0 
        text-4xl  tracking-wide
        text-cyan-300 font-bold
        drop-shadow-[0_0_12px_rgba(0,255,255,1)]
    "
                            >
                                {project.title}
                            </motion.div>

                        </div>
                    </div>
                ))}
            </motion.div>

            <button
                onClick={prev}
                className="absolute left-10 bottom-20 bg-white/10 border border-white/20 backdrop-blur-xl text-white px-6 py-4 rounded-full hover:bg-white/20 transition flex items-center justify-center text-2xl"
            >
                ←
            </button>
            <button
                onClick={next}
                className="absolute right-10 bottom-20 bg-white/10 border border-white/20 backdrop-blur-xl text-white px-6 py-4 rounded-full hover:bg-white/20 transition flex items-center justify-center text-2xl"

            >
                →
            </button>
        </section>
    );
}