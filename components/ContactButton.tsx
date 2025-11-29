"use client";

import { motion } from "framer-motion";

export default function ContactButton() {
    return (
        <section className="py-24 text-center">
            <motion.button
                onClick={() => (window.location.href = "/projectRequestSection")}
                className="magnetic px-8 py-4 rounded-full bg-gradient-to-r from-[#00e676] to-[#00bcd4] text-white text-xl font-bold mt-96 relative overflow-hidden shadow-lg"
                animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                        "0 0 10px #00e676,0 0 20px #00bcd4,0 0 30px #00e676",
                        "0 0 20px #00e676,0 0 40px #00bcd4,0 0 60px #00e676",
                        "0 0 10px #00e676,0 0 20px #00bcd4,0 0 30px #00e676",
                    ],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1 }}
            >
                Contact Us Now
                <span className="shine absolute left-0 top-0 bottom-0 w-24 bg-white/40 transform -skew-x-12 opacity-60 pointer-events-none" />
            </motion.button>
        </section>
    );
}
