"use client";

import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
};

export function AnimatedSection({ button, onclick, title, text }: { button?: string; onclick?: () => void; title: string; text: string }) {
    return (
        <motion.section
            className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-blue-100"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
        >
            <motion.h1 variants={itemVariants} className="text-5xl font-bold mb-4 text-blue-700">
                {title}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-700 max-w-xl text-center mb-8">
                {text}
            </motion.p>
            {button &&
                <motion.button
                    variants={itemVariants}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
                    onClick={onclick}
                >
                    {button}
                </motion.button>
            }
        </motion.section>
    );
}
