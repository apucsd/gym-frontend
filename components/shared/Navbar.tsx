"use client";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSignOutAlt, FaDumbbell } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";

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
  const dipatch = useAppDispatch()

  const router = useRouter();
  const {user} = useAppSelector((state: RootState) => state.auth);

  console.log(user)


  const menuItems = [
    { key: "Home", path: "/" },
    { key: "Programs", path: "/services" },
    // { key: "Trainers", path: "/trainers" },
    { key: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    dipatch(logout())
    router.push("/")
    
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
          {user ? (
            <>
              <Link
                href={`/${
                  user.role === "ADMIN" || user.role === "SUPER_ADMIN"
                    ? "admin/user-mangement"
                    : user.role === "TRAINER"
                    ? "trainer/my-classes"
                    : user.role === "TRAINEE"
                    ? "trainee/my-bookings"
                    : ""
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
              {user ? (
                <>
                  <Link
                    href={`/dashboard/${
                      user.role === "TRAINEE"
                        ? "trainee"
                        : user.role === "TRAINER"
                        ? "trainer"
                        : user.role === "ADMIN" || user.role === "SUPER_ADMIN"
                        ? "admin"
                        : ""
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
