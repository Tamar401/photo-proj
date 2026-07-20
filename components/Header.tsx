"use client";

import type React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/contact", label: "צור קשר", color: "#c24f8d" },
  { href: "/about", label: "אודות", color: "#c24f8d" },
  { href: "/gallery", label: "גלריה", color: "#c24f8d" },
  { href: "/", label: "בית", color: "#c24f8d" },
];

export default function Header() {
  const pathname = usePathname() || "/";
  const [currentHash, setCurrentHash] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [isHome, setIsHome] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // שקוף בהתחלה, הדרגתי לבז' חום עם blur
  const bgOpacity = isHome 
    ? Math.max(0, Math.min(1, scrollY / 300))
    : 1;

  const bgColor = isHome 
    ? `rgba(232, 221, 212, ${0.7 * bgOpacity})`
    : "rgba(232, 221, 212, 0.8)";

  const backdropBlur = ( scrollY > 50)
    ? "backdrop-blur-md"
    : "backdrop-blur-none";

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-2 md:py-4 border-none shadow-none transition-colors duration-300 backdrop-blur-md ${backdropBlur}`}
        style={{
          backgroundColor: bgColor,
          
          
        }}
      >
        <div className="max-w-7xl mx-auto relative flex items-center justify-between md:justify-center px-4 md:px-12 w-full">
          
          {/* Logo - visible and part of flow on mobile */}
          <Link href="/" className="md:absolute md:left-0 md:left-4 flex items-center z-20">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-8 md:h-12 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Hamburger Menu - visible only on mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 z-20"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isMenuOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-[#331a34] transition-all"
            />
            <motion.span
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-[#331a34]"
            />
            <motion.span
              animate={isMenuOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-[#331a34] transition-all"
            />
          </button>

          {/* Navigation - hidden on mobile, visible on md+ */}
          <nav className="hidden md:flex items-center gap-3 md:gap-12 lg:gap-28 text-xs md:text-sm lg:text-base font-medium tracking-[0.1em] md:tracking-[0.2em]" style={{ color: "#331a34" }}>
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
        </div>
      </motion.header>

      {/* Mobile Menu - slides down when open */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 md:hidden z-40 bg-[#e8ddd4]/95 backdrop-blur-md"
          >
            <nav className="flex flex-col gap-4 p-6" style={{ color: "#331a34" }}>
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
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (item.href === "/" && currentHash === "") {
                        handleHomeClick(new MouseEvent('click') as any);
                      }
                    }}
                    className="text-lg font-medium transition duration-200"
                    style={{
                      color: isActive ? item.color : "#331a34",
                      textDecoration: isActive ? "underline" : "none",
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}