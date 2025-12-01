"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


export default function RandomSideSections() {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }
    }, []);

    const rootRef = useRef<HTMLDivElement>(null);

    const sections = [
        {
            title: "Deep Technical Expertise",
            content:
                "We bring extensive experience in full-stack web and mobile development, using the latest technologies and frameworks to deliver reliable, scalable, and high-performance digital solutions.",
            side: "left",
        },
        {
            title: "Tailored Solutions for Every Project",
            content:
                "Every project is unique—and so are our solutions. We build fully customized platforms, applications, and systems designed specifically to match your goals, audience, and business needs.",
            side: "right",
        },
        {
            title: "Commitment to Premium Quality",
            content:
                "From clean code to thorough testing and seamless deployment, we follow strict quality standards to ensure your product delivers exceptional performance and user experience.",
            side: "left",
        },
        {
            title: "Transparent Communication",
            content:
                "We keep you involved every step of the way with clear, consistent updates and full transparency throughout the entire development process—no confusion, no surprises.",
            side: "right",
        },
        {
            title: "Reliable Support & Maintenance",
            content:
                "Our partnership doesn’t end at launch. We offer ongoing support, updates, and improvements to keep your application running smoothly and aligned with the latest technologies.",
            side: "left",
        },
        {
            title: "Fast Delivery Without Compromising Quality",
            content:
                "We combine speed with precision—delivering projects efficiently while maintaining the highest level of quality, performance, and attention to detail.",
            side: "right",
        },
    ];

    // ---------------- Neon Background ----------------
    useEffect(() => {
        if (!mounted) return;

        const container = rootRef.current;
        if (!container) return;

        const particles: HTMLDivElement[] = [];
        for (let i = 0; i < 40; i++) {
            const p = document.createElement("div");
            p.className =
                "absolute rounded-full bg-cyan-400 opacity-25 pointer-events-none";
            p.style.width = `${Math.random() * 5 + 2}px`;
            p.style.height = p.style.width;
            p.style.top = `${Math.random() * 100}%`;
            p.style.left = `${Math.random() * 100}%`;

            container.appendChild(p);
            particles.push(p);
        }

        gsap.to(particles, {
            y: "random(-15,15)",
            x: "random(-15,15)",
            repeat: -1,
            yoyo: true,
            duration: 4,
            ease: "sine.inOut",
            stagger: { each: 0.05 },
        });

        return () => particles.forEach((p) => p.remove());
    }, []);

    // ---------------- Section Animations ----------------
    useEffect(() => {
        const allSections = gsap.utils.toArray<HTMLElement>(".side-section");

        allSections.forEach((section) => {
            const isLeft = section.classList.contains("from-left");
            const title = section.querySelector("h3") as HTMLElement | null;
            const subtitle = section.querySelector("p") as HTMLElement | null;




            // Entrance animation
            gsap.fromTo(
                section,
                { x: isLeft ? -100 : 100, opacity: 0, scale: 0.95 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",     // يبدأ بعد دخول جزء أكبر (حل الاختفاء المبكر)
                        end: "bottom 65%",    // يمنع اختفاء النص قبل الخروج الحقيقي
                        toggleActions: "play none none reverse",
                        scrub: false,         // يمنع اختفاء تدريجي أثناء التمرير
                    },

                }
            );

            // Neon Glow Pulse (خففنا انتشار الـ shadow)
            gsap.to(section, {
                boxShadow: "0 0 15px #00c8ff, 0 0 30px #00c8ff",
                duration: 1.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Hover Effects
            section.addEventListener("mouseenter", () => {
                gsap.to(section, {
                    scale: 1.02,
                    boxShadow: "0 0 35px #00c8ff, 0 0 70px #00ff66, 0 0 100px #00ffaa",
                    duration: 0.3,
                });

                if (title)
                    gsap.to(title, {
                        color: "#00ffff",
                        textShadow:
                            "0 0 10px #00c8ff, 0 0 20px #00ffcc, 0 0 30px #00ffaa",
                        duration: 0.3,
                    });

                if (subtitle)
                    gsap.to(subtitle, {
                        color: "#a0f0ff",
                        textShadow: "0 0 5px #00c8ff",
                        duration: 0.3,
                    });
            });

            section.addEventListener("mouseleave", () => {
                gsap.to(section, {
                    scale: 1,
                    boxShadow: "0 0 15px #00c8ff, 0 0 30px #00ff66",
                    duration: 0.5,
                });

                if (title)
                    gsap.to(title, {
                        color: "#ffffff",
                        textShadow: "none",
                        duration: 0.3,
                    });

                if (subtitle)
                    gsap.to(subtitle, {
                        color: "#9ca3af",
                        textShadow: "none",
                        duration: 0.3,
                    });
            });
        });
    }, []);

    return (
        <div
            ref={rootRef}
            className="relative w-full py-32 !z-10 bg-black text-white overflow-hidden"
        >
            {sections.map((s, i) => (
                <div
                    key={i}
                    className={`side-section p-10 rounded-3xl border border-neutral-800 mb-16 ${s.side === "left" ? "from-left" : "from-right"
                        }`}
                >
                    <h3 className="text-4xl font-bold mb-4">{s.title}</h3>
                    <p className="text-gray-400 leading-8">{s.content}</p>
                </div>
            ))}
        </div>
    );
}
