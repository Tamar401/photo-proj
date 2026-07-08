"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedLineProps {
  animateOnScroll?: boolean;
  className?: string;
}

export default function AnimatedLine({ animateOnScroll = true, className = "" }: AnimatedLineProps) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [pathLength, setPathLength] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    setPathLength(length);
  }, []);

  useEffect(() => {
    if (!animateOnScroll) {
      setHasAnimated(true);
      return;
    }

    const element = wrapperRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [animateOnScroll]);

  return (
    <div
      ref={wrapperRef}
      className={`pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ position: "relative", width: "100%", height: "400px" }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 400"
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        <motion.path
          ref={pathRef}
          d="M0 240 C320 240, 480 120, 720 180 S1120 340, 1380 240 C1480 180, 1560 260, 1660 220 C1720 190, 1780 130, 1860 170 C1900 190, 1940 220, 1980 200"
          fill="none"
          stroke="#D6E4FA"
          strokeWidth={44}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={hasAnimated ? 0 : pathLength}
          style={{ transition: "stroke-dashoffset 1.8s ease-out" }}
        />
      </motion.svg>
    </div>
  );
}
