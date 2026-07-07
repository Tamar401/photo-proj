"use client";

import type React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname() || "/";
  const isHome = pathname === "/";

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.header initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-transparent backdrop-blur-xl border-b border-white/10 shadow-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo (circle only) */}
        <Link href="/" onClick={handleHomeClick} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff9ecb] to-[#ffd7e8] flex items-center justify-center text-black font-medium">R</div>
        </Link>

        {/* Center navigation */}
        <nav className="flex items-center gap-8 text-pink-600 text-sm font-light tracking-wide">
          <Link href="/" onClick={handleHomeClick} className="transition text-pink-600 hover:text-pink-700">
            בית
          </Link>

          <Link href="/#gallery" className="transition text-pink-600 hover:text-pink-700">
            גלריה
          </Link>

          <Link href="/about" className="transition text-pink-600 hover:text-pink-700">
            אודות
          </Link>
        </nav>

        {/* CTA on the right */}
        <div className="flex items-center">
          <Link
            href="/contact"
            className="bg-gradient-to-r from-[#ff9ecb] to-[#ffd7e8] text-black px-5 py-2.5 rounded-full font-medium shadow-sm hover:opacity-95 transition"
          >
            דברו איתי
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
