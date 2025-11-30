"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
    FaGithub,
    FaLinkedin,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaFacebook,
} from "react-icons/fa";

export default function MyInformation() {

    const [windowSize, setWindowSize] = useState({ w: 1200, h: 800 }); // افتراضي

    const [hovered, setHovered] = useState<string | null>(null);

    const socials = [
        { name: "GitHub", icon: <FaGithub />, link: "https://github.com/" },
        { name: "LinkedIn", icon: <FaLinkedin />, link: "https://linkedin.com/" },
        { name: "Instagram", icon: <FaInstagram />, link: "https://instagram.com/" },
        { name: "Twitter", icon: <FaTwitter />, link: "https://twitter.com/" },
        { name: "YouTube", icon: <FaYoutube />, link: "https://youtube.com/" },
        { name: "Facebook", icon: <FaFacebook />, link: "https://facebook.com/" },
    ];



    // Motion values for mouse parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const offsetX = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
    const offsetY = useTransform(mouseY, [0, window.innerHeight], [-15, 15]);

    useEffect(() => {
        if (typeof window === "undefined") return;

        setWindowSize({ w: window.innerWidth, h: window.innerHeight });

        const handleMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, [mouseX, mouseY]);
    return (
        <main className="bg-black">
            <section className="py-24 px-6 md:px-20 text-white relative">
                <motion.div
                    className="split-left flex flex-col items-center justify-center"
                    style={{ x: offsetX, y: offsetY }}
                    initial={{ x: -300, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                >
                    <motion.h2
                        className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-green-400"
                        whileHover={{ scale: 1.05, textShadow: "0 0 15px #0ff, 0 0 30px #0ff" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        Our accounts
                    </motion.h2>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-12">
                    {socials.map((item) => (
                        <div
                            key={item.name}
                            className="relative flex flex-col items-center"
                            onMouseEnter={() => setHovered(item.name)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => window.open(item.link, "_blank")}
                        >
                            {/* Glow Circle */}
                            <motion.div
                                animate={{
                                    boxShadow:
                                        hovered === item.name
                                            ? "0 0 25px #00ffae, 0 0 50px #00ffae70"
                                            : "0 0 0px transparent",
                                }}
                                transition={{ duration: 0.3 }}
                                className="
                w-20 h-20 rounded-full 
                bg-[#0a0f0c] border border-[#00ffae60]
                flex items-center justify-center 
                hover:-translate-y-5
                text-4xl cursor-pointer
                hover:scale-110 
                transition-all duration-200
              "
                            >
                                {item.icon}
                            </motion.div>

                            {/* Floating Icon Name */}
                            <AnimatePresence>
                                {hovered === item.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                        animate={{ opacity: 1, y: -10, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.9 }}
                                        transition={{ duration: 0.25 }}
                                        className="
                                            absolute -top-16
                                            text-lg font-semibold 
                                            text-[#00ffae]
                                            tracking-wide
                                            bg-[#00140a] 
                                            px-3 py-1 rounded-xl  
                                            shadow-[0_0_15px_#00ffae90]
                                        "
                                    >
                                        {item.name}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
