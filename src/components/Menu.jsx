// src/components/Menu.tsx
'use client';

import { motion, AnimatePresence } from "framer-motion";
import { Home, Palette, Images, Star, Mail, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, href: "#home" },
    { name: "Services", icon: <Palette size={20} />, href: "#services" },
    { name: "Gallery", icon: <Images size={20} />, href: "#gallery" },
    { name: "Testimonials", icon: <Star size={20} />, href: "#testimonials" },
    { name: "Contact", icon: <Mail size={20} />, href: "#contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (

    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md border-b border-white/10 p-2"

    >
      <div className="max-w-7xl mx-auto md:px-4 lg:px-8">
        <div className="flex justify-between items-center ">
          {/* Logo */}
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src="/images/img1.png"
              alt="Logo"
              className="h-12 mx-2 md:h-20 object-contain"
            />
            <img
              src="/images/text.png"
              alt="Brand Text"
              className="h-12 md:h-16 object-contain"
            />
          </div>
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-2 text-white hover:text-red-500 transition"
                >
                  <span className="text-red-500">{item.icon}</span>
                  <span className="text-md lg:text-lg font-medium">{item.name}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-md bg-red-600 text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  opacity: { duration: 0.2 },
                  height: { duration: 0.3 }
                }
              }}
              exit={{
                opacity: 0,
                height: 0,
                transition: {
                  opacity: { duration: 0.2 },
                  height: { duration: 0.3 }
                }
              }}
              className="md:hidden overflow-hidden bg-white rounded-b-xl shadow-lg"
            >
              <nav className="flex flex-col divide-y divide-gray-200">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.2,
                        delay: index * 0.05
                      }
                    }}
                    exit={{ x: 20, opacity: 0 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-5 py-4 text-gray-800 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      <span className="text-red-500">{item.icon}</span>
                      <span className="text-sm font-medium">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
