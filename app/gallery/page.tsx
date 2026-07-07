"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const initialImages = [
  { id: 1, src: "/ארי 2 ביצהה.jpg", category: "סטודיו" },
  { id: 2, src: "/חיים (1).jpg", category: "סטודיו" },
  { id: 3, src: "/לאתר6 copy.jpg", category: "חוץ" },
  { id: 4, src: "/לתמר.jpg", category: "חוץ" },
  { id: 5, src: "/לתמר1.jpg", category: "אירועים" },
  { id: 6, src: "/ניסןי copy.jpg", category: "סטודיו" },
  { id: 7, src: "/קולדצקי ראשון.jpg", category: "אירועים" },
  { id: 8, src: "/קולדצקי10 copy.jpg", category: "אירועים" },
  { id: 9, src: "/קולדצקי12222.jpg", category: "אירועים" },
  { id: 10, src: "/קולדצקי222 עם ביצה.jpg", category: "אירועים" },
];

const categories = ["הכל", "סטודיו", "חוץ", "אירועים"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lightboxDirection, setLightboxDirection] = useState(0);

  useEffect(() => {
    if (selectedIndex !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex]);

  const filteredImages = activeCategory === "הכל"
    ? initialImages
    : initialImages.filter(img => img.category === activeCategory);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setLightboxDirection(1);
      setSelectedIndex((selectedIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setLightboxDirection(-1);
      setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const goNext = () => {
    if (selectedIndex !== null) {
      setLightboxDirection(1);
      setSelectedIndex((selectedIndex + 1) % filteredImages.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setLightboxDirection(-1);
      setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const lightboxVariants = {
    enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 20 : -20 }),
    center: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -20 : 20 }),
  };

  return (
    <main className="min-h-screen w-full bg-[#f8f8f8] text-[#331a34] antialiased m-0 p-0 block relative pt-24">
      <div className="w-full px-6 md:px-24 pt-8 pb-12 relative z-30 bg-[#fff4fb] flex flex-col items-center">

        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(245,245,245,0.98)] p-4"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative w-full max-w-[85vw] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative rounded-[32px] bg-transparent shadow-none overflow-hidden">

                  <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-center px-4 py-4">
                    <span className="text-[11px] uppercase tracking-[0.32em] text-[#331a34]/70">
                      {selectedIndex + 1} / {filteredImages.length}
                    </span>
                  </div>


                  <div className="relative mx-auto w-full max-w-full" style={{ maxHeight: "calc(80vh - 100px)" }}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={selectedIndex}
                        custom={lightboxDirection}
                        variants={lightboxVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        src={filteredImages[selectedIndex].src}
                        alt={filteredImages[selectedIndex].category}
                        className="mx-auto max-w-full max-h-[calc(80vh-100px)] object-contain"
                      />
                    </AnimatePresence>

                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] backdrop-blur-sm text-[#331a34] transition duration-200 ease-in-out hover:scale-110 hover:bg-[rgba(255,255,255,0.18)] border border-[#ffb4d8]"
                      aria-label="Previous image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>

                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] backdrop-blur-sm text-[#331a34] transition duration-200 ease-in-out hover:scale-110 hover:bg-[rgba(255,255,255,0.18)] border border-[#ffb4d8]"
                      aria-label="Next image"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="text-3xl md:text-4xl font-light mb-8">גלריה</h1>

        <nav className="flex justify-center items-center gap-8 mb-12 text-sm tracking-wider font-light w-full max-w-5xl mx-auto text-[#331a34]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="relative py-2 cursor-pointer transition-colors duration-300 text-[#7e5b7b] hover:text-[#331a34]"
            >
              <span className={activeCategory === category ? "text-[#331a34] font-normal" : ""}>
                {category}
              </span>
                  {activeCategory === category && (
                    <motion.div 
                      layoutId="underline" 
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-gradient-to-r from-[#ffb4d8] via-[#ffd6ed] to-[#fff4fb]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
            </button>
          ))}
        </nav>

        <section className="mb-32 w-full max-w-5xl mx-auto">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
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
                  className="relative overflow-hidden rounded-md bg-white group cursor-pointer shadow-[0_35px_70px_-30px_rgba(215,127,175,0.2)]"
                >
                  <img src={img.src} alt={img.category} className="w-full h-full object-contain transition-transform duration-1000 ease-out group-hover:scale-105" loading="lazy" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <footer className="border-t border-pink-100 pt-12 pb-8 w-full max-w-5xl mx-auto text-xs text-[#7e5b7b]">
          © 2026 כל הזכויות שמורות לרחלי חלופסקי
        </footer>
      </div>
    </main>
  );
}
