import Image from "next/image";
import HeroImage from "@/public/assets/images/heroImage.jpg";
import { motion } from "framer-motion";

// components/HeroSection.js
const HeroSection = () => {
    return (
        <div className="w-full bg-white text-black">
            <div className="container pb-8 mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 py-5 md:py-10">
                {/* Left Section: Text */}
                <div
                    className="md:w-1/2 flex flex-col items-start justify-center text-center md:text-left"
                    data-aos="fade-right" // AOS effect
                >
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Improve Your <span className="text-primary">Health</span>, Happiness, and Strength
                    </motion.h1>
                    <motion.p
                        className="mb-6 text-lg"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }} // Slight delay for the paragraph
                    >
                        Welcome to Gym360BD! Join our classes and start your journey to a better you.
                    </motion.p>
                    <motion.button
                        className="bg-primary mx-auto md:mx-0 hover:bg-primary text-white font-bold py-2 px-6 rounded-lg"
                        whileHover={{ scale: 1.05 }} // Framer Motion effect on hover
                        whileTap={{ scale: 0.95 }} // Effect when clicked
                    >
                        Join Class
                    </motion.button>
                </div>

                {/* Right Section: Image */}
                <div className="md:w-1/2 flex justify-center shadow-2xl" data-aos="fade-left">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }} // Initial scale and opacity
                        animate={{ opacity: 1, scale: 1 }} // End scale and opacity
                        transition={{ duration: 0.5 }} // Animation duration
                    >
                        <Image
                            src={HeroImage}
                            alt="Gym Hero"
                            className="w-full h-auto max-w-md md:max-w-lg"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
