"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const devs = [
    "osama Al-Shoubi",
    "Hashem Wannous",
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

export default function DevelopersShowcase(): JSX.Element {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const progressRef = useRef<HTMLDivElement | null>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);

    // register plugin client-side only and safely
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (!(ScrollTrigger as any).isRegistered) {
            gsap.registerPlugin(ScrollTrigger);
            // mark to avoid duplicate registration attempts
            (ScrollTrigger as any).isRegistered = true;
        }
        // Refresh ScrollTrigger after layout
        ScrollTrigger.refresh();

    }, []);

    // progress bar
    useEffect(() => {
        const progress = progressRef.current;
        if (!progress) return;

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progress.style.width = `${Math.min(Math.max(pct, 0), 100)}%`;
        };

        // initial set + listeners
        updateProgress();
        window.addEventListener("scroll", updateProgress);
        window.addEventListener("resize", updateProgress);
        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
        
    }, []);

    // particles background (create once)
    useEffect(() => {
        const container = rootRef.current;
        if (!container) return;

        // ensure previous cleaned
        particlesRef.current.forEach((p) => p.remove());
        particlesRef.current = [];

        const count = 55;
        const created: HTMLDivElement[] = [];
        for (let i = 0; i < count; i++) {
            const p = document.createElement("div");
            p.className = "absolute rounded-full bg-green-400 opacity-30 pointer-events-none";
            const size = Math.random() * 4 + 2;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.top = `${Math.random() * 100}%`;
            p.style.left = `${Math.random() * 100}%`;
            p.style.transform = `translate3d(0,0,0)`;
            container.appendChild(p);
            created.push(p);
        }
        particlesRef.current = created;

        // animate using gsap (safe even if called multiple times)
        const tween = gsap.to(created, {
            y: "random(-18,18)",
            x: "random(-18,18)",
            repeat: -1,
            yoyo: true,
            duration: 3.6,
            ease: "sine.inOut",
            stagger: { each: 0.05 },
        });

        return () => {
            tween.kill();
            created.forEach((p) => p.remove());
            particlesRef.current = [];
        };
    }, []);

    // wave-title letters split + animations (safe)
    useEffect(() => {
        const headings: HTMLElement[] = gsap.utils.toArray(".wave-title");
        headings.forEach((h) => {
            try {
                const text = h.textContent || "";
                if (!text.trim()) return;
                // avoid double-splitting
                if (h.querySelector("span")) return;
                const html = text.split("").map((c) => `<span class="inline-block">${c}</span>`).join("");
                h.innerHTML = html;
                const spans = h.querySelectorAll("span");
                gsap.fromTo(
                    spans,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.04,
                        duration: 0.72,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: h,
                            start: "top 85%",
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            } catch (err) {
                // swallow and continue; prevents crash if DOM unexpected
                // console.warn("wave-title split error", err);
            }
        });
    }, []);

    // cards animation + hover effects
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
                boxShadow: "0 0 25px #00c8ff, 0 0 50px #00c8ff",
                repeat: -1,
                yoyo: true,
                duration: 1.6,
                ease: "sine.inOut",
            });

            const onEnter = () => {
                gsap.to(card, {
                    boxShadow: "0 0 60px #00c8ff, 0 0 110px #00ff66",
                    duration: 0.28,
                });
                if (title)
                    gsap.to(title, {
                        color: "#00c8ff",
                        textShadow: "0 0 20px #00c8ff",
                        duration: 0.28,
                    });
            };
            const onLeave = () => {
                gsap.to(card, {
                    boxShadow: "0 0 25px #00c8ff, 0 0 50px #00ff66",
                    duration: 0.4,
                });
                if (title)
                    gsap.to(title, {
                        color: "#00ff66",
                        textShadow: "none",
                        duration: 0.3,
                    });
            };

            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mouseleave", onLeave);

            // cleanup on unmount
            (card as any).__cleanupDevCard = () => {
                card.removeEventListener("mouseenter", onEnter);
                card.removeEventListener("mouseleave", onLeave);
            };

            if (roleBox) {
                const rEnter = () =>
                    gsap.to(roleBox, { scale: 1.06, boxShadow: "0 0 30px #00c8ff", duration: 0.28 });
                const rLeave = () =>
                    gsap.to(roleBox, { scale: 1, boxShadow: "0 0 15px #00c8ff", duration: 0.35 });
                roleBox.addEventListener("mouseenter", rEnter);
                roleBox.addEventListener("mouseleave", rLeave);
                (roleBox as any).__cleanup = () => {
                    roleBox.removeEventListener("mouseenter", rEnter);
                    roleBox.removeEventListener("mouseleave", rLeave);
                };
            }
        });

        return () => {
            // cleanup listeners
            cards.forEach((c: any) => {
                if (typeof c.__cleanupDevCard === "function") c.__cleanupDevCard();
                const roleBox = c.querySelector?.(".role-box");
                if (roleBox && typeof (roleBox as any).__cleanup === "function") (roleBox as any).__cleanup();
            });
        };
    }, []);

    // important: refresh ScrollTrigger after small delay and on resize
    useEffect(() => {
        const refreshLater = () => {
            // two frames to ensure layout settled
            requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
        };

        const onResize = () => {
            refreshLater();
        };

        // initial delayed refresh
        const t = setTimeout(() => {
            refreshLater();
        }, 300);

        window.addEventListener("resize", onResize);
        return () => {
            clearTimeout(t);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <div ref={rootRef} className="relative w-full min-h-screen bg-black text-white overflow-hidden">
            {/* progress bar */}
            <div ref={progressRef} className="fixed top-0 left-0 h-1 bg-green-400 z-50 w-0" />

            {/* hero */}
            <section className="relative flex flex-col items-center justify-center h-[70vh] md:h-screen text-center px-6">
                <h1 className="wave-title text-5xl md:text-7xl font-extrabold mb-6 text-green-400">Our Team</h1>
                <p className="text-gray-300 max-w-2xl text-lg">
                    The creative minds shaping every project — scroll down to discover the team.
                </p>
            </section>

            {/* cards */}
            <section className="py-20 px-8 md:px-24 grid grid-cols-1 sm:grid-cols-2 gap-14">
                {devs.map((dev, i) => (
                    <div
                        key={i}
                        className="dev-card bg-neutral-900 p-8 rounded-3xl border border-neutral-800 cursor-pointer relative overflow-hidden"
                    >
                        <h3 className="text-2xl md:text-3xl font-semibold mb-2">{dev}</h3>
                        <p className="text-gray-400 text-sm md:text-base">Full-Stack Developer — building high-performance, scalable digital experiences.</p>

                        <div className="role-box mt-6 w-full min-h-24 bg-neutral-800 rounded-2xl flex items-center justify-center text-[#16a2c9] font-bold text-lg text-center p-4">
                            {roles[i % roles.length]}
                        </div>
                    </div>
                ))}
            </section>

            <footer className="py-12 text-center text-gray-500">{new Date().getFullYear()} ChaoTechX — Team Showcase</footer>
        </div>
    );
}
