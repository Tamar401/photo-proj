"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimatedUnderline from "@/components/AnimatedUnderline";
import { Fredoka } from "next/font/google"; 

const fredoka = Fredoka({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// הגדרות אנימציה להופעה הדרגתית של הכרטיסיות
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const categories = [
  { id: "משפחה", name: "משפחה", image: "/משפחה/לאתר 2.jpg" },
  { id: "ניו בורן", name: "ניו בורן", image: "/ניו בורן/12311-Edit.jpg" },
  { id: "חלאקה", name: "חלאקה", image: "/חלאקה/קולדצקי ראשון.jpg" },
  { id: "סמאש קייק", name: "סמאש קייק", image: "/סמאש קייק/לאתר6 copy.jpg" },
];

export default function GalleryPage() {
  // ניהול מצב ה-Hover לכל קטגוריה לפי האינדקס שלה
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className={`min-h-screen w-full bg-[#f8f8f8] text-[#331a34] antialiased m-0 p-0 block relative ${fredoka.className}`} dir="rtl">
      
      {/* Hero Header */}
      <div className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-[#f8f8f8]">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/משפחה/לתמר.jpg"
          alt="Gallery Header"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 transition-all duration-700" />
        
        {/* קונטיינר מרכזי עם Flexbox למירכוז מושלם */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="absolute text-[5rem] md:text-[14rem] tracking-[10px] md:tracking-[25px] uppercase font-['iInspirationalDoctor'] text-[#ffb4d8] whitespace-nowrap"
            style={{ zIndex: 1 }}
          >
            GALLERY
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="relative z-20 text-6xl md:text-8xl font-bold text-white tracking-widest uppercase drop-shadow-lg"
          >
            גלריה
          </motion.h1>
        </div>
      </div>

      <div className="w-full px-6 md:px-24 pt-16 pb-24 relative z-30 bg-[#fff4fb] rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.02)]" style={{ marginTop: '-40px' }}>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16 w-full max-w-7xl mx-auto"
        >
          {categories.map((category, index) => (
            <Link key={category.id} href={`/gallery/${category.id}`}>
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-[2rem] cursor-pointer group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 bg-white"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem]">
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  
                  {/* שכבת מעבר צבע על התמונה */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-colors duration-500" />

                  {/* טקסט וקו תחתון */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 pointer-events-none">
                    <span 
                      className={`text-3xl md:text-4xl font-semibold tracking-wide transition-colors duration-500 drop-shadow-md ${
                        hoveredIndex === index ? "text-[#ffb4d8]" : "text-white"
                      }`}
                    >
                      {category.name}
                    </span>
                    
                    {/* הקו מופיע ונעלם עם אנימציה */}
                    <div className="h-[20px] w-[60%] mt-3">
                      <AnimatePresence>
                        {hoveredIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            exit={{ opacity: 0, scaleX: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <AnimatedUnderline />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
        
      </div>
    </main>
  );
}