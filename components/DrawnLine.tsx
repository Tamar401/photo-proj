"use client";
import { motion } from "framer-motion";

export default function DrawnLine() {
  return (
    <div className="w-full flex justify-center my-10 overflow-hidden">
      <motion.svg 
        viewBox="0 0 6122 1392" 
        className="w-full max-w-[500px] h-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        
        <motion.path
          d="M1.5 1390.24C1.5 1390.24 461.171 1039.78 813.5 965.24C1158.83 890.697 1733.57 1225.69 2119 1223.74C2504.43 1221.79 2821.36 1226.95 3094.5 1073.74C3367.64 920.528 3632.98 694.921 3653 498.24C3673.02 301.56 3670.87 119.155 3503 14.7402C3335.13 -89.6746 2915.59 456.623 2944.5 498.24C2973.41 539.857 2985.37 592.361 3036 590.24C3086.63 588.12 3087.34 502.707 3094.5 440.24C3101.66 377.773 2939.98 127.478 2752.5 89.7402C2565.02 52.0022 2375.58 126.892 2286 306.74C2196.42 486.589 2391.73 698.12 2552.5 890.24C2713.27 1082.36 3663.51 1221.37 3961.5 1223.74C4259.49 1226.11 4493.51 1206.96 4720 1140.24C4946.49 1073.52 5035.24 910.274 5270.5 890.24C5505.76 870.206 6120.5 1323.74 6120.5 1323.74"
          fill="none"
          stroke="#000000"
          strokeWidth="30" 
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: { 
              pathLength: 1, 
              opacity: 1, 
              transition: { duration: 6, ease: "easeInOut" } 
            }
          }}
        />
      </motion.svg>
    </div>
  );
}