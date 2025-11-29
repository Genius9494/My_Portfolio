"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function IntroLoader(): JSX.Element | null {
    const [visible, setVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const charRef = useRef<HTMLImageElement | null>(null);
    const swordRef = useRef<HTMLImageElement | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);




    // ---------------------------------------------
    // localStorage
    // ---------------------------------------------
    // useEffect(() => {
    //     const alreadyPlayed = localStorage.getItem("introPlayed");

    //     if (alreadyPlayed === "true") {
    //         setVisible(false); // لا تظهر الانترو
    //         return;
    //     }

    //     // أول زيارة → شغل الانترو
    //     setVisible(true);
    //     localStorage.setItem("introPlayed", "true");
    // }, []);




    // unlock audio once with first user interaction
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
        // initialize audio (path from your upload)

        setVisible(true);
        // إذا الانترو سبق وتشغّل → لا تشغّل الصوت ولا الأنميشن
        // const alreadyPlayed = localStorage.getItem("introPlayed");
        // if (alreadyPlayed === "true") return;


        audioRef.current = new Audio("/entry.mp3");
        audioRef.current.volume = 0.6;

        audioRef.current.play().catch(() => { });


        if (audioRef.current) audioRef.current.volume = 0.6;

        const container = containerRef.current;
        const char = charRef.current;
        const sword = swordRef.current;
        if (!container || !char || !sword) return;

        // timeline: background subtle anim, character pop, sword slide -> impact -> exit
        const tl = gsap.timeline({
            onComplete: () => {
                // hide the intro after a short delay to show the impact
                gsap.to(container, { opacity: 0, scale: 1.08, duration: 0.9, ease: "power2.inOut", onComplete: () => setVisible(false) });
            },
        });

        // fade/float background and subtle zoom
        tl.fromTo(
            container,
            { autoAlpha: 0, scale: 1.06 },
            { autoAlpha: 1, scale: 1, duration: 0.2, ease: "power2.out" },
            0
        );

        // character pop in with tiny bounce
        tl.fromTo(
            char,
            { y: 60, scale: 0.6, autoAlpha: 0, rotation: -4 },
            { y: 0, scale: 1, autoAlpha: 1, rotation: 0, duration: 0.9, delay: 3, ease: "back.out(1.2)" },
            0.25
        );

        // subtle pulse light behind character (we toggle a CSS class to show glow)
        tl.to(
            char,
            { boxShadow: "5px 10px 104px 68px rgba(0,0,0,1)", duration: 0.6, ease: "power1.out" },
            0.6
        );

        // sword enters from left (or right) — slide and rotate
        // start slightly after char appears
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
                    // impact moment: play sound and flash
                    audioRef.current?.currentTime && (audioRef.current.currentTime = 0);
                    audioRef.current?.play();

                    // small hit flash on character
                    gsap.fromTo(char, { filter: "brightness(1)" }, { filter: "brightness(1.6)", duration: 0.08, yoyo: true, repeat: 3, ease: "sine.inOut" });

                    // sword spark / glow pulse
                    gsap.fromTo(sword, { boxShadow: "" }, { boxShadow: "", duration: 0.25, yoyo: true, repeat: 2 });
                },
            },
            0.9
        );

        // small reaction: char recoils slightly then recenter
        tl.to(char, { x: -8, duration: 0.08, ease: "power2.out" }, ">");
        tl.to(char, { x: 0, duration: 0.24, ease: "elastic.out(1,0.6)" });

        // leave sword in place for a moment then retract slightly
        tl.to(sword, { x: 80, rotation: 8, duration: 0.6, ease: "power2.inOut" }, "+=0.18");

        // camera/scene flash and then exit (onComplete hides)
        tl.to(container, { backgroundColor: "rgba(255,255,255,0.02)", duration: 0.18 }, "+=0.18");

        // safety: if user clicks skip, will still hide after timeline
        return () => {
            tl.kill();
        };
    }, []);

    // allow user to skip the intro by clicking
    // const skip = () => {
    //     // immediately hide
    //     setVisible(false);
    // };

    if (!visible) return <></>;

    return (
        <div
            ref={containerRef}
            // onClick={skip}
            className="fixed w-full inset-0 z-[9999] flex items-center justify-center bg-black text-white"
            style={{ WebkitTapHighlightColor: "transparent" }}
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
                </div>
            </div>

            {/* subtle vignette */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.02), rgba(0,0,0,0.7))" }} />
            
        </div>
    );
}
