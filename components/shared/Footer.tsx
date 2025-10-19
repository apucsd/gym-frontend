import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white text-black py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Section */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Gym360BD</h3>
                        <p className="mb-4">
                            Amet consectetur. Ipsum eget gravida posuere ut. Sed tortor diam sem quis urna consequat eros, luctus nisi amet.
                        </p>
                        <div className="flex items-center">
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="bg-gray-800 text-black py-2 px-4 rounded-l-lg focus:outline-none w-full"
                            />
                            <button className="bg-primary text-black py-2 px-4 rounded-r-lg">
                                <FaPaperPlane />
                            </button>
                        </div>
                    </div>

                    {/* Middle Section */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Opening Hours</h4>
                        <p className="mb-2"><FaClock className="inline mr-2" /> Monday-Thursday: 10 am to 06 pm</p>
                        <p className="mb-2"><FaClock className="inline mr-2" /> Friday-Saturday: 11 am to 04 pm</p>
                        <p><FaClock className="inline mr-2" /> Sunday: Close</p>
                    </div>

                    {/* Right Section */}
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Contact us</h4>
                        <p className="mb-2"><FaMapMarkerAlt className="inline mr-2" /> House 12, New York, NY-1200</p>
                        <p className="mb-2"><FaPhoneAlt className="inline mr-2" /> 01402408049-01757813522</p>
                        <p className="mb-2"><FaEnvelope className="inline mr-2" /> info@example.com</p>
                        <p><FaPhoneAlt className="inline mr-2" /> (019) 180 6240</p>
                    </div>
                </div>

                <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
                    <p>
                        Copyright &amp; Design By <a href="#" className="text-primary">@Gym360BD</a> - 2024. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
