"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. תמונות שיתחלפו לאט ובעדינות ברקע של כותרת השם
const heroImages = [
  "/1Q5A6517.JPG",
  "/1Q5A5485.JPG",
  "/1Q5A5960.JPG",
  "/1Q5A6134.JPG",
];

// 2. גלריית העבודות המלאה למטה עם הקטגוריות
const initialImages = [
  { id: 1, src: "/1Q5A6517.JPG", category: "סטודיו" },
  { id: 2, src: "/1Q5A5485.JPG", category: "חוץ" },
  { id: 3, src: "/1Q5A5531.JPG", category: "סטודיו" },
  { id: 4, src: "/1Q5A5812.JPG", category: "אירועים" },
  { id: 5, src: "/1Q5A5960.JPG", category: "חוץ" },
  { id: 6, src: "/1Q5A5996.JPG", category: "אירועים" },
  { id: 7, src: "/1Q5A6030.JPG", category: "סטודיו" },
  { id: 8, src: "/1Q5A6134.JPG", category: "חוץ" },
  { id: 9, src: "/1Q5A6432.JPG", category: "אירועים" },
  { id: 10, src: "/1Q5A6461.JPG", category: "סטודיו" },
  { id: 11, src: "/1Q5A6495.JPG", category: "חוץ" },
  { id: 12, src: "/1Q5A6529.JPG", category: "אירועים" },
  { id: 13, src: "/1Q5A6589.JPG", category: "סטודיו" },
  { id: 14, src: "/1Q5A6654.JPG", category: "חוץ" },
  { id: 15, src: "/1Q5A6760.JPG", category: "אירועים" },
];

const categories = ["הכל", "סטודיו", "חוץ", "אירועים"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // מניעת גלילה של העמוד כשהלייטבוקס פתוח
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedImage]);

  // החלפת תמונת רקע עליונה כל 4 שניות
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filteredImages = activeCategory === "הכל"
    ? initialImages
    : initialImages.filter(img => img.category === activeCategory);

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-[#f5f5f5] antialiased m-0 p-0 block relative">
      
      {/* מודל לייטבוקס - הגודל הוקטן משמעותית גם ברוחב כדי למנוע מתחיות של תמונות לרוחב */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 w-full h-full bg-black/85 backdrop-blur-md flex flex-col justify-center items-center p-12 cursor-zoom-out"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99999 }}
          >
            {/* כפתור סגירה קבוע בפינה העליונה */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-8 right-8 text-[#00d2ff] hover:text-[#00ff87] text-xs tracking-widest cursor-pointer transition-colors font-light bg-black/60 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/10"
              style={{ zIndex: 100000 }}
            >
              ✕ CLOSE
            </button>

            {/* התמונה המוקטנת - מוגבלת ל-55% מהרוחב ו-60% מהגובה כדי להבטיח מסגרת רקע רחבה */}
            <motion.img
              initial={{ scale: 0.85, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              src={selectedImage}
              alt="View Enlarged"
              className="max-w-[55vw] max-h-[60vh] object-contain rounded-lg shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] pointer-events-none border border-white/10"
              style={{ zIndex: 99999 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header 
        style={{ height: "78vh" }} 
        className="relative flex flex-col justify-center items-center text-center w-full overflow-hidden px-6 m-0"
      >
        <div className="absolute inset-0 z-0 bg-[#0a0a0a] w-full h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentHeroIndex}
              src={heroImages[currentHeroIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full object-cover absolute inset-0"
              style={{ width: "100%", height: "100%" }}
              alt="Background Content"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
        </div>

        <div className="relative z-20 pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-light uppercase mb-4 tracking-widest text-white"
          >
            Rachely Chalofski
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-[2px] bg-gradient-to-r from-[#00d2ff] to-[#00ff87] mb-6 mx-auto"
          />

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-neutral-400 text-xs md:text-sm tracking-[0.4em] uppercase font-light"
          >
            Visual Storyteller & Artist
          </motion.p>
        </div>
      </header>

      {/* אזור הגלריה והסינון */}
      <div className="w-full px-6 md:px-24 pt-24 pb-12 relative z-30 bg-[#0a0a0a]">
        
        {/* תפריט קטגוריות */}
        <nav className="flex justify-center gap-8 mb-16 text-sm tracking-wider font-light">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative py-2 cursor-pointer transition-colors duration-300 text-neutral-400 hover:text-white"
            >
              <span className={activeCategory === category ? "text-white font-normal" : ""}>
                {category}
              </span>
              {activeCategory === category && (
                <motion.div 
                  layoutId="underline" 
                  className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-[#00d2ff] to-[#00ff87]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* גלריית התמונות */}
        <section className="mb-32">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img) => (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedImage(img.src)} 
                  className="relative overflow-hidden rounded-md aspect-[3/4] bg-neutral-950 group cursor-pointer shadow-2xl"
                >
                  <img 
                    src={img.src} 
                    alt={`רחלי חלופסקי צלמת - ${img.category}`}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-8 pointer-events-none">
                    <span className="text-xs tracking-widest text-[#00d2ff] font-medium uppercase mb-1">{img.category}</span>
                    <p className="text-white text-sm font-light tracking-wide">הגדלת תמונה מקרוב ←</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* פוטר */}
        <footer className="border-t border-neutral-900 pt-12 pb-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-neutral-500 gap-4">
          <p>© 2026 כל הזכויות שמורות לרחלי חלופסקי</p>
          <div className="flex gap-8 font-light">
            <a href="https://wa.me/972500000000" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">WHATSAPP</a>
            <a href="mailto:info@example.com" className="hover:text-white transition-colors duration-300">EMAIL</a>
          </div>
        </footer>
      </div>

    </main>
  );
}