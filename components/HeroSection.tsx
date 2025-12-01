"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ContactButton from "./ContactButton";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useTransform(mouseY, [0, 1], [12, -12]);
    const rotateY = useTransform(mouseX, [0, 1], [-18, 18]);
    const scale = useTransform(mouseX, [0, 1], [1, 1.08]);

    // State for showing info box
    const [showInfo, setShowInfo] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const mx = (e.clientX - rect.left) / rect.width;
        const my = (e.clientY - rect.top) / rect.height;

        mouseX.set(mx);
        mouseY.set(my);
    };

    const stars = Array.from({ length: 30 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 2,
    }));


    const clickSound = typeof Audio !== "undefined" ? new Audio("/click.mp3") : null;



    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pt-10 relative overflow-hidden bg-black"
        >
            {/* PARTICLES */}
            <motion.div className="absolute inset-0 pointer-events-none">
                {[...Array(35)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full shadow-lg"
                        initial={{ x: Math.random() * 800 - 400, y: Math.random() * 800 - 400, scale: 0 }}
                        animate={{ x: Math.random() * 800 - 400, y: Math.random() * 800 - 400, scale: [0, 1, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.15 }}
                    />
                ))}
            </motion.div>

            {/* STARS */}
            <motion.div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-white opacity-30 shadow-xl"
                        initial={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, scale: 0 }}
                        animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.5, 1, 0.5] }}
                        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: i * 0.1 }}
                    />
                ))}
            </motion.div>


            {/* IMAGE + FX */}
            <motion.div
                className="relative flex items-center justify-center w-full md:w-1/2 z-10"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
            >

                <motion.div
                    className="absolute inset-0 rounded-2xl blur-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20 rounded-2xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    whileHover={{ rotateY: 15, rotateX: -10, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 150, damping: 10 }}
                    className="relative z-10 cursor-pointer"
                    onClick={() => {
                        if (clickSound) {
                            clickSound.currentTime = 0;
                            clickSound.play();
                        }
                        setShowInfo(true);
                    }}

                >
                    <Image src="/logo.png" alt="Logo" width={420} height={200} className="rounded-2xl shadow-xl" priority />
                </motion.div>
            </motion.div>


            {/* TEXT SECTION */}
            <motion.div
                className="w-full md:w-1/2 mt-10 md:mt-0 z-20 relative"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2 }}
            >
                <motion.h1
                    style={{ rotateX, rotateY, scale, transformPerspective: 800, transformStyle: "preserve-3d" }}
                    className="text-3xl md:text-6xl font-extrabold leading-tight tracking-tight text-white hover:cursor-pointer transition-transform duration-300"
                >
                    {"Hello from there, we are not a company".split("").map((l, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{
                                y: [-2, 2, 0],
                                textShadow: [
                                    "0 0 5px #fff,0 0 10px #ff00ff,0 0 20px #ff00ff,0 0 60px #ff00ff",
                                    "0 0 10px #fff,0 0 20px #00ffff,0 0 30px #ff00ff,0 0 70px #00ffff",
                                    "0 0 5px #fff,0 0 10px #ff00ff,0 0 20px #ff00ff,0 0 60px #ff00ff",
                                ],
                                transition: { duration: 0.8, repeat: Infinity },
                            }}
                            transition={{ delay: i * 0.03 }}
                        >
                            {l}
                        </motion.span>
                    ))}
                    {" but a team built".split("").map((l, i) => (
                        <motion.span
                            key={"b" + i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{
                                y: [-2, 2, 0],
                                textShadow: [
                                    "0 0 5px #fff,0 0 10px #ff00ff,0 0 20px #ff00ff,0 0 60px #ff00ff",
                                    "0 0 10px #fff,0 0 20px #00ffff,0 0 30px #ff00ff,0 0 70px #00ffff",
                                    "0 0 5px #fff,0 0 10px #ff00ff,0 0 20px #ff00ff,0 0 60px #ff00ff",
                                ],
                                transition: { duration: 0.8, repeat: Infinity },
                            }}
                            transition={{ delay: i * 0.03 }}
                        >
                            {l}
                        </motion.span>
                    ))}
                    {" on love and respect".split("").map((l, i) => (
                        <motion.span
                            key={"c" + i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{
                                y: [-2, 2, 0],
                                textShadow: [
                                    "0 0 5px #fff,0 0 10px #ff00ff,0 0 20px #ff00ff,0 0 60px #ff00ff",
                                    "0 0 10px #fff,0 0 20px #00ffff,0 0 30px #ff00ff,0 0 70px #00ffff",
                                    "0 0 5px #fff,0 0 10px #ff00ff,0 0 20px #ff00ff,0 0 60px #ff00ff",
                                ],
                                transition: { duration: 0.8, repeat: Infinity },
                            }}
                            transition={{ delay: i * 0.03 }}
                        >
                            {l}
                        </motion.span>
                    ))}
                </motion.h1>
                <ContactButton />
            </motion.div>

            {/* INFO OVERLAY */}
            {showInfo && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowInfo(false)}
                >
                    <motion.div
                        className="bg-neutral-900 rounded-xl p-8 max-w-lg text-white relative cursor-auto overflow-hidden"
                        animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: [
                                "0 0 40px #a78bfa, 0 0 70px #c084fc, 0 0 120px #a78bfa",
                                "0 0 55px #c084fc, 0 0 100px #a78bfa, 0 0 150px #c084fc",
                                "0 0 40px #a78bfa, 0 0 70px #c084fc, 0 0 120px #a78bfa",
                            ],
                        }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* ⭐ STARS INSIDE BOX */}
                        {Array.from({ length: 40 }).map((_, i) => (
                            <motion.span
                                key={i}
                                className="absolute rounded-full bg-purple-300"
                                style={{
                                    width: Math.random() * 3 + 1,
                                    height: Math.random() * 3 + 1,
                                    top: Math.random() * 100 + "%",
                                    left: Math.random() * 100 + "%",
                                    opacity: 0.4,
                                    zIndex: 1,
                                }}
                                animate={{
                                    opacity: [0.2, 1, 0.2],
                                    scale: [0.5, 1.3, 0.5],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}

                        {/* TITLE */}
                        <motion.h2
                            className="text-2xl font-bold text-purple-300 mb-4 relative z-20"
                            whileHover={{
                                scale: 1.05,
                                textShadow: [
                                    "0 0 8px #c084fc",
                                    "0 0 15px #d8b4fe",
                                    "0 0 25px #c084fc",
                                ],
                            }}
                        >
                            Our Team Philosophy
                        </motion.h2>

                        {/* PARAGRAPH */}
                        <motion.p
                            className="relative z-20 text-purple-200 leading-relaxed"
                            whileHover={{
                                scale: 1.02,
                                textShadow: [
                                    "0 0 5px #a78bfa",
                                    "0 0 12px #c084fc",
                                    "0 0 20px #d8b4fe",
                                ],
                            }}
                        >
                            "Welcome to ChaoTechX — step into a realm where creativity becomes the guiding force.
                            Dive into our universe, where imagination is sculpted into reality and every dream is
                            brought to life with precision, passion, and innovation."
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}

        </section>
    );
}






// {
//     stars.map((s, i) => (
//         <motion.span
//             key={i}
//             className="absolute bg-purple-400 rounded-full"
//             style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
//             animate={{ y: ["0%", "20%", "0%"], opacity: [0.3, 1, 0.3] }}
//             transition={{ repeat: Infinity, duration: 3, delay: s.delay, ease: "easeInOut" }}
//         />
//     ))
// }


// const stars = Array.from({ length: 30 }).map(() => ({
//     top: Math.random() * 100,
//     left: Math.random() * 100,
//     size: Math.random() * 2 + 1,
//     delay: Math.random() * 2,
// }));







// Transform values (SSR-safe)
// const rotateX = useMotionValue(0);
// const rotateY = useMotionValue(0);
// const scale = useMotionValue(1);
