'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import image1 from "@/public/assets/images/ourService3.jpg";
import image2 from "@/public/assets/images/ourService2.jpg";
import image3 from "@/public/assets/images/ourService1.jpg";
import Image from 'next/image';

const About = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="container mx-auto bg-white text-black py-16">
            {/* Hero Section */}
            <section className="text-center mb-16">
                <motion.h1
                    className="text-5xl font-bold"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    About Gym360BD
                </motion.h1>
                <motion.p
                    className="mt-4 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Learn more about our mission, vision, and the passionate team behind Gym360BD.
                </motion.p>
            </section>

            {/* Mission, Vision, Values */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <motion.div
                    className="bg-gray-900 p-8 rounded-lg shadow-lg"
                    data-aos="fade-up"
                >
                    <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                    <p>
                        Our mission is to promote a healthy and active lifestyle by providing exceptional fitness services and cutting-edge equipment in a motivating environment.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gray-900 p-8 rounded-lg shadow-lg"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                    <p>
                        We envision a community where fitness is accessible to all, and people are inspired to achieve their goals, no matter their starting point.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gray-900 p-8 rounded-lg shadow-lg"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <h2 className="text-2xl font-bold mb-4">Our Values</h2>
                    <ul className="list-none space-y-3">
                        <li className="flex items-center">
                            <FaCheckCircle className="text-primary mr-2" /> Commitment to Clients
                        </li>
                        <li className="flex items-center">
                            <FaCheckCircle className="text-primary mr-2" /> Innovation
                        </li>
                        <li className="flex items-center">
                            <FaCheckCircle className="text-primary mr-2" /> Integrity
                        </li>
                        <li className="flex items-center">
                            <FaCheckCircle className="text-primary mr-2" /> Teamwork
                        </li>
                    </ul>
                </motion.div>
            </section>

            {/* Team Section */}
            <section className="mb-16">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Meet Our Team
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                        className="bg-gray-900 p-8 rounded-lg shadow-lg text-center"
                        data-aos="fade-up"
                    >
                        <Image
                            src={image1}
                            alt="Trainer 1"
                            className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                        />
                        <h3 className="text-xl font-bold">Alice Johnson</h3>
                        <p className="text-gray-400">Yoga Instructor</p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-900 p-8 rounded-lg shadow-lg text-center"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <Image
                            src={image2}
                            alt="Trainer 2"
                            className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                        />
                        <h3 className="text-xl font-bold">John Doe</h3>
                        <p className="text-gray-400">Strength Trainer</p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-900 p-8 rounded-lg shadow-lg text-center"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <Image
                            src={image3}
                            alt="Trainer 3"
                            className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                        />
                        <h3 className="text-xl font-bold">Sarah Williams</h3>
                        <p className="text-gray-400">Cardio Specialist</p>
                    </motion.div>
                </div>
            </section>

            {/* Extended Content Section */}
            <section className="container mx-auto mt-16 px-6 md:px-0">
                <motion.h2
                    className="text-3xl font-bold text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Why Choose Us?
                </motion.h2>
                <motion.p
                    className="mt-4 text-lg text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    At Gym360BD, we provide not just fitness services, but a lifestyle. Our dedicated team and comprehensive approach ensure you get the best out of your fitness journey.
                </motion.p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* Feature 1 */}
                    <motion.div
                        className="bg-gray-900 p-6 rounded-lg shadow-lg"
                        data-aos="fade-right"
                    >
                        <h3 className="text-xl font-bold">Customized Plans</h3>
                        <p className="mt-4">
                            Every individual is unique, and so are their fitness goals. Our programs are designed specifically to fit your body, schedule, and personal targets.
                        </p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        className="bg-gray-900 p-6 rounded-lg shadow-lg"
                        data-aos="fade-left"
                    >
                        <h3 className="text-xl font-bold">World-Class Trainers</h3>
                        <p className="mt-4">
                            Learn from the best in the industry. Our certified trainers are not only experts in fitness but also passionate about helping you succeed.
                        </p>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        className="bg-gray-900 p-6 rounded-lg shadow-lg"
                        data-aos="fade-right"
                    >
                        <h3 className="text-xl font-bold">Modern Equipment</h3>
                        <p className="mt-4">
                            We offer state-of-the-art gym equipment for all your fitness needs, ensuring a safe and effective workout experience.
                        </p>
                    </motion.div>

                    {/* Feature 4 */}
                    <motion.div
                        className="bg-gray-900 p-6 rounded-lg shadow-lg"
                        data-aos="fade-left"
                    >
                        <h3 className="text-xl font-bold">Holistic Approach</h3>
                        <p className="mt-4">
                            At Gym360BD, we believe in a balanced approach to fitness. We focus on your physical, mental, and nutritional health to bring out the best version of you.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="container mx-auto text-center py-16 mt-16 bg-gray-900 rounded-lg">
                <motion.h2
                    className="text-3xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Ready to Begin Your Journey?
                </motion.h2>
                <motion.p
                    className="mt-4 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    Contact us today to schedule a free consultation with one of our certified trainers.
                </motion.p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="mt-6 px-8 py-3 bg-primary text-black font-semibold rounded-lg hover:bg-yellow-600"
                >
                    Get Started Now
                </motion.button>
            </section>

            {/* History Section */}
            <section className="mb-16">
                <motion.div
                    className="mb-8"
                    data-aos="fade-right"
                >
                    <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
                    <p>
                        Gym360BD started in 2010 with a vision to make fitness accessible to everyone. Over the years, we have grown into a leading gym with top-tier equipment, world-class trainers, and an expanding community of fitness enthusiasts. From humble beginnings, we have been committed to enhancing the well-being of thousands of people, continually innovating our approach.
                    </p>
                </motion.div>

                {/* Timeline Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        className="bg-gray-900 p-8 rounded-lg shadow-lg"
                        data-aos="fade-up"
                    >
                        <h3 className="text-xl font-bold mb-2">2010: Founded</h3>
                        <p>We opened our first branch in Fitness City with a team of 5 trainers.</p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-900 p-8 rounded-lg shadow-lg"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h3 className="text-xl font-bold mb-2">2015: Expansion</h3>
                        <p>By 2015, we had 5 branches, serving over 10,000 members with a wide range of fitness programs.</p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-900 p-8 rounded-lg shadow-lg"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        <h3 className="text-xl font-bold mb-2">2020: Going Digital</h3>
                        <p>We launched our online fitness app, reaching thousands of clients globally with virtual training sessions.</p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-900 p-8 rounded-lg shadow-lg"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        <h3 className="text-xl font-bold mb-2">2024: Present</h3>
                        <p>Today, Gym360BD continues to innovate, adding new services and expanding our reach globally.</p>
                    </motion.div>
                </div>
            </section>

           

            {/* Testimonials Section */}
            <section className="mb-16">
                <motion.h2
                    className="text-3xl font-bold text-center mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    What Our Clients Say
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        className="bg-gray-900 p-8 rounded-lg shadow-lg"
                        data-aos="fade-up"
                    >
                        <p className="text-gray-300 italic">
                            "Gym360BD transformed my life. The trainers are so knowledgeable and helped me reach my fitness goals faster than I imagined!"
                        </p>
                        <p className="mt-4 font-bold">— Emily Roberts</p>
                    </motion.div>

                    <motion.div
                        className="bg-gray-900 p-8 rounded-lg shadow-lg"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <p className="text-gray-300 italic">
                            "The atmosphere at Gym360BD is motivating, and the facilities are world-class. It&apos;s the best decision I’ve made for my health."
                        </p>
                        <p className="mt-4 font-bold">— Michael Johnson</p>
                    </motion.div>
                </div>
            </section>

            {/* Footer with Call to Action */}
            <section className="py-16 bg-gray-900 text-center">
                <motion.h2
                    className="text-2xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    Ready to Start Your Fitness Journey?
                </motion.h2>
                <div className="mt-6 flex justify-center space-x-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="p-3 rounded-lg bg-gray-800 text-black focus:outline-none w-64"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="py-3 px-6 bg-primary text-black font-semibold rounded-lg hover:bg-yellow-600"
                    >
                        Get Started
                    </motion.button>
                </div>
            </section>
        </div>
    );
};

export default About;
