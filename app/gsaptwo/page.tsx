"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



const devs = [
    "osama Al-Shoubi",
    "Hashim Wannous",
    "Muwafaq maradni",
    "Alaa Tarabishe",
    "Mouhammed Anas Sroujy",
    "Batoul Kazak",
    "Mais Alian",
    "Mouhammed Anas Darwish",
    "Maher Al-Ghazawi",
    "Ru'a Abu Zaid",
];

const roles = [
    "Full-Stack Developer with over 5 years of experience building modern web applications using React.js, Next.js, Node.js, Express, and MongoDB. Skilled in UI/UX design, RESTful API development, and Telegram bot automation, with additional expertise in 2D and 3D game development using C++ on Unreal Engine. Strong focus on performance optimization, scalability, and user-centered design, consistently delivering impactful solutions.",
    "dedicated Software Engineer specializing in Front-End Development with two years of experience creating scalable, responsive web applications using React.js and Next.js. Proficient in TypeScript, Material-UI, and clean UI design, with solid Back-End development skills. Committed to continuous learning and driven to make a significant impact in the tech industry.",
    "passionate Software Engineer specializing in cross-platform mobile development using Flutter, with proven experience building performant and user-friendly Android and iOS applications. Focused on clean architecture and responsive design, eager to contribute to innovative teams and deliver high-quality mobile solutions.",
    "Experienced back-end developer specializing in Node.js and its frameworks. I excel at transforming ideas into real-world projects, Solid base in CS fundamentals and problem-solving skill. Creativity and collaboration are among my key strengths.",
    "Backend Developer with nearly 3 years of experience building and developing backend systems for websites and applications using PHP Laravel. Specializes in database analysis, creating highly efficient systems, and designing robust APIs to ensure seamless website functionality. Experienced in freelance projects, committed to continuous skill enhancement, staying updated with the latest web development advancements, and excelling at teamwork and problem-solving.",
    "motivated software developer with a growing interest in Machine Learning and a solid foundation in Web Development, specializing in frontend development. Experienced in building responsive, user-friendly web applications using React, TypeScript, Next.js, and TailwindCSS. Proficient in C++, C#, and Python, with strong mathematical skills and a solid understanding of core computer science concepts, along with hands-on experience in Linux systems and networking fundamentals.",
    "AI Innovation Specialist with hands-on experience creating AI-powered learning experiences, delivering programming courses, and mentoring student communities. Skilled in developing both academic and real-world projects, producing SEO-friendly content, and leveraging AI tools for innovative solutions such as avatars, videos, and digital branding. Passionate about continuous learning, emerging AI technologies, and helping others achieve success through technology-driven solutions.",
    "results-driven Backend Developer specializing in designing, developing, and deploying robust, scalable web applications using PHP and the Laravel framework. Experienced in engineering complex systems such as Accounting, Project Management, CRM, and Logistics, with a strong focus on performance optimization. Solid foundation in SOLID principles, API development, database management (MySQL), and algorithmic problem-solving, with notable achievements on platforms like Codeforces (260+ solved) and LeetCode (50+ solved).",
    "AI Product Manager and CTO with a strong foundation in AI systems architecture, automation, and educational technology. Experienced in leading product development from ideation to MVP, bridging technical innovation with business strategy. Skilled in LLM-based systems, product roadmapping, and cross-functional leadership to deliver scalable, user-centric AI solutions.",
    "I contribute to branding, user interface, and user experience projects for digital platforms, designing logos and brand identities tailored to client needs. I create company profiles and business cards, collaborate with developers to build user interfaces, and support UI/UX projects through landing pages and comprehensive user experience design.",
];

export default function DevelopersShowcase() {

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }
    }, []);
    
    const rootRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);


    // ---------------- Scroll Progress ----------------
    useEffect(() => {
        const progress = progressRef.current;
        if (!progress) return;

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const progressPct = (scrollTop / docHeight) * 100;
            progress.style.width = `${progressPct}%`;
        };

        window.addEventListener("scroll", updateProgress);
        return () => window.removeEventListener("scroll", updateProgress);
    }, []);

    // ---------------- Neon Background ----------------
    useEffect(() => {
        const container = rootRef.current;
        if (!container) return;

        const particles: HTMLDivElement[] = [];

        for (let i = 0; i < 60; i++) {
            const p = document.createElement("div");
            p.className =
                "absolute rounded-full bg-green-400 opacity-30 pointer-events-none";
            p.style.width = `${Math.random() * 4 + 2}px`;
            p.style.height = p.style.width;
            p.style.top = `${Math.random() * 100}%`;
            p.style.left = `${Math.random() * 100}%`;

            container.appendChild(p);
            particles.push(p);
        }

        gsap.to(particles, {
            y: "random(-20,20)",
            x: "random(-20,20)",
            repeat: -1,
            yoyo: true,
            duration: 4,
            ease: "sine.inOut",
            stagger: { each: 0.05 },
        });

        return () => particles.forEach((p) => p.remove());
    }, []);

    // ---------------- Wave Text Animation ----------------
    useEffect(() => {
        const headings = gsap.utils.toArray<HTMLElement>(".wave-title");

        headings.forEach((h) => {
            if (!h) return;

            const chars = h.innerText
                .split("")
                .map((c) => `<span class='inline-block'>${c}</span>`)
                .join("");

            h.innerHTML = chars;

            const spans = h.querySelectorAll("span");

            gsap.fromTo(
                spans,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: h,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );
        });
    }, []);

    // ---------------- Cards Anim ----------------
    useEffect(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".dev-card");

        cards.forEach((card) => {
            const title = card.querySelector("h3") as HTMLElement | null;
            const roleBox = card.querySelector(".role-box") as HTMLElement | null;

            gsap.fromTo(
                card,
                { y: 80, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse",
                    },
                }
            );

            gsap.to(card, {
                boxShadow:
                    "0 0 25px #00c8ff, 0 0 50px #00c8ff, 0 0 80px #00c8ff",
                duration: 1.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                    boxShadow:
                        "0 0 60px #00c8ff, 0 0 110px #00ff66, 0 0 150px #00ffaa",
                    duration: 0.3,
                });

                if (title)
                    gsap.to(title, {
                        color: "#00c8ff",
                        textShadow:
                            "0 0 20px #00c8ff, 0 0 40px #00ff66, 0 0 60px #00ffaa",
                        duration: 0.3,
                    });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    boxShadow:
                        "0 0 25px #00c8ff   , 0 0 50px #00ff66, 0 0 80px #00ffaa",
                    duration: 0.5,
                });

                if (title)
                    gsap.to(title, {
                        color: "#00ff66",
                        textShadow: "00c8ff",
                        duration: 0.3,
                    });
            });

            if (roleBox) {
                roleBox.addEventListener("mouseenter", () => {
                    gsap.to(roleBox, {
                        scale: 1.06,
                        boxShadow:
                            "0 0 20px #00c8ff , 0 0 40px #00c8ff , 0 0 60px #00c8ff",
                        duration: 0.3,
                    });
                });

                roleBox.addEventListener("mouseleave", () => {
                    gsap.to(roleBox, {
                        scale: 1,
                        boxShadow:
                            "0 0 10px #00c8ff , 0 0 20px #00eaff , 0 0 30px #00ffaa",
                        duration: 0.4,
                    });
                });
            }
        });
    }, []);

    return (
        <div
            ref={rootRef}
            className="relative w-full min-h-screen bg-black text-white overflow-hidden"
        >
            {/* Scroll Progress */}
            <div
                className="fixed top-0 left-0 h-1 bg-green-400 z-50 w-0"
                ref={progressRef}
            />

            {/* Hero */}
            <section className="relative flex flex-col items-center justify-center h-[70vh] sm:h-[80vh] md:h-screen px-4 sm:px-6 md:px-16 overflow-hidden text-center">
                <h1 className="wave-title text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 text-green-400">
                    Our Team
                </h1>

                <p className="text-gray-300 max-w-lg sm:max-w-xl md:max-w-2xl px-2 sm:px-0 text-sm sm:text-base md:text-lg">
                    The creative minds shaping every project — scroll down to discover the team.
                </p>
            </section>

            {/* Cards */}
            <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-16 lg:px-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 md:gap-14">
                {devs.map((dev, i) => (
                    <div
                        key={i}
                        className="dev-card bg-neutral-900 p-6 sm:p-7 md:p-8 rounded-3xl 
    border border-neutral-800 cursor-pointer relative transition-all 
    duration-300 overflow-hidden"
                    >

                        <h3 className="break-words break-normal
 text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-wrap-balance
">
                            {dev}
                        </h3>

                        <p className="break-words break-normal
 text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base text-wrap-balance
">
                            Full-Stack Developer — building high-performance, scalable digital experiences.
                        </p>

                        <div className="role-box mt-6 w-full 
    min-h-20 sm:min-h-24 md:min-h-28 h-auto
    bg-neutral-800 rounded-2xl 
    flex items-center justify-center 
    text-[#16a2c9] hover:text-[#00c8ff]
    font-bold text-base sm:text-lg md:text-xl 
    transition-all duration-300 
    text-wrap-balance py-4 px-3
">
                            <span className="role-text break-words break-normal text-wrap-balance
        hover:shadow-[0_0_40px_#00c8ff] hover:rounded-xl 
        transition-all duration-300 
        text-center">
                                {roles[i % roles.length]}
                            </span>
                        </div>


                    </div>
                ))}
            </section>

            <footer className="py-10 sm:py-12 text-center text-gray-500 text-sm sm:text-base">
                {new Date().getFullYear()} ChaoTechX — Team Showcase
            </footer>
        </div>
    );
}
