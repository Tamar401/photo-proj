"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Testimonial from "../components/Testimonial";
import FloatingCTA from "../components/FloatingCTA";
import SiteHero from "../components/SiteHero";

// גלריית העבודות המלאה למטה
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
  const [selectedCategory, setSelectedCategory] = useState("הכל");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Open gallery if main URL contains #gallery
  useEffect(() => {
    const openGallery = () => {
      if (window.location.hash === "#gallery") {
        setGalleryOpen(true);
      }
    };
    openGallery();
    window.addEventListener("hashchange", openGallery);
    return () => window.removeEventListener("hashchange", openGallery);
  }, []);

  // מניעת גלילה כשהלייטבוקס פתוח
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex]);

  // גלריה מסוננתי לשימוש בניווט ולייטבוקס
  const filteredImages = selectedCategory === "הכל"
    ? initialImages
    : initialImages.filter(img => img.category === selectedCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const isRight = e.key === "ArrowRight";
        setSelectedIndex((prev) => {
          if (prev === null) return null;
          if (isRight) {
            return (prev + 1) % filteredImages.length;
          } else {
            return (prev - 1 + filteredImages.length) % filteredImages.length;
          }
        });
      }
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredImages.length]);

  // Gesture refs & state
  const prevBtnRef = useRef<HTMLButtonElement | null>(null);
  const nextBtnRef = useRef<HTMLButtonElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // reset imageLoaded when opening a new lightbox image
  useEffect(() => {
    if (selectedIndex !== null) setImageLoaded(false);
  }, [selectedIndex]);

  // focus trap / focus management for lightbox
  useEffect(() => {
    if (selectedIndex === null) return;
    // focus the first available control when lightbox opens
    const firstEl = prevBtnRef.current || nextBtnRef.current;
    firstEl?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      e.preventDefault();
      const nodes = [prevBtnRef.current, nextBtnRef.current].filter(Boolean) as HTMLElement[];
      if (nodes.length === 0) return;
      const idx = nodes.indexOf(document.activeElement as HTMLElement);
      const nextIdx = e.shiftKey ? (idx - 1 + nodes.length) % nodes.length : (idx + 1) % nodes.length;
      nodes[nextIdx].focus();
    };
    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [selectedIndex]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => prev === null ? null : (prev + 1) % filteredImages.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => prev === null ? null : (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <main className="min-h-screen w-full bg-white text-pink-600 antialiased m-0 p-0 block relative">
      {/* מודל לייטבוקס */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            role="dialog"
            aria-modal={true}
            aria-label="Image preview"
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
            {/* Lightbox header: index + category */}
            <div style={{ position: 'absolute', top: '1rem', left: '50%', transform: 'translateX(-50%)', zIndex: 999999 }} className="flex items-center gap-3 text-sm text-neutral-300">
              <span>{selectedIndex !== null ? selectedIndex + 1 : ''} / {filteredImages.length}</span>
                <span className="text-xs text-pink-300">• {selectedIndex !== null ? filteredImages[selectedIndex].category : ''}</span>
            </div>

            {/* התמונה - מתרנדרת ראשונה כדי שהכפתורים יהיו מעליה */}
            <div onTouchStart={(e) => { touchStartX.current = e.touches?.[0]?.clientX ?? null; }} onTouchEnd={(e) => {
                const start = touchStartX.current ?? 0;
                const end = e.changedTouches?.[0]?.clientX ?? 0;
                const dx = end - start;
                if (dx > 40) { setSelectedIndex((prev) => prev === null ? null : (prev - 1 + filteredImages.length) % filteredImages.length); }
                else if (dx < -40) { setSelectedIndex((prev) => prev === null ? null : (prev + 1) % filteredImages.length); }
              }} style={{ position: 'relative' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  src={filteredImages[selectedIndex].src}
                  alt={filteredImages[selectedIndex].category}
                  onLoad={() => setImageLoaded(true)}
                  className="object-contain rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] border border-pink-50 pointer-events-auto"
                  style={{ 
                    maxWidth: "70vw", 
                    maxHeight: "80vh", 
                    width: "auto",
                    height: "auto",
                    zIndex: 100000 
                  }}
                />
                {!imageLoaded && (
                  <div style={{ position: 'absolute', inset: 0, zIndex: 100001 }} className="flex items-center justify-center">
                    <div className="w-12 h-12 border-2 border-pink-100 border-t-pink-300 rounded-full animate-spin" />
                  </div>
                )}
              </AnimatePresence>

              {/* Thumbnail strip */}
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: '2.5rem', zIndex: 100002 }} className="flex items-center justify-center">
                <div className="bg-pink-50 backdrop-blur-sm rounded-full px-3 py-2 flex gap-2">
                  {filteredImages.map((t, i) => (
                    <button key={t.id} onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }} className={`w-12 h-12 rounded-md overflow-hidden border ${i === selectedIndex ? 'border-pink-200' : 'border-pink-50'}`}>
                      <img src={t.src} alt={t.category} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* חץ שמאלה - הודגש עם inline style ו-zIndex מטורף כדי שלא יעלם */}
            <button 
              ref={prevBtnRef}
              aria-label="Previous image"
              onClick={handlePrev}
              className="text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 transition-all duration-300 p-4 rounded-full border border-pink-50 cursor-pointer"
              style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 999999 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* חץ ימינה - הודגש עם inline style */}
            <button 
              ref={nextBtnRef}
              aria-label="Next image"
              onClick={handleNext}
              className="text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 transition-all duration-300 p-4 rounded-full border border-pink-50 cursor-pointer"
              style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 999999 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* download & close buttons removed per design request */}
          </motion.div>
        )}
      </AnimatePresence>

      <SiteHero title="RACHELY CHALOFSKI" showCamera showBackground />

      {galleryOpen && (
        <div id="gallery" data-gallery aria-hidden={selectedIndex !== null} className="w-full px-6 md:px-24 py-16 relative z-30 bg-white flex flex-col items-center border-t border-pink-100">
          <div className="w-full max-w-5xl mx-auto mb-10">
            <p className="text-sm text-pink-300 mb-5">בחרו איזה סוג גלריה תרצו לראות:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-2xl border px-4 py-3 text-center transition ${selectedCategory === category ? 'border-pink-200 text-pink-600 bg-pink-50' : 'border-pink-50 text-pink-300 hover:border-pink-200 hover:text-pink-600'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* גריד גלריית התמונות */}
          <section className="mb-32 w-full max-w-5xl mx-auto">
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } }
              }}
            >
              <AnimatePresence mode="popLayout">
              {filteredImages.map((img, index) => (
                <motion.div
                  layout
                  key={img.id}
                  variants={{
                    hidden: { opacity: 0, y: 12, scale: 0.98 },
                    show: { opacity: 1, y: 0, scale: 1 }
                  }}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  // softer, more elegant hover
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => setSelectedIndex(index)} 
                  className="relative overflow-hidden rounded-md bg-neutral-950 group cursor-pointer shadow-2xl flex justify-center"
                >
                  <img 
                    src={img.src} 
                    alt={`רחלי חלופסקי צלמת - ${img.category}`}
                    className="block w-auto max-w-full h-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 pointer-events-none">
                    <span className="text-xs tracking-widest text-[#00d2ff] font-medium uppercase mb-1">{img.category}</span>
                    <p className="text-pink-600 text-sm font-light tracking-wide">הגדלת תמונה מקרוב ←</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>
      )}

      {/* פוטר */}
      {/* Testimonials */}
      <section className="mb-12 w-full max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <Testimonial quote="Rachely captured our day with such calm and precision — the photos feel timeless." author="M & A" />
          <Testimonial quote="We felt completely at ease; the result exceeded our expectations." author="D. Cohen" />
          <Testimonial quote="An incredible blend of editorial and emotion. Highly recommended." author="Brand Studio" />
        </section>

        {/* פוטר */}
        <footer className="border-t border-pink-100 pt-12 pb-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-pink-300 gap-4 w-full max-w-5xl mx-auto">
          <p>© 2026 כל הזכויות שמורות לרחלי חלופסקי</p>
          <div className="flex gap-8 font-light">
            <a href="mailto:r0527149555@gmail.com" className="hover:text-pink-700 transition-colors duration-300">אימייל</a>
        
          </div>
        </footer>
        <FloatingCTA />

    </main>
  );
}