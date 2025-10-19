"use client";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSignOutAlt, FaDumbbell } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const menuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeInOut" } },
};

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeInOut" },
  }),
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // simulate API call
    async function dummy() {
      try {
        await axios.get("https://gym-server-menagement.onrender.com/api/v1/users/get-user/TRAINEE");
      } catch (err) {}
    }
    dummy();

    const userInfo = localStorage?.getItem("user");
    if (userInfo) {
      const user = JSON.parse(userInfo);
      setUserRole(user.role);
    }
  }, []);

  const menuItems = [
    { key: "Home", path: "/" },
    { key: "Programs", path: "/services" },
    // { key: "Trainers", path: "/trainers" },
    { key: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    router.push("/");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserRole(null);
  };

  return (
    <header className=" w-full z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-yellow-400 tracking-wide"
        >
          <FaDumbbell className="text-primary" />
          Gym360BD
        </Link>

        {/* Desktop Menu */}
        <motion.nav
          className="hidden md:flex gap-8 text-lg font-medium"
          initial="hidden"
          animate="visible"
          variants={menuVariants}
        >
          {menuItems.map((item, i) => (
            <motion.div
              key={item.key}
              custom={i}
              variants={linkVariants}
              whileHover={{ scale: 1.1, color: "#facc15" }}
            >
              <Link href={item.path} className="text-gray-800 hover:text-yellow-400 transition">
                {item.key}
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {userRole ? (
            <>
              <Link
                href={`/dashboard/${
                  userRole === "TRAINEE"
                    ? "trainee"
                    : userRole === "TRAINER"
                    ? "trainer"
                    : "admin"
                }`}
                className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-300 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-black font-semibold px-4 py-2 rounded-md transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-5 py-2 rounded-md transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden text-yellow-400 text-2xl"
        >
          <GiHamburgerMenu />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden flex flex-col bg-white text-black absolute top-16 left-0 w-full py-4 space-y-4 border-t border-gray-700"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map((item, i) => (
              <Link
                key={i}
                href={item.path}
                className="text-center text-lg font-semibold text-gray-300 hover:text-yellow-400 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.key}
              </Link>
            ))}

            <div className="flex justify-center gap-3 pt-2">
              {userRole ? (
                <>
                  <Link
                    href={`/dashboard/${
                      userRole === "TRAINEE"
                        ? "trainee"
                        : userRole === "TRAINER"
                        ? "trainer"
                        : "admin"
                    }`}
                    className="bg-yellow-400 text-black px-5 py-2 rounded font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="bg-red-500 text-black px-5 py-2 rounded font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="bg-yellow-400 text-black px-5 py-2 rounded font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
