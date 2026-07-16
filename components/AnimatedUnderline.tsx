"use client";

import { motion } from "framer-motion";

export default function AnimatedUnderline() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <motion.svg
        width="347"
        height="31"
        viewBox="0 0 347 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.path
          d="M345.446 1.86691C246.059 1.86691 146.346 1.26618 47.0118 1.60206C-45.435 1.91465 231.059 10.4131 323.284 13.5657C418.157 16.8087 118.78 13.1081 18.4031 14.5537C-65.8981 15.7678 187.214 16.6118 271.073 21.0165C293.338 22.186 181.97 22.9504 166.443 22.9862C158.527 23.0045 251.503 26.9084 263.336 27.9527C278.14 29.259 203.294 29.8337 218.297 29.3039"
          stroke="#FFB4D8"
          strokeWidth="3"
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