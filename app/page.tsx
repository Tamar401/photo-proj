"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. תמונות שיתחלפו לאט ובעדינות ברקע של כותרת השם
const heroImages = [
  "/4W3A5030-copy-1-scaled.jpg",
  "/4W3A1878-copy.jpg",
  "/4W3A0973-copy-scaled.jpg",
];

// 2. גלריית העבודות המלאה למטה
const initialImages = [
  { id: 1, src: "/4W3A5030-copy-1-scaled.jpg", category: "סטודיו" },
  { id: 2, src: "/4W3A2230-copy.jpg", category: "סטודיו" },
  { id: 3, src: "/4W3A1878-copy.jpg", category: "חוץ" },
  { id: 4, src: "/4W3A1247-copy-2-scaled.jpg", category: "חוץ" },
  { id: 5, src: "/4W3A0973-copy-scaled.jpg", category: "אירועים" },
  { id: 6, src: "/4W3A0486-copy-2-scaled.jpg", category: "אירועים" },
];

const categories = ["הכל", "סטודיו", "חוץ", "אירועים"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // מניעת גלילה כשהלייטבוקס פתוח
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex]);

  // מנגנון ניווט חצים במקלדת
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const isRight = e.key === "ArrowRight";
        setSelectedIndex((prev) => {
          if (prev === null) return null;
          if (isRight) {
            return (prev - 1 + filteredImages.length) % filteredImages.length; 
          } else {
            return (prev + 1) % filteredImages.length; 
          }
        });
      }
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

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

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredImages.length);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#0a0a0a] text-[#f5f5f5] antialiased m-0 p-0 block relative">
      
      {/* מודל לייטבוקס */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="flex justify-center items-center cursor-zoom-out"
            style={{ 
              position: "fixed", 
              top: 0, left: 0, right: 0, bottom: 0, 
              width: "100vw", height: "100vh",
              backgroundColor: "rgba(15, 15, 15, 0.92)", 
              backdropFilter: "blur(12px)", 
              WebkitBackdropFilter: "blur(12px)", 
              zIndex: 99999 
            }}
          >
            {/* התמונה - מתרנדרת ראשונה כדי שהכפתורים יהיו מעליה */}
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={filteredImages[selectedIndex].src}
                alt="View Enlarged"
                className="object-contain rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] border border-white/10 pointer-events-none"
                style={{ 
                  maxWidth: "70vw", 
                  maxHeight: "80vh", 
                  width: "auto",
                  height: "auto",
                  zIndex: 100000 
                }}
              />
            </AnimatePresence>

            {/* חץ שמאלה - הודגש עם inline style ו-zIndex מטורף כדי שלא יעלם */}
            <button 
              onClick={handlePrev}
              className="text-white/80 hover:text-white bg-black/60 hover:bg-black/90 transition-all duration-300 p-4 rounded-full border border-white/20 cursor-pointer"
              style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 999999 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* חץ ימינה - הודגש עם inline style */}
            <button 
              onClick={handleNext}
              className="text-white/80 hover:text-white bg-black/60 hover:bg-black/90 transition-all duration-300 p-4 rounded-full border border-white/20 cursor-pointer"
              style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 999999 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* כפתור סגירה - הודגש עם inline style */}
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              className="text-[#00d2ff] hover:text-[#00ff87] text-sm tracking-widest cursor-pointer transition-colors font-light bg-black/60 px-5 py-2.5 rounded-full border border-white/20"
              style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 999999 }}
            >
              ✕ CLOSE
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header 
        style={{ height: "78vh" }} 
        className="relative flex flex-col justify-center items-center text-center w-full overflow-hidden px-6 m-0 z-10"
      >
        <div className="absolute inset-0 z-0 bg-[#0a0a0a] w-full h-full">
          <AnimatePresence>
            <motion.img
              key={currentHeroIndex}
              src={heroImages[currentHeroIndex]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
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
            className="h-[2px] bg-gradient-to-r from-[#00d2ff] via-[#00ff87] to-[#ff9f00] mb-6 mx-auto"
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
      <div className="w-full px-6 md:px-24 pt-16 pb-12 relative z-30 bg-[#0a0a0a] flex flex-col items-center">
        
        {/* תפריט קטגוריות */}
        <nav className="flex justify-center items-center gap-8 mb-16 text-sm tracking-wider font-light w-full max-w-5xl mx-auto">
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

        {/* גריד גלריית התמונות */}
        <section className="mb-32 w-full max-w-5xl mx-auto">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, index) => (
                <motion.div
                  layout
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedIndex(index)} 
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
        <footer className="border-t border-neutral-900 pt-12 pb-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-neutral-500 gap-4 w-full max-w-5xl mx-auto">
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