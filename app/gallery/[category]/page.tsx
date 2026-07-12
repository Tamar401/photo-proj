"use client";

import { useState, useEffect, use, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const initialImages = [
  { id: 1, src: "/משפחה/1.jpg", category: "משפחה" },
  { id: 2, src: "/משפחה/ארי 2 ביצהה.jpg", category: "משפחה" },
  { id: 3, src: "/משפחה/גולדשטוף 2.jpg", category: "משפחה" },
  { id: 4, src: "/משפחה/חיים (1).jpg", category: "משפחה" },
  { id: 5, src: "/משפחה/לאתר 2.jpg", category: "משפחה" },
  { id: 6, src: "/משפחה/לאתר3 copy.jpg", category: "משפחה" },
  { id: 7, src: "/משפחה/לאתר4 copy.jpg", category: "משפחה" },
  { id: 8, src: "/משפחה/לאתר5 copy.jpg", category: "משפחה" },
  { id: 9, src: "/משפחה/לאתר7 copy.jpg", category: "משפחה" },
  { id: 10, src: "/משפחה/לתמר.jpg", category: "משפחה" },
  { id: 11, src: "/משפחה/לתמר1.jpg", category: "משפחה" },
  { id: 12, src: "/משפחה/ניסןי copy.jpg", category: "משפחה" },
  { id: 13, src: "/משפחה/קולדצקי ראשון.jpg", category: "משפחה" },
  { id: 14, src: "/משפחה/קולדצקי10 copy.jpg", category: "משפחה" },
  { id: 15, src: "/משפחה/קולדצקי12222.jpg", category: "משפחה" },
  { id: 16, src: "/משפחה/קולדצקי222 עם ביצה.jpg", category: "משפחה" },
  { id: 17, src: "/משפחה/שלמה   עע חתוך טוב copy.jpg", category: "משפחה" },
  { id: 18, src: "/משפחה/שני ותמר שני.jpg", category: "משפחה" },
  { id: 19, src: "/ניו בורן/0P7A5441-Edit.jpg", category: "ניו בורן" },
  { id: 20, src: "/ניו בורן/12311-Edit.jpg", category: "ניו בורן" },
  { id: 21, src: "/ניו בורן/12315-Edit (1).jpg", category: "ניו בורן" },
  { id: 22, src: "/סמאש קייק/לאתר6 copy.jpg", category: "סמאש קייק" },
  { id: 23, src: "/סמאש קייק/לאתר8 copy.jpg", category: "סמאש קייק" },
  { id: 24, src: "/סמאש קייק/לאתר9 copy.jpg", category: "סמאש קייק" },
  { id: 25, src: "/סמאש קייק/לאתר 10.jpg", category: "סמאש קייק" },
  { id: 26, src: "/סמאש קייק/לאתר 10.jpg", category: "סמאש קייק" },
  { id: 27, src: "/סמאש קייק/לאתר 10.jpg", category: "סמאש קייק" },
  { id: 28, src: "/סמאש קייק/לאתר 10.jpg", category: "סמאש קייק" },
  { id: 29, src: "/סמאש קייק/לאתר 10.jpg", category: "סמאש קייק" },
  { id: 30, src: "/סמאש קייק/לאתר 10.jpg", category: "סמאש קייק" },
  { id: 31, src: "/סמאש קייק/לאתר 10.jpg", category: "סמאש קייק" },
  { id: 32, src: "/סמאש קייק/לאתר 10.jpg", category: "סמאש קייק" },
];

const lightboxVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 20 : -20 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -20 : 20 }),
};

const categoryNames: Record<string, string> = {
  "משפחה": "משפחה",
  "ניו בורן": "ניו בורן",
  "סמאש קייק": "סמאש קייק",
};

// רכיב התמונה הוצא אל מחוץ לפונקציה הראשית כדי למנוע טעינה כפולה
const LazyImageCard = ({ img, index, onClick }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); 
      }
    }, { rootMargin: "200px" });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const cardTransition = { 
    duration: 1.0, 
    ease: "easeInOut",
    delay: (index % 6) * 0.08 
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={cardVariants}
      transition={cardTransition as any}
      exit="hidden"
      whileHover={isLoaded ? { y: -4 } : {}}
      onClick={onClick}
      className="relative overflow-hidden rounded-lg bg-[#f5f5f5] group cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 break-inside-avoid w-full mb-3"
    >
      {isVisible && (
        <Image
          src={img.src}
          alt={img.category}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ width: '100%', height: 'auto' }}
          onLoad={() => setIsLoaded(true)}
          className={`transition-transform duration-1000 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </motion.div>
  );
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const decodedCategory = decodeURIComponent(category);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lightboxDirection, setLightboxDirection] = useState(0);
  
  const [displayCount, setDisplayCount] = useState(9);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredImages = initialImages.filter(img => img.category === decodedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setDisplayCount((prev) => Math.min(prev + 6, filteredImages.length));
        }
      },
      { rootMargin: "400px" } 
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filteredImages.length]);

  useEffect(() => {
    if (selectedIndex !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex]);

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

        <Link href="/gallery" className="absolute top-8 left-6 text-[#7e5b7b] hover:text-[#331a34] transition-colors">
          ← חזרה לגלריה
        </Link>

        <h1 className="text-5xl md:text-6xl font-light mb-16 tracking-widest">{categoryNames[decodedCategory] || decodedCategory}</h1>

        <section className="mb-16 w-full max-w-7xl mx-auto px-2 relative">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-3 w-full">
            {filteredImages.slice(0, displayCount).map((img, index) => (
              <LazyImageCard 
                key={img.id}
                img={img}
                index={index}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
          
          {displayCount < filteredImages.length && (
            <div ref={loadMoreRef} className="w-full h-20 absolute bottom-0 translate-y-full" />
          )}
        </section>

      </div>
    </main>
  );
}