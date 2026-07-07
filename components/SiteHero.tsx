"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CiHeart } from "react-icons/ci";

const heroImages = [
  "/4W3A5030-copy-1-scaled.jpg",
  "/4W3A1878-copy.jpg",
  "/4W3A0973-copy-scaled.jpg",
];

interface SiteHeroProps {
  title: string;
  subtitle?: string;
  showCamera?: boolean;
  showBackground?: boolean;
}

export default function SiteHero({ title, subtitle, showCamera = false, showBackground = false }: SiteHeroProps) {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [heroOffset, setHeroOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cy = rect.top + rect.height / 2;
      const dy = (e.clientY - cy) / rect.height;
      setHeroOffset({ x: 0, y: dy * 8 });
    };

    const onLeave = () => setHeroOffset({ x: 0, y: 0 });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative flex flex-col justify-center items-center text-center w-full overflow-hidden px-6 py-20 min-h-[68vh]">
      <div className="absolute inset-0 z-0 bg-white w-full h-full">
        {showBackground ? (
          <>
            <AnimatePresence>
              <motion.img
                key={currentHeroIndex}
                src={heroImages[currentHeroIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.24, x: heroOffset.x, y: heroOffset.y }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
                className="w-full h-full object-cover absolute inset-0"
                alt="Background content"
                style={{ transformOrigin: "50% 50%" }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-transparent to-transparent z-10" />
          </>
        ) : null}
      </div>

      <div className="relative z-20 pointer-events-none max-w-5xl">
        <motion.h1
          className="text-4xl md:text-6xl font-light uppercase tracking-widest text-pink-600"
        >
          {Array.from(title).map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Multicolor animated underline (draw animation using gradient from logo colors) */}
        <motion.div className="mt-6 flex justify-center pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>
          <motion.svg width="420" height="44" viewBox="0 0 420 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#43d6ff" />
                <stop offset="45%" stopColor="#8c5cff" />
                <stop offset="90%" stopColor="#ff7d3f" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <motion.path
              d="M10 24 C110 4, 270 4, 410 24"
              stroke="url(#logoGradient)"
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.55, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.div>

        {subtitle && (
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="mt-4 text-sm md:text-base text-pink-300 leading-relaxed max-w-3xl mx-auto">
            {subtitle}
          </motion.p>
        )}

        {showCamera && (
          <div className="flex justify-center items-center gap-4 mt-10">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: [20, -6, 0] }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.9, ease: "easeOut" }}
              >
                <CiHeart size={80} color="#FF3399" strokeWidth={1.5} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
