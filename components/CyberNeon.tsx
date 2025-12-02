"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SuperInteractiveCopySection from "./SuperInterActiveCopySection";
import SDLCSections from "@/components/SDLCSections";
import Timeline3D from "@/components/TimeLine";
import SplitSections from "@/components/SplitSections";


export default function CyberNeonPage() {
    const cursorRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);


    const [year, setYear] = useState<number | null>(null);
    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }
    }, []);


    /* ---------------------- Cursor Sparks ---------------------- */
    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        function move(e: MouseEvent) {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
            });

            const spark = document.createElement("div");
            spark.className =
                "fixed w-3 h-3 bg-cyan-400 rounded-full pointer-events-none opacity-100";
            spark.style.left = e.clientX + "px";
            spark.style.top = e.clientY + "px";
            document.body.appendChild(spark);

            gsap.to(spark, {
                x: "+=30",
                y: "+=30",
                opacity: 0,
                scale: 0,
                duration: 0.4,
                onComplete: () => spark.remove(),
            });
        }

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    /* ---------------------- Text Grid Reveal ---------------------- */
    useEffect(() => {
        gsap.from(".cyber-title span", {
            opacity: 0,
            filter: "blur(10px)",
            y: 40,
            stagger: 0.05,
            duration: 0.6,
            ease: "power4.out",
        });
    }, []);

    /* ---------------------- Scroll Sections ---------------------- */
    useEffect(() => {
        gsap.utils.toArray(".cyber-section").forEach((section: any) => {
            gsap.from(section, {
                opacity: 0,
                y: 100,
                duration: 1.2,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
            });
        });
    }, []);







    useEffect(() => {
        const items = gsap.utils.toArray(".timeline-item") as HTMLDivElement[];

        items.forEach((item: HTMLDivElement, i) => {
            gsap.fromTo(
                item,
                {
                    opacity: 0,
                    y: 80,
                    z: -100,
                    rotateX: 45,
                    filter: "blur(10px)",
                },
                {
                    opacity: 1,
                    y: 0,
                    z: 0,
                    rotateX: 0,
                    filter: "blur(0px)",
                    duration: 1.4,
                    ease: "power3.out",
                    delay: i * 0.2,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                    },
                }
            );
        });
    }, []);








    // 3D Timeline Animation
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const items = section.querySelectorAll(".timeline-item");

        // Load hover sound
        const hoverSound = new Audio("/hover.mp3");
        hoverSound.volume = 0.6;

        items.forEach((item, index) => {
            const direction = index % 2 === 0 ? -150 : 150;

            // GSAP entrance animation
            gsap.fromTo(
                item,
                { x: direction, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.3,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                    },
                }
            );

            // Add sound on hover
            item.addEventListener("mouseenter", () => {
                hoverSound.currentTime = 0; // restart sound
                hoverSound.play();
            });
        });

        // Glow line animation
        gsap.fromTo(
            "#glow-line",
            { height: 0 },
            {
                height: "100%",
                duration: 2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                },
            }
        );
    }, []);







    useEffect(() => {
        const ctx = gsap.context(() => {
            const sections = gsap.utils.toArray<HTMLElement>(".split-section");

            sections.forEach((section) => {
                const left = section.querySelector(".split-left") as HTMLElement;
                const right = section.querySelector(".split-right") as HTMLElement;

                if (!left || !right) return;

                // initial positions
                gsap.set(left, { x: -150, opacity: 0 });
                gsap.set(right, { x: 150, opacity: 0, scale: 1 });

                // Entrance animation + Parallax + Distortion for right
                gsap.to(left, {
                    x: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom top",
                        scrub: true,
                        toggleActions: "play reverse play reverse",
                    },
                });

                gsap.to(right, {
                    x: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom top",
                        scrub: true,
                        toggleActions: "play reverse play reverse",
                    },
                });

                // RIGHT SIDE EFFECTS
                const imgWrapper = right.querySelector(".img-wrapper") as HTMLElement;
                if (imgWrapper) {
                    // Border Glow
                    gsap.fromTo(
                        imgWrapper,
                        { boxShadow: "0 0 0px #00eaff" },
                        {
                            boxShadow: "0 0 25px #00eaff",
                            scrollTrigger: {
                                trigger: section,
                                start: "top 80%",
                                end: "bottom top",
                                scrub: true,
                            },
                        }
                    );

                    // Parallax
                    gsap.to(imgWrapper, {
                        y: -20,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    });

                    // Distortion
                    gsap.to(imgWrapper, {
                        scale: 1.05,
                        rotation: 1.5,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    });
                }

                // LEFT SIDE EFFECTS (Parallax + Glow)
                gsap.to(left, {
                    y: -15,
                    textShadow: "0 0 15px #00eaff",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom top",
                        scrub: true,
                    },
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const scenes = [
        {
            title: "ابتكار يعيد تشكيل التجربة",
            text: "الفكرة ليست مجرد تصميم — بل إحساس متكامل يبدأ من أول تفاعل.",
            image: "/logo.png",
            bg: "bg-[#0D1117]",
        },
        {
            title: "تنسيق بصري يعكس الاحتراف",
            text: "الخطوط، الألوان، والمسافات تتكامل لتشكل هوية قوية.",
            image: "/logo.png",
            bg: "bg-[#10141E]",
        },
        {
            title: "جمالية الحركة",
            text: "الأنيميشن ليس للمتعة فقط — بل يوجه انتباه المستخدم ويخلق انسيابية.",
            image: "/logo.png",
            bg: "bg-[#0B0F14]",
        },
        {
            title: "تجربة مستخدم متكاملة",
            text: "كل حركة لها هدف… وكل تفصيلة لها تأثير.",
            image: "/logo.png",
            bg: "bg-[#080A0F]",
        },
    ];



    return (
        <main className="relative w-full min-h-screen text-cyan-300 bg-black overflow-hidden">


            {/* Cursor sparks */}
            <div
                ref={cursorRef}
                className="fixed w-8 h-8 border border-cyan-400 rounded-full mix-blend-difference pointer-events-none z-[999]"
            ></div>



            <div>
                {/* Sections */}
                <SDLCSections />
            </div>

            <div>
                {/* 3D TIMELINE SECTION */}
                <Timeline3D />
            </div>


            <div>
                <SplitSections />
            </div>

            <div>
                <SuperInteractiveCopySection />
            </div>

            <footer className="py-20 text-center opacity-40 text-sm tracking-wide z-50">
                © {year} Cyber Grid — Demo
            </footer>

        </main>
    );
}
