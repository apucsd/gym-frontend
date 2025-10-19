import wellnessImage1 from "@/public/assets/images/ourService3.jpg";
import wellnessImage2 from "@/public/assets/images/heroImage.jpg";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion

// components/WellnessSection.js
const WellnessSection = () => {
    
    return (
        <div className="w-full">
            {/* First Section */}
            <div className="bg-primary text-black py-8 rounded container mx-auto">
                <div className="container mx-auto px-4 grid md:grid-cols-2 items-center">
                    {/* Image */}
                    <motion.div
                        className="flex justify-center"
                        data-aos="fade-right" // AOS effect for the first image
                        data-aos-delay="200" // Delay for the first image
                    >
                        <Image
                            src={wellnessImage1} // Replace with actual image
                            alt="Gym Workout"
                            className="w-full md:w-[70%] h-auto rounded border-8 border-white"
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        className="p-8"
                        initial={{ opacity: 0, x: -20 }} // Initial position
                        animate={{ opacity: 1, x: 0 }} // End position
                        transition={{ duration: 0.5 }} // Animation duration
                    >
                        <h2 className="text-4xl font-bold mb-4 text-white">Elevate Your Wellness <br /> Join Our Fitness Tribe.</h2>
                        <p className="text-white mb-6">
                            Our Gym is staffed with highly qualified and experienced doctors, nurses, and healthcare professionals dedicated to providing exceptional patient care technology.
                        </p>
                        <a
                            href="#"
                            className="bg-white text-black px-6 py-3 rounded inline-block hover:bg-gray-800 transition-all duration-300"
                        >
                            Learn more
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Second Section */}
            <div className="bg-white mt-8 text-black py-8">
                <div className="container mx-auto px-4 grid md:grid-cols-2 items-center">
                    {/* Image */}
                    <motion.div
                        className="flex justify-center"
                        data-aos="fade-left" // AOS effect for the second image
                        data-aos-delay="200" // Delay for the second image
                    >
                        <Image
                            src={wellnessImage2} // Replace with actual image
                            alt="Fitness Coaching"
                            className="w-full md:w-[70%] h-auto rounded border-8 border-white p-6"
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        className="p-8"
                        initial={{ opacity: 0, x: 20 }} // Initial position
                        animate={{ opacity: 1, x: 0 }} // End position
                        transition={{ duration: 0.5 }} // Animation duration
                    >
                        <h2 className="text-4xl font-bold mb-4">Elevate Your Wellness <br /> Join Our Fitness Tribe.</h2>
                        <p className="text-gray-400 mb-6">
                            Our Gym is staffed with highly qualified and experienced doctors, nurses, and healthcare professionals dedicated to providing exceptional patient care technology.
                        </p>
                        <a
                            href="#"
                            className="bg-yellow-400 text-black px-6 py-3 rounded inline-block hover:bg-primary transition-all duration-300"
                        >
                            Learn more
                        </a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default WellnessSection;
