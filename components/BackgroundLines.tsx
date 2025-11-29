"use client";

import { motion } from "framer-motion";

const linesCount = 20;

const BackgroundLines = () => {
    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {Array.from({ length: linesCount }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-30 rounded-full"
                    style={{
                        width: "200%",
                        top: `${Math.random() * 100}%`,
                        left: "-100%",
                        transform: `rotate(${Math.random() * 45 - 22.5}deg)`,
                    }}
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 20 + Math.random() * 10,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

export default BackgroundLines;
