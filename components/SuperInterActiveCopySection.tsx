"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, useMotionValue, useTransform } from "framer-motion";



const PHONE = "+963 984 193 778";
const EMAIL = "osamatech94@gmail.com";

export default function SuperInteractiveCopySection(): JSX.Element  {
    const containerRef = useRef<HTMLDivElement>(null);
    const phoneBtnRef = useRef<HTMLButtonElement | null>(null);
    const emailBtnRef = useRef<HTMLButtonElement | null>(null);
    const phoneToastRef = useRef<HTMLDivElement | null>(null);
    const emailToastRef = useRef<HTMLDivElement | null>(null);

    const [copiedPhone, setCopiedPhone] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);

    // init gsap timelines + cleanup container arrays
    useEffect(() => {
        const btns = [phoneBtnRef.current, emailBtnRef.current].filter(Boolean) as HTMLButtonElement[];

        // Magnetic hover: follow the mouse within the button (small transform)
        const handleMove = (e: MouseEvent) => {
            btns.forEach((btn) => {
                const rect = btn.getBoundingClientRect();
                const relX = e.clientX - rect.left - rect.width / 2;
                const relY = e.clientY - rect.top - rect.height / 2;
                // apply small transform
                gsap.to(btn, {
                    x: relX * 0.12,
                    y: relY * 0.08,
                    scale: 1.02,
                    duration: 0.35,
                    ease: "power3.out",
                });
            });
        };

        const handleLeave = () => {
            btns.forEach((btn) =>
                gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "elastic.out(1,0.6)" })
            );
        };


        const enableGlobalMove = () => window.addEventListener("mousemove", handleMove);
        const disableGlobalMove = () => {
            window.removeEventListener("mousemove", handleMove);
            handleLeave();
        };

        // add enter/leave on each button to enable/disable the magnetic behavior
        btns.forEach((btn) => {
            const onEnter = () => enableGlobalMove();
            const onExit = () => disableGlobalMove();
            btn.addEventListener("mouseenter", onEnter);
            btn.addEventListener("mouseleave", onExit);

            // cleanup closure
            (btn as any).__onEnter = onEnter;
            (btn as any).__onExit = onExit;
        });

        return () => {
            disableGlobalMove();
            btns.forEach((btn) => {
                const onEnter = (btn as any).__onEnter;
                const onExit = (btn as any).__onExit;
                if (onEnter) btn.removeEventListener("mouseenter", onEnter);
                if (onExit) btn.removeEventListener("mouseleave", onExit);
            });
        };
    }, []);

    // copy logic + toast animation + ripple and particles creation
    const copyAndToast = (text: string, type: "phone" | "email") => {
        // copy
        try {
            void navigator.clipboard.writeText(text);
        } catch {
            // fallback
            const ta = document.createElement("textarea");
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand("copy");
            ta.remove();
        }

        // show toast + animate
        if (type === "phone") {
            setCopiedPhone(true);
            const toast = phoneToastRef.current;
            if (toast) {
                gsap.fromTo(toast, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" });
            }
            setTimeout(() => setCopiedPhone(false), 1700);
        } else {
            setCopiedEmail(true);
            const toast = emailToastRef.current;
            if (toast) {
                gsap.fromTo(toast, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power3.out" });
            }
            setTimeout(() => setCopiedEmail(false), 1700);
        }
    };

    // ripple wave on click
    const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const circle = document.createElement("span");
        const size = Math.max(rect.width, rect.height) * 1.6;
        circle.style.width = circle.style.height = `${size}px`;
        circle.style.left = `${e.clientX - rect.left - size / 2}px`;
        circle.style.top = `${e.clientY - rect.top - size / 2}px`;
        circle.className = "ripple absolute rounded-full bg-white/20 pointer-events-none opacity-60";
        btn.appendChild(circle);

        gsap.fromTo(
            circle,
            { scale: 0, opacity: 0.6 },
            {
                scale: 1,
                opacity: 0,
                duration: 0.9,
                ease: "power2.out",
                onComplete: () => circle.remove(),
            }
        );
    };

    // particle sparks on hover: spawn few particles near cursor position within button
    const spawnSparks = (btn: HTMLButtonElement, clientX: number, clientY: number) => {
        const parent = btn;
        for (let i = 0; i < 6; i++) {
            const p = document.createElement("div");
            p.className = "spark absolute w-2 h-2 rounded-full bg-[#7effb2] opacity-90 pointer-events-none blur-sm";
            parent.appendChild(p);
            // position at cursor relative to button
            const rect = parent.getBoundingClientRect();
            p.style.left = `${clientX - rect.left}px`;
            p.style.top = `${clientY - rect.top}px`;

            const angle = Math.random() * Math.PI * 2;
            const dist = 30 + Math.random() * 40;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist;
            gsap.to(p, {
                x: dx,
                y: dy,
                opacity: 0,
                scale: 0.4 + Math.random() * 0.8,
                duration: 0.9 + Math.random() * 0.6,
                ease: "power2.out",
                onComplete: () => p.remove(),
            });
        }
    };

    // neon scanline creation: a single element inside button that translates across
    const triggerScanline = (btn: HTMLButtonElement) => {
        const scan = btn.querySelector<HTMLElement>(".scanline");
        if (!scan) return;
        // animate scanline across the button
        gsap.fromTo(
            scan,
            { xPercent: -120, opacity: 0 },
            { xPercent: 120, opacity: 0.85, duration: 0.9, ease: "power2.out" }
        );
    };

    // liquid distortion via SVG filter: we toggle a small animate value on mousemove
    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const forBtns = [phoneBtnRef.current, emailBtnRef.current].filter(Boolean) as HTMLButtonElement[];
            forBtns.forEach((btn) => {
                const rect = btn.getBoundingClientRect();
                if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    // set SVG feTurbulence baseFrequency via CSS var on button
                    const relX = (e.clientX - rect.left) / rect.width;
                    (btn.style as any).setProperty("--noiseX", `${0.02 + relX * 0.02}`);
                    // scanline trigger
                    const scan = btn.querySelector<HTMLElement>(".scanline");
                    if (scan) scan.style.opacity = "0.2";
                }
            });
        };

        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    // attach per-button mouse handlers (sparks, scanline)
    useEffect(() => {
        const phoneBtn = phoneBtnRef.current;
        const emailBtn = emailBtnRef.current;
        if (!phoneBtn || !emailBtn) return;

        const phoneMove = (e: MouseEvent) => {
            spawnSparks(phoneBtn, e.clientX, e.clientY);
            // subtle scanline trigger occasionally
            if (Math.random() > 0.92) triggerScanline(phoneBtn);
        };
        const emailMove = (e: MouseEvent) => {
            spawnSparks(emailBtn, e.clientX, e.clientY);
            if (Math.random() > 0.92) triggerScanline(emailBtn);
        };

        phoneBtn.addEventListener("mousemove", phoneMove);
        emailBtn.addEventListener("mousemove", emailMove);

        return () => {
            phoneBtn.removeEventListener("mousemove", phoneMove);
            emailBtn.removeEventListener("mousemove", emailMove);
        };
    }, []);



    // Motion values for mouse parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const offsetX = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
    const offsetY = useTransform(mouseY, [0, window.innerHeight], [-15, 15]);

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, [mouseX, mouseY]);


    return (
        <section ref={containerRef} className="w-full py-20 flex flex-col items-center gap-8 bg-[#021007]">
            {/* SVG filters for liquid distortion (applied via filter="url(#liquid)") */}
            <svg className="w-0 h-0 absolute pointer-events-none">
                <filter id="liquid">
                    <feTurbulence id="turb" baseFrequency="0.02" numOctaves="2" stitchTiles="stitch" />
                    <feDisplacementMap in="SourceGraphic" scale="6" />
                </filter>
            </svg>

            <motion.div
                className="split-left flex flex-col justify-center"
                style={{ x: offsetX, y: offsetY }}
                initial={{ x: -300, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            >
                <motion.h2
                    className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-cyan-400"
                    whileHover={{ scale: 1.05, textShadow: "0 0 15px #0ff, 0 0 30px #0ff" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    Fast communication • Copy
                </motion.h2>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 items-center">

                {/* PHONE */}
                <div className="relative flex flex-col items-center">
                    {/* toast */}
                    <div
                        ref={phoneToastRef}
                        className="absolute -top-12 pointer-events-none"
                        aria-hidden={!copiedPhone}
                    >
                        {copiedPhone && (
                            <div className="bg-green-500/90 text-white px-4 py-1 rounded-lg shadow-lg">Number copied ✔ </div>
                        )}
                    </div>

                    <button
                        ref={phoneBtnRef}
                        onClick={(e) => {
                            createRipple(e);
                            copyAndToast(PHONE, "phone");
                        }}
                        className="relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-black bg-gradient-to-br from-green-300 to-green-600 shadow-[0_0_20px_rgba(0,255,140,0.14)] hover:from-red-500 hover:to-green-500 hover:shadow-[0_0_35px_#00ff84] duration-200 border border-green-200"
                        style={{
                            filter: "url(#liquid)",
                            // variable used by liquid distortion on mousemove
                            // @ts-ignore
                            ["--noiseX"]: "0.02",
                        }}
                        aria-label="Copy phone number"
                        onMouseDown={() => triggerScanline(phoneBtnRef.current!)}
                    >
                        {/* glow pulse (CSS via pseudo) */}
                        <span className="absolute inset-0 rounded-2xl pointer-events-none z-0 opac-80 pulse-glow" />

                        {/* neon scanline */}
                        <span className="scanline absolute left-0 top-0 bottom-0 w-2 bg-white/70 mix-blend-screen opacity-0 z-10 transform -translate-x-1/2" />

                        {/* button content */}
                        <span className="relative z-20 flex items-center gap-3 ">
                            <svg width="18" height="18" viewBox="0 0 24 24" className="text-white" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 7v10a2 2 0 0 0 2 2h10" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="7" y="3" width="14" height="14" rx="2" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Copy Number
                        </span>
                    </button>

                    {/* <div className="mt-3 text-green-200 select-all text-sm">{PHONE}</div> */}
                </div>

                {/* EMAIL */}
                <div className="relative flex flex-col items-center">
                    {/* toast */}
                    <div
                        ref={emailToastRef}
                        className="absolute -top-12 pointer-events-none"
                        aria-hidden={!copiedEmail}
                    >
                        {copiedEmail && (
                            <div className="bg-green-500/90 text-white px-4 py-1 rounded-lg shadow-lg">Email copied ✔</div>
                        )}
                    </div>

                    <button
                        ref={emailBtnRef}
                        onClick={(e) => {
                            createRipple(e);
                            copyAndToast(EMAIL, "email");
                        }}
                        className="relative overflow-hidden px-8 py-4 rounded-2xl font-semibold text-black bg-gradient-to-br from-green-300 to-green-600 shadow-[0_0_20px_rgba(0,255,140,0.14)] hover:shadow-[0_0_35px_#00ff84] duration-200 hover:from-red-500 hover:to-green-500  border border-green-200"
                        style={{
                            filter: "url(#liquid)",
                            // @ts-ignore
                            ["--noiseX"]: "0.02",
                        }}
                        aria-label="Copy email"
                        onMouseDown={() => triggerScanline(emailBtnRef.current!)}
                    >
                        <span className="absolute inset-0 rounded-2xl pointer-events-none z-0 opac-80 pulse-glow" />
                        <span className="scanline absolute left-0 top-0 bottom-0 w-2 bg-white/70 mix-blend-screen opacity-0 z-10 transform -translate-x-1/2" />

                        <span className="relative z-20 flex items-center gap-3">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 8.5l9 6 9-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="3" y="4.5" width="18" height="15" rx="2" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Copy Email
                        </span>
                    </button>

                </div>
            </div>

            <style jsx>{`
        .pulse-glow {
          box-shadow: 0 0 30px rgba(0, 255, 140, 0.12), inset 0 0 12px rgba(0,255,140,0.06);
          animation: pulse 2.6s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.02); opacity: 0.9; }
          100% { transform: scale(1); opacity: 1; }
        }
        .ripple {
          will-change: transform, opacity;
          pointer-events: none;
        }
        /* small styling for scanline */
        .scanline {
          width: 2px;
          background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.3));
          filter: blur(6px);
        }
        /* spark style handled by JS class 'spark' */
      `}</style>
        </section>
    );
}
