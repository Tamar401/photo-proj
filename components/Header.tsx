"use client";

import type React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/about", label: "אודות", color: "#d36d9f" },
  { href: "/gallery", label: "גלריה", color: "#ff94c4" },
  { href: "/", label: "בית", color: "#c24f8d" },
];

export default function Header() {
  const pathname = usePathname() || "/";
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentHash(window.location.hash);
      const handleHashChange = () => setCurrentHash(window.location.hash);
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/" && currentHash === "") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 border-b border-white/70 shadow-none backdrop-blur-xl"
    >
      <div className="max-w-5xl mx-auto relative flex items-center justify-center">
        <nav className="flex items-center gap-8 text-[#331a34] text-sm font-medium tracking-[0.2em]">
          {navItems.map((item) => {
            const isActive =
              item.href === "/gallery"
                ? pathname === "/gallery"
                : item.href === "/"
                ? pathname === "/" && currentHash === ""
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="transition duration-200"
                style={{
                  color: isActive ? item.color : "#331a34",
                  textDecoration: isActive ? "underline" : "none",
                  textUnderlineOffset: "10px",
                }}
                onClick={item.href === "/" ? handleHomeClick : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute right-0 flex items-center">
          <Link
            href="/contact"
            className="bg-white text-[#c13f7f] px-5 py-2.5 rounded-full font-semibold shadow-[0_20px_60px_-30px_rgba(209,80,142,0.8)] hover:bg-pink-100 transition"
          >
            צור קשר
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
