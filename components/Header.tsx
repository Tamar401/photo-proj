"use client";

import type React from "react";
import Link from "next/link";
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
  const [scrollY, setScrollY] = useState(0);
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentHash(window.location.hash);
      const handleHashChange = () => setCurrentHash(window.location.hash);
      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  useEffect(() => {
    setIsHome(pathname === "/");
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/" && currentHash === "") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // שקוף בהתחלה, ורוד מלא אחרי 500px
  const bgColor = isHome 
    ? scrollY > 500 
      ? "#ffb4d8" 
      : "transparent"
    : "rgba(255, 180, 216, 1)";

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-none shadow-none backdrop-blur-none transition-colors duration-300"
      style={{
        backgroundColor: bgColor
      }}
    >
      <div className="max-w-7xl mx-auto relative flex items-center justify-center px-12">
        
        {/* Logo on the left */}
        <div className="absolute left-0 flex items-center">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-12 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {/* השינוי כאן: הגדלת ה-gap מ-gap-16 ל-gap-28 */}
        <nav className="flex items-center gap-28 text-sm font-medium tracking-[0.2em]" style={{ color: "#331a34" }}>
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
                  color: isActive ? item.color : "white",
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