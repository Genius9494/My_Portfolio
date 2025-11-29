"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Spark {
    top: number;
    left: number;
}

const SDLCSections = () => {
    const stages = [
        { title: "Plan", description: "We map out the full-stack roadmap, define requirements, and set clear goals." },
        { title: "Analyze", description: "We dissect the client’s needs, design scalable architectures, and choose the best tech stack." },
        { title: "Design", description: "We craft UI/UX with neon-bright visuals, wireframes, and prototypes that wow users." },
        { title: "Develop", description: "We build robust front-end and back-end systems with clean, scalable code." },
        { title: "Test", description: "We run thorough QA, debug relentlessly, and ensure flawless performance." },
        { title: "Deploy", description: "We launch smoothly, monitor servers, and optimize for speed and security." },
        { title: "Maintain", description: "We update continuously, fix bugs fast, and scale features as your business grows." },
    ];

    const [sparks, setSparks] = useState<Spark[][]>([]);

    useEffect(() => {
        const newSparks = stages.map(() =>
            Array.from({ length: 5 }).map(() => ({
                top: Math.random() * 100,
                left: Math.random() * 100,
            }))
        );
        setSparks(newSparks);
    }, []);

    return (
        <>
            {stages.map((stage, index) => (
                <section key={index} className="p-24 text-center relative">
                    {/* Neon Title */}
                    <motion.h2
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-widest text-cyan-400 relative inline-block"
                        animate={{
                            textShadow: [
                                "0 0 5px #0ff,0 0 10px #0ff,0 0 20px #0ff,0 0 30px #0ff",
                                "0 0 10px #0ff,0 0 20px #0ff,0 0 40px #0ff,0 0 50px #0ff",
                                "0 0 5px #0ff,0 0 10px #0ff,0 0 20px #0ff,0 0 30px #0ff",
                            ],
                        }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        whileHover={{
                            scale: 1.15,
                            textShadow: "0 0 15px #0ff,0 0 30px #0ff,0 0 60px #0ff,0 0 90px #0ff",
                            transition: { type: "spring", stiffness: 300, damping: 20 },
                        }}
                    >
                        ⚡ {stage.title}
                    </motion.h2>


                    {/* Description Text with Fade & Slide-in */}
                    <motion.p
                        className="opacity-70 leading-8 mt-10 text-lg sm:text-xl md:text-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {stage.description}
                    </motion.p>
                </section>
            ))}
        </>
    );
};

export default SDLCSections;
