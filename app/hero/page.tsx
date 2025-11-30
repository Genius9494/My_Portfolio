"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import IndependentIconsMarquee from "../../components/progressBar";
import CurvedLoop from "@/components/CurvedLoop";
import HeroCarousel from "@/components/ProjectsInteractiveFull";
import TextType from "@/components/TextType";
import FlyShowcase from "@/components/FlyShowCase";
import NeonFullSection from "@/components/HolographicCard";
import NeonFullPagePulse from "@/components/generateParticles";
import RandomSideSections from "@/components/RandomSideSections";


export default function PortfolioEnhancedPage() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const cursorRef = useRef<HTMLDivElement | null>(null);
    // const logoSrc = "/logo.png";

    /* ------------------------------ Smooth Scroll ------------------------------ */
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.07,
            wheelMultiplier: 1,
            touchMultiplier: 0.6,
        });

        let rafId = 0;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    /* --------------------------- Wavy Hero Motion --------------------------- */
    useEffect(() => {
        gsap.to(".hero-waves span", {
            y: 20,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            duration: 1.8,
            stagger: {
                amount: 1.2,
                from: "center",
            },
        });
    }, []);

    /* ----------------------------- GSAP Core Animations ----------------------------- */
    useEffect(() => {
        if (!containerRef.current) return;

        // Register GSAP plugins
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const ctx = gsap.context(() => {
            // HERO Fade / Lift
            gsap.from(".hero-title", {
                opacity: 0,
                y: 80,
                duration: 1.6,
                ease: "power4.out",
            });

            gsap.from(".hero-text", {
                opacity: 0,
                y: 50,
                duration: 1.4,
                delay: 0.2,
                ease: "power3.out",
            });

            gsap.from(".hero-btn", {
                opacity: 0,
                y: 30,
                duration: 1.3,
                delay: 0.35,
                ease: "power3.out",
            });

            // PROJECT FLOATING EFFECT
            gsap.utils.toArray(".project-card").forEach((card: any, i: number) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 120,
                    duration: 1.4,
                    delay: i * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        // markers: true,
                    },
                });

                // Floating wave motion (continuous)
                gsap.to(card, {
                    y: "+=20",
                    repeat: -1,
                    yoyo: true,
                    duration: 3,
                    ease: "sine.inOut",
                    delay: i * 0.2,
                });
            });

            // ABOUT section soft wave
            gsap.from(".about-section", {
                opacity: 0,
                y: 100,
                duration: 1.5,
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top 90%",
                    // markers: true,
                },
            });

            /* ------------------- RIGHT / LEFT Scroll Animations (side-section) ------------------- */
            const sideSections = gsap.utils.toArray(".side-section");
            sideSections.forEach((sec: any, index: number) => {
                const direction = index % 2 === 0 ? 200 : -200; // even -> from right (+x), odd -> from left (-x)

                gsap.fromTo(
                    sec,
                    { opacity: 0, x: direction },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sec,
                            start: "top 85%",
                            end: "top 20%",
                            scrub: 0.6,
                            // markers: true,
                        },
                    }
                );
            });

            /* -------------------- NEW STRONG SCROLL EFFECTS -------------------- */
            // slide-right-section
            gsap.from(".slide-right-section", {
                x: 200,
                opacity: 0,
                duration: 1.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".slide-right-section",
                    start: "top 85%",
                    toggleActions: "play reverse play reverse",
                    // markers: true,
                },
            });

            // slide-left-section
            gsap.from(".slide-left-section", {
                x: -200,
                opacity: 0,
                duration: 1.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".slide-left-section",
                    start: "top 85%",
                    toggleActions: "play reverse play reverse",
                    // markers: true,
                },
            });

            // Parallax Image
            gsap.to(".parallax-image", {
                y: -80,
                duration: 2,
                ease: "none",
                scrollTrigger: {
                    trigger: ".parallax-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    // markers: true,
                },
            });

            // Fly-in titles
            gsap.from(".fly-title", {
                y: 120,
                opacity: 0,
                stagger: 0.2,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".fly-section",
                    start: "top 90%",
                    // markers: true,
                },
            });

            // Rotate + Fade
            gsap.from(".rotate-section", {
                opacity: 0,
                rotate: -10,
                y: 60,
                duration: 1.4,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".rotate-section",
                    start: "top 85%",
                    toggleActions: "play reverse play reverse",
                    // markers: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    /* --------------------------- Custom Cursor Motion --------------------------- */
    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const move = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power3.out",
            });
        };

        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);



    // 3D Studio Sections


    useEffect(() => {
        const sections = gsap.utils.toArray(".studio-section") as HTMLElement[];

        sections.forEach((section, i) => {
            ScrollTrigger.create({
                trigger: section,
                start: "top top",
                end: "bottom top",
                pin: true,
                pinSpacing: false,
                scrub: true,
            });

            gsap.fromTo(
                section,
                { autoAlpha: 0, y: 100 },
                {
                    autoAlpha: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "top center",
                        scrub: true,
                    },
                }
            );

            gsap.to(
                section,
                {
                    autoAlpha: 0,
                    y: -100,
                    duration: 1,
                    ease: "power2.in",
                    scrollTrigger: {
                        trigger: section,
                        start: "bottom center",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        });
    }, []);



    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!rootRef.current) return;

        const ctx = gsap.context(() => {
            // simple reveal for .reveal
            gsap.utils.toArray(".reveal").forEach((el: any) => {
                gsap.from(el, {
                    y: 40,
                    opacity: 0,
                    duration: 1.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse",
                    },
                });
            });

            // parallax layers inside .parallax (data-depth)
            gsap.utils.toArray(".parallax [data-depth]").forEach((layer: any) => {
                const depth = parseFloat(layer.getAttribute("data-depth")) || 0.2;
                gsap.to(layer, {
                    y: () => `-${30 * depth}`,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".parallax",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 0.6,
                    },
                });
            });

            // Fly-in titles (stagger)
            gsap.from(".fly-title", {
                y: 80,
                opacity: 0,
                stagger: 0.12,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".fly-section",
                    start: "top 90%",
                },
            });

            // Shine effect on .shiny elements (on hover we toggle a child .shine)
            gsap.set(".shiny .shine", { x: "-120%" });
            Array.from(document.querySelectorAll(".shiny")).forEach((el: any) => {
                el.addEventListener("mouseenter", () => {
                    gsap.to(el.querySelector(".shine"), { x: "120%", duration: 0.9, ease: "power2.out" });
                });
                el.addEventListener("mouseleave", () => {
                    gsap.to(el.querySelector(".shine"), { x: "-120%", duration: 0.9, ease: "power2.in" });
                });
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);





    // ----- Magnetic Buttons (hover interaction) -----
    useEffect(() => {
        const buttons = Array.from(document.querySelectorAll(".magnetic")) as HTMLElement[];
        function onMove(this: HTMLElement, e: MouseEvent) {
            const rect = this.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            gsap.to(this, { x: relX * 0.18, y: relY * 0.18, scale: 1.03, duration: 0.35, ease: "power3.out" });
        }
        function onLeave(this: HTMLElement) {
            gsap.to(this, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1,0.6)" });
        }
        buttons.forEach((b) => {
            b.addEventListener("mousemove", onMove as any);
            b.addEventListener("mouseleave", onLeave as any);
        });
        return () => {
            buttons.forEach((b) => {
                b.removeEventListener("mousemove", onMove as any);
                b.removeEventListener("mouseleave", onLeave as any);
            });
        };
    }, []);

    return (
        <main
            ref={containerRef}
            className="  w-full text-white bg-neutral-950 px-6 md:px-16 lg:px-32 overflow-hidden"
        >

            <div className="w-full  flex flex-col items-center justify-center overflow-hidden">



                {/* HERO */}
                <section className=" min-h-screen flex flex-col items-center justify-center  relative w-full">
                    {/* Wavy Animated Text */}

                    <TextType
                        text={["We work to make imaginative ideas a reality. Let's begin the journey together."]}
                        typingSpeed={2}
                        pauseDuration={3000}
                        showCursor={true}
                        cursorCharacter="|"
                        className="absolute top-16 lg:text-5xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl"
                    />





                    <CurvedLoop
                        marqueeText="Welcome to Chao TechX, where innovation meets precision to create powerful digital experiences.
                                     We are a specialized team of full-stack web and mobile developers, dedicated to transforming ideas into high-performance products built with modern technologies and industry-leading standards.
                                     At Chao TechX, we craft end-to-end digital solutions—from strategic planning and UI/UX design to advanced development, deployment, and continuous optimization.
                                     We believe every project deserves exceptional attention to detail, and that every line of code can drive meaningful impact for your business.
                                     We build robust web applications, custom platforms, and intelligent mobile apps that deliver seamless performance across iOS and Android.
                                     Whether you’re a startup aiming to launch your vision or an established company seeking to elevate your digital presence, our mission is to empower your goals with solutions engineered for scalability, security, and results.
                                     Partner with us—and let’s create a digital experience that stands out, inspires, and grows with your success."
                        speed={3}
                        curveAmount={100}
                        direction="left"
                        interactive={true}
                        className="custom-text-style translate-y-12"
                    />

                    <h1 className="hero  w-full items-center justify-center -translate-y-32 text-white hero-title hero-waves text-4xl md:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl flex flex-wrap gap-2">
                        {"Ouw    Technologies ".split("").map((l, i) => (
                            <span key={i}>{l}</span>
                        ))}


                    </h1>
                    <div className=" w-full  bg-gray-500 rounded-2xl">
                        <IndependentIconsMarquee />
                    </div>



                    <h1 className="hero w-full items-center justify-center mt-52 z-50 text-white hero-title hero-waves text-4xl md:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl flex flex-wrap gap-2">
                        {"Ouw Projects ".split("").map((l, i) => (
                            <span key={i}>{l}</span>
                        ))}


                    </h1>

                    <HeroCarousel />

                </section>
            </div>


            {/* RANDOM SIDE SECTIONS */}
            <RandomSideSections />

            {/* NEW STRONG ANIMATIONS */}
            <section className="py-32 space-y-32 ">
                {/* FLY TITLES SECTION */}
                <FlyShowcase />

                {/* Holographic Cards */}
                <NeonFullSection />

            </section>
            <NeonFullPagePulse />
        </main>
    );
}


