// components/GlobalLoader.tsx
"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loading() {
    const [ isVisible, setIsVisible ] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 3000); // Simulate loading time
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: [ 1, 1.5, 1 ] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative"
            >
                <div className="relative w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                            ease: "linear",
                        }}
                        className="absolute inset-0 border-8 border-white border-t-transparent rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    );
}
