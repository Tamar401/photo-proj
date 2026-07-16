"use client";

import { motion } from "framer-motion";

export default function AnimatedUnderline() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.svg
        width="2494"
        height="118"
        viewBox="0 0 2494 118"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="w-full h-auto"
      >
        <motion.path
          d="M6.5 6.5C351.364 6.5 1091.85 8.32367 1354.01 9.49111C1732.78 11.1778 2354.84 11.5566 2453.52 12.4822C2628.54 14.1241 2084.29 16.6132 1805.37 21.2138C1460.47 26.9025 1321.61 32.7224 707.558 42.8424C445.998 47.1532 361.788 49.7849 335.164 51.3875C211.842 58.8108 1067.15 57.1487 1683.01 59.2142C1873.32 59.8524 1812.84 61.7355 1752.12 63.124C1538.78 68.002 1389.58 71.8763 1249.44 77.3957C1089.81 83.6824 1026.36 89.8368 1007.33 93.2839C966.429 100.692 1221.91 104.095 1346.87 106.202C1351.29 106.43 1313.9 106.886 1279.69 107.348C1245.47 107.811 1215.56 108.267 1139.43 111.5"
          stroke="#FFB4D8"
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { 
              pathLength: 1, 
              opacity: 1, 
              transition: { duration: 1.5, ease: "easeInOut" } 
            }
          }}
        />
      </motion.svg>
    </div>
  );
}