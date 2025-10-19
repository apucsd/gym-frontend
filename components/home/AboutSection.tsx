import Image from "next/image";
import AboutSectionImage from "@/public/assets/images/hero-image.jpg";
import { GiCheckMark } from "react-icons/gi";
import { motion } from "framer-motion"; // Import Framer Motion
import Link from "next/link";


// components/AboutSection.js
const AboutSection = () => {

    return (
        <div className="w-full bg-white text-black container mx-auto">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-20">

                {/* Left Section: Image */}
                <div className="md:w-1/2 flex justify-center mb-8 md:mb-0" data-aos="fade-right">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }} // Initial scale and opacity
                        animate={{ opacity: 1, scale: 1 }} // End scale and opacity
                        transition={{ duration: 0.5 }} // Animation duration
                    >
                        <Image
                            src={AboutSectionImage} // Replace with your own image
                            alt="Gym Training"
                            className="w-full h-auto max-w-md md:max-w-lg"
                        />
                    </motion.div>
                </div>

                {/* Right Section: Text */}
                <div className="md:w-1/2 flex flex-col items-start justify-center text-center md:text-left" data-aos="fade-left">
                    <h2 className="text-yellow-400 text-sm uppercase mb-4 text-center font-semibold flex justify-center mx-auto md:mx-0">About Us</h2>
                    <motion.h1
                        className="text-4xl font-bold mb-6"
                        initial={{ opacity: 0, y: -20 }} // Initial position
                        animate={{ opacity: 1, y: 0 }} // End position
                        transition={{ duration: 0.5 }} // Animation duration
                    >
                        We Have Lot Of Experience Gym Training Goals.
                    </motion.h1>
                    <motion.p
                        className="mb-6"
                        initial={{ opacity: 0, y: -20 }} // Initial position
                        animate={{ opacity: 1, y: 0 }} // End position
                        transition={{ duration: 0.5, delay: 0.2 }} // Delay for the paragraph
                    >
                        Our gym is staffed with highly qualified and experienced healthcare professionals
                        dedicated to providing exceptional technology edge treatments to ensure your goals are met.
                    </motion.p>

                    {/* Bullet Points */}
                    <ul className="space-y-2 mb-6 mx-auto md:mx-0">
                        {[ "Center", "Great Facilities For Client", "Special Instructor" ].map((item, index) => (
                            <motion.li
                                key={index}
                                className="flex items-center"
                                initial={{ opacity: 0, y: -10 }} // Initial position
                                animate={{ opacity: 1, y: 0 }} // End position
                                transition={{ duration: 0.5, delay: index * 0.1 }} // Delay for each bullet point
                            >
                                <span className="text-yellow-400 mr-2 rounded-full p-2 border-4 border-primary">
                                    <GiCheckMark className="font-extrabold text-xl" />
                                </span>
                                {item}
                            </motion.li>
                        ))}
                    </ul>

                    {/* Button */}
                    <motion.div
                        className="mx-auto md:mx-0"
                        initial={{ opacity: 0, y: 20 }} // Initial position
                        animate={{ opacity: 1, y: 0 }} // End position
                        transition={{ duration: 0.5, delay: 0.4 }} // Delay for the button
                    >
                        <Link href={"/about"} className="bg-primary text-white font-bold text-lg px-7 py-2 rounded mr-4">
                            More About Us
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
