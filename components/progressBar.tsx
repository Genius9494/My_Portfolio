"use client";

import { motion } from "framer-motion";
import {
    FaGithub,
    FaNodeJs,
    FaReact,
    FaHtml5,
    FaCss3Alt,
    FaJsSquare,
} from "react-icons/fa";
import { SiMongodb, SiNextdotjs, SiLaravel } from "react-icons/si";

export default function IndependentIconsMarquee() {
    const iconComponents = [
        <FaGithub className="text-white" />,
        <FaNodeJs className="text-green-500" />,
        <SiMongodb className="text-green-600" />,
        <SiNextdotjs className="text-white" />,
        <FaReact className="text-blue-400" />,
        <FaHtml5 className="text-orange-500" />,
        <FaCss3Alt className="text-blue-600" />,
        <FaJsSquare className="text-yellow-400" />,
        <SiLaravel className="text-red-500" />,
    ];

    // Repeat the icon components
    const repeatedIcons = [...iconComponents, ...iconComponents];

    return (
        <motion.div
            className="w-full overflow-hidden py-6 relative rounded-xl"
            animate={{
                boxShadow: [
                    "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff",
                    "0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff",
                    "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 40px #00ffff"
                ],
                opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            <motion.div
                className="flex gap-24 whitespace-nowrap w-max px-4 py-2"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                {repeatedIcons.map((Icon, i) => (
                    <motion.div
                        key={i}
                        className="flex items-center justify-center text-8xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            filter: [
                                "drop-shadow(0 0 2px #fff)",
                                "drop-shadow(0 0 10px #0ff)",
                                "drop-shadow(0 0 2px #fff)",
                            ],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "loop",
                            ease: "easeInOut",
                            delay: i * 0.1,
                        }}
                    >
                        {Icon}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}
