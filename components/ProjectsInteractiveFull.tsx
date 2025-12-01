"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { motion, useAnimation } from "framer-motion";

const projects = [
    { id: "project1", title: "Website Design", img: "/pro1.png", description: "Description of Website Design project." },
    { id: "project2", title: "SEO Optimization", img: "/pro2.jpg", description: "Description of SEO Optimization project." },
    { id: "project3", title: "E-commerce Platform", img: "/pro3.jpg", description: "Description of E-commerce Platform project." },
    { id: "project4", title: "AI Application", img: "/pro4.png", description: "Description of AI Application project." },
];

export default function HeroCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(2);
    const controls = useAnimation();
    const animationRefs = useRef<(HTMLImageElement | null)[]>([]);

    const [activeProject, setActiveProject] = useState<string | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);

    // Scroll animation
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

    // Carousel animation
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

    // Floating effect on current card
    const el = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!el.current) return;
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(el.current, { x: 12, y: 8, duration: 3, ease: "sine.inOut" });
        tl.to(el.current, { x: -12, y: -8, duration: 3, ease: "sine.inOut" });
        return () => {tl.kill();}
    }, []);

    const prev = () => setCurrentIndex((prev) => (prev - 1 < 0 ? projects.length - 1 : prev - 1));
    const next = () => setCurrentIndex((prev) => (prev + 1) % projects.length);

    // Click effect
    const handleCardClick = (idx: number) => {
        const card = animationRefs.current[idx];
        if (!card) return;

        // Lift + 3D rotation
        gsap.to(card, { y: -30, duration: 0.2, ease: "power1.out" });
        gsap.to(card, {
            rotationY: 720,
            rotationX: 360,
            scale: 1.05,
            duration: 0.8,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                gsap.to(card, { y: 0, rotationY: 0, rotationX: 0, scale: 1, duration: 0.4, ease: "power2.out" });
                // Play sound safely
                try {
                    const audio = new Audio("/hover.mp3");
                    audio.play();
                } catch { }
                setActiveProject(projects[idx].id);
                setShowOverlay(true);
            },
        });
    };

    const closeOverlay = () => {
        setShowOverlay(false);
        setActiveProject(null);
    };

    return (
        <section className="w-full h-screen relative bg-black flex items-center justify-center overflow-hidden">
            <h1 className="hero w-full items-center justify-center -translate-y-72 z-50 text-white hero-title hero-waves text-4xl md:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl flex flex-wrap gap-2">
                {"Ouw Projects ".split("").map((l, i) => (
                    <span key={i}>{l}</span>
                ))}


            </h1>
            {/* Carousel */}
            <motion.div
                ref={containerRef}
                className="absolute w-full h-full flex items-center justify-center"
                initial={{ opacity: 0, y: 100 }}
                animate={controls}
            >
                
                {projects.map((project, idx) => (
                    <div key={project.id} className="absolute w-full h-full flex items-center justify-center">
                        <div ref={idx === currentIndex ? el : null} className="relative">
                            <img
                                ref={(el) => {(animationRefs.current[idx] = el)}}
                                src={project.img}
                                alt={project.title}
                                className="w-full max-w-full h-4/5 object-cover rounded-xl shadow-2xl cursor-pointer"
                                onClick={() => handleCardClick(idx)}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{
                                    opacity: idx === currentIndex ? 1 : 0,
                                    y: idx === currentIndex ? 0 : 20,
                                    scale: idx === currentIndex ? [1, 1.04, 1] : 0.95,
                                    transition: { duration: 1, ease: "easeOut", scale: { repeat: Infinity, repeatType: "mirror", duration: 2 } },
                                }}
                                whileHover={{
                                    scale: 1.14,
                                    textShadow: "0 0 30px cyan, 0 0 60px cyan, 0 0 90px cyan",
                                    transition: { duration: 0.25 },
                                }}
                                className="top-10 left-0 text-4xl tracking-wide text-cyan-300 font-bold drop-shadow-[0_0_12px_cyan]"
                            >
                                {project.title}
                            </motion.div>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Navigation Buttons */}
            <button onClick={prev} className="absolute left-10 bottom-20 bg-white/10 border border-white/20 backdrop-blur-xl text-white px-6 py-4 rounded-full hover:bg-white/20 transition flex items-center justify-center text-2xl">←</button>
            <button onClick={next} className="absolute right-10 bottom-20 bg-white/10 border border-white/20 backdrop-blur-xl text-white px-6 py-4 rounded-full hover:bg-white/20 transition flex items-center justify-center text-2xl">→</button>

            {/* Overlay نابض بالحياة */}
            {showOverlay && activeProject && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={closeOverlay}
                >
                    <motion.div
                        ref={(el) => {
                            if (!el) return;
                            // Overlay heartbeat
                            gsap.to(el, { scale: 1.02, boxShadow: "0 0 30px cyan,0 0 60px cyan", duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" });

                            // Create particles dynamically
                            const count = 40;
                            const particles: HTMLDivElement[] = [];
                            for (let i = 0; i < count; i++) {
                                const p = document.createElement("div");
                                p.className = "absolute rounded-full bg-cyan-400 opacity-40 pointer-events-none";
                                const size = Math.random() * 4 + 2;
                                p.style.width = `${size}px`;
                                p.style.height = `${size}px`;
                                p.style.top = `${Math.random() * 100}%`;
                                p.style.left = `${Math.random() * 100}%`;
                                el.appendChild(p);
                                particles.push(p);
                            }

                            // Animate particles
                            const tween = gsap.to(particles, {
                                y: "random(-10,10)",
                                x: "random(-10,10)",
                                repeat: -1,
                                yoyo: true,
                                duration: 3.6,
                                ease: "sine.inOut",
                                stagger: { each: 0.05 },
                            });

                            return () => {
                                tween.kill();
                                particles.forEach(p => p.remove());
                            };
                        }}
                        className="relative bg-neutral-900 rounded-xl p-8 max-w-lg text-white overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Neon title */}
                        <h2
                            className="text-2xl font-bold mb-4 text-cyan-400 cursor-pointer inline-block relative z-10"
                            onMouseEnter={(e) => {
                                gsap.to(e.currentTarget, {
                                    scale: 1.08,
                                    textShadow: "0 0 8px cyan, 0 0 16px cyan, 0 0 24px cyan",
                                    duration: 0.3,
                                    yoyo: true,
                                    repeat: -1,
                                    ease: "sine.inOut",
                                });
                            }}
                            onMouseLeave={(e) => {
                                gsap.to(e.currentTarget, { scale: 1, textShadow: "0 0 0px cyan", duration: 0.3 });
                            }}
                        >
                            {projects.find(p => p.id === activeProject)?.title}
                        </h2>

                        {/* Auto-generated description */}
                        <p className="text-gray-300 relative z-10">
                            {(() => {
                                const proj = projects.find(p => p.id === activeProject);
                                if (!proj) return "";
                                switch (proj.title) {
                                    case "Website Design":
                                        return "As Full-Stack Web Developers, we built a responsive and modern website design with intuitive UI/UX, seamless backend integration, and optimized performance for all devices.";
                                    case "SEO Optimization":
                                        return "We implemented advanced SEO strategies, optimized content structure, and integrated analytics to boost search engine rankings while maintaining scalable full-stack architecture.";
                                    case "E-commerce Platform":
                                        return "Our team developed a robust e-commerce platform with secure payment integration, inventory management, and responsive front-end, ensuring a smooth shopping experience for users.";
                                    case "AI Application":
                                        return "We created an AI-powered web application leveraging modern frameworks, real-time data processing, and interactive frontend components, combining backend logic and AI services seamlessly.";
                                    default:
                                        return "Full-Stack Web Development project delivering clean code, responsive UI, and robust backend functionality.";
                                }
                            })()}
                        </p>
                    </motion.div>
                </div>
            )}

        </section>
    );
}
