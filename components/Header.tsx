"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/contact", label: "צור קשר", color: "#ffb4d8" },
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
        
        {/* Logo on the left */}
        <div className="absolute left-0 flex items-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="h-12 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        <nav className="flex items-center gap-8 text-[#331a34] text-sm font-medium tracking-[0.2em]">
          {navItems.map((item) => {
            const isActive =
              item.href === "/gallery"
                ? pathname === "/gallery"
                : item.href === "/contact"
                ? pathname === "/contact"
                : item.href === "/about"
                ? pathname === "/about"
                : item.href === "/"
                ? pathname === "/" && currentHash === ""
                : false;

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
          {/* Placeholder for potential future elements */}
        </div>
      </div>
    </motion.header>
  );
}
