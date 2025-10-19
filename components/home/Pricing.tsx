import React from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { motion } from 'framer-motion'; // Import Framer Motion
import 'aos/dist/aos.css'; // Import AOS CSS

const Pricing = () => {
    

    return (
        <section className="bg-white text-black py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Effective &amp; flexible pricing</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <motion.div
                        className=" border border-primary p-8 text-center rounded-lg"
                        data-aos="fade-up" // AOS effect for the first card
                    >
                        <h3 className="text-xl font-semibold mb-4">One Day Plan</h3>
                        <p className="text-4xl font-bold mb-4">$99 <span className="text-lg font-medium">/Month</span></p>
                        <p className="text-sm mb-4">AI Content generation website is a platform that utilizes artificial intelligences</p>
                        <ul className="text-left mb-8">
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-primary">
                                <GiCheckMark className="font-extrabold text-xl" />
                            </span> Single day Access</li>
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-primary">
                                <GiCheckMark className="font-extrabold text-xl" />
                            </span> 24/7 Gym Access</li>
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-primary">
                                <GiCheckMark className="font-extrabold text-xl" />
                            </span> Personal Trainer</li>
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-primary">
                                <GiCheckMark className="font-extrabold text-xl" />
                            </span> Nutrition Plan</li>
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-primary">
                                <GiCheckMark className="font-extrabold text-xl" />
                            </span> Weekly Events</li>
                        </ul>
                        <button className="bg-transparent border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-black transition">
                            Choose your plan
                        </button>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        className="bg-primary text-black p-8 text-center rounded-lg"
                        data-aos="fade-up" // AOS effect for the second card
                    >
                        <h3 className="text-xl font-semibold mb-4">One Day Plan</h3>
                        <p className="text-4xl font-bold mb-4">$99 <span className="text-lg font-medium">/Month</span></p>
                        <p className="text-sm mb-4">AI Content generation website is a platform that utilizes artificial intelligences</p>
                        <ul className="text-left mb-8">
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-green-600">
                                <GiCheckMark className="font-extrabold text-green-500 text-xl" />
                            </span> Single day Access</li>
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-green-600">
                                <GiCheckMark className="font-extrabold text-green-500 text-xl" />
                            </span> 24/7 Gym Access</li>
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-green-600">
                                <GiCheckMark className="font-extrabold text-green-500 text-xl" />
                            </span> Personal Trainer</li>
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-green-600">
                                <GiCheckMark className="font-extrabold text-green-500 text-xl" />
                            </span> Nutrition Plan</li>
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-green-600">
                                <GiCheckMark className="font-extrabold text-green-500 text-xl" />
                            </span> Weekly Events</li>
                        </ul>
                        <button className="bg-white text-primary py-2 px-4 rounded-lg hover:bg-gray-800 transition">
                            Choose your plan
                        </button>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        className=" border border-primary p-8 text-center rounded-lg"
                        data-aos="fade-up" // AOS effect for the third card
                    >
                        <h3 className="text-xl font-semibold mb-4">One Day Plan</h3>
                        <p className="text-4xl font-bold mb-4">$99 <span className="text-lg font-medium">/Month</span></p>
                        <p className="text-sm mb-4">AI Content generation website is a platform that utilizes artificial intelligences</p>
                        <ul className="text-left mb-8">
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-primary">
                                <GiCheckMark className="font-extrabold text-xl" />
                            </span> Single day Access</li>
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-primary">
                                <GiCheckMark className="font-extrabold text-xl" />
                            </span> 24/7 Gym Access</li>
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-primary">
                                <GiCheckMark className="font-extrabold text-xl" />
                            </span> Personal Trainer</li>
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-primary">
                                <GiCheckMark className="font-extrabold text-xl" />
                            </span> Nutrition Plan</li>
                            <li className="mb-2 flex gap-2"><span className="text-yellow-400 mr-1 rounded-full p-1 border-2 border-primary">
                                <GiCheckMark className="font-extrabold text-xl" />
                            </span> Weekly Events</li>
                        </ul>
                        <button className="bg-transparent border border-primary text-primary py-2 px-4 rounded-lg hover:bg-primary hover:text-black transition">
                            Choose your plan
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
