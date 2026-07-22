"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-[#f8f8f8] text-[#331a34] antialiased m-0 p-0 block relative">
      {/* Hero Header */}
      <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#f0e6ef] to-[#f8f8f8]">
        <div className="absolute inset-0 bg-transparent" />
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute text-[10rem] md:text-[16rem] font-light text-[#ffb4d8] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-widest uppercase pointer-events-none"
            style={{ zIndex: 1 }}
          >
            ABOUT
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative z-20 text-6xl md:text-8xl font-light text-white tracking-widest uppercase font-hebrew"
          >
            אודות
          </motion.h1>
        </div>
      </div>

      <div className="w-full px-6 md:px-24 pt-20 pb-20 relative z-30 bg-[#fff4fb]" style={{ marginTop: '-40px', borderRadius: '40px 40px 0 0' }}>
        <div className="max-w-5xl mx-auto">
          
          {/* לוגו לב */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex justify-center mb-12"
          >
            <img
              src="/לב.png"
              alt="Heart decoration"
              className="h-[70px] md:h-[100px] object-contain opacity-80"
            />
          </motion.div>

          {/* כותרת */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-light text-[#e0e0e0] mb-6 font-hebrew">רחלי חלופסקי</h2>
          </motion.div>

      

       
      
        </div>
      </div>
    </main>
  );
}
