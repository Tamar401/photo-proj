"use client";

import { motion } from "framer-motion";

export default function BackgroundCurve() {
  return (
    <div className="w-full overflow-hidden pointer-events-none -mt-32 mb-10">
      <motion.svg 
        viewBox="0 0 11016 2203" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-auto"
      >
        <motion.path
          d="M58.0137 1426.11C58.0137 1426.11 1217.93 817.95 1895.01 711.612C2572.09 605.275 4510.01 1183.61 5670.51 1604.61C6831.01 2025.61 9220.87 1344.62 9574.01 1081.61C9927.16 818.606 10443 435.703 10326.5 303.612C10210 171.521 10107.1 122.317 9931.01 125.112C9754.93 127.908 9509.41 466.701 9471.51 711.612C9433.62 956.523 9517.01 1107.56 9637.51 1324.11C9758.02 1540.67 10964 2089.11 10964 2089.11"
          stroke="#FFB4D8"
          strokeOpacity="0.38"
          strokeWidth="250"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }} // האנימציה תתחיל כש-10% מהאלמנט נראים
          transition={{ 
            duration: 5, 
            ease: [0.43, 0.13, 0.23, 0.96] // "Easing" רך יותר שמדמה תנועה אורגנית
          }}
        />
      </motion.svg>
    </div>
  );
}