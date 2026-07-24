"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Fredoka } from "next/font/google"; 

const fredoka = Fredoka({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const initialImages = [
  // משפחה
  { id: 1, src: "/משפחה/1.jpg", category: "משפחה" },
  { id: 2, src: "/משפחה/לאתר 2.jpg", category: "משפחה" },
  { id: 3, src: "/משפחה/גולדשטוף 2.jpg", category: "משפחה" },
  { id: 4, src: "/משפחה/חיים (1).jpg", category: "משפחה" },
  { id: 5, src: "/משפחה/לאתר3 copy.jpg", category: "משפחה" },
  { id: 6, src: "/משפחה/לאתר4 copy.jpg", category: "משפחה" },
  { id: 7, src: "/משפחה/לאתר5 copy.jpg", category: "משפחה" },
  { id: 8, src: "/משפחה/לאתר7 copy.jpg", category: "משפחה" },
  { id: 9, src: "/משפחה/לתמר.jpg", category: "משפחה" },
  { id: 10, src: "/משפחה/לתמר1.jpg", category: "משפחה" },
  { id: 11, src: "/משפחה/ניסןי copy.jpg", category: "משפחה" },
  { id: 12, src: "/משפחה/קולדצקי ראשון.jpg", category: "משפחה" },
  { id: 13, src: "/משפחה/קולדצקי10 copy.jpg", category: "משפחה" },
  { id: 14, src: "/משפחה/קולדצקי12222.jpg", category: "משפחה" },
  { id: 15, src: "/משפחה/קולדצקי222 עם ביצה.jpg", category: "משפחה" },
  { id: 16, src: "/משפחה/שלמה   עע חתוך טוב copy.jpg", category: "משפחה" },
  { id: 17, src: "/משפחה/שני ותמר שני.jpg", category: "משפחה" },
  { id: 18, src: "/משפחה/אחיות copy.jpg", category: "משפחה" },
  { id: 19, src: "/משפחה/אחים copy.jpg", category: "משפחה" },
  { id: 20, src: "/משפחה/ארי 2 ביצהה.jpg", category: "משפחה" },
  { id: 21, src: "/משפחה/בריקמן לא מסוים copy חמדםשע copy (1).jpg", category: "משפחה" },
  { id: 22, src: "/משפחה/בריקמן לא מסוים copy חמדםשע copy.jpg", category: "משפחה" },
  { id: 23, src: "/משפחה/בריקמן משפחתי copy.jpg", category: "משפחה" },
  
  // ניו בורן
  { id: 24, src: "/ניו בורן/0P7A5441-Edit.jpg", category: "ניו בורן" },
  { id: 25, src: "/ניו בורן/12311-Edit.jpg", category: "ניו בורן" },
  { id: 26, src: "/ניו בורן/12315-Edit (1).jpg", category: "ניו בורן" },
  
  // חלאקה
  { id: 27, src: "/חלאקה/קולדצקי ראשון.jpg", category: "חלאקה" },
  { id: 28, src: "/חלאקה/קולדצקי10 copy.jpg", category: "חלאקה" },
  { id: 29, src: "/חלאקה/קולדצקי222 עם ביצה.jpg", category: "חלאקה" },
  { id: 30, src: "/חלאקה/בריקמן סקיט נוסף copy.jpg", category: "חלאקה" },
  { id: 31, src: "/חלאקה/בריקמן תפוזים copy.jpg", category: "חלאקה" },
  { id: 32, src: "/חלאקה/בריקמן.jpg", category: "חלאקה" },
  
  // סמאש קייק
  { id: 33, src: "/סמאש קייק/לאתר6 copy.jpg", category: "סמאש קייק" },
  { id: 34, src: "/סמאש קייק/לאתר8 copy.jpg", category: "סמאש קייק" },
  { id: 35, src: "/סמאש קייק/לאתר9 copy.jpg", category: "סמאש קייק" },
  { id: 36, src: "/סמאש קייק/לאתר 10.jpg", category: "סמאש קייק" },
];

const categoryNames: Record<string, string> = {
  "משפחה": "משפחה",
  "ניו בורן": "ניו בורן",
  "חלאקה": "חלאקה",
  "סמאש קייק": "סמאש קייק",
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// קומפוננטת כרטיס התמונה - טעינה מקטן לגדול ללא רווחים מיותרים
const LazyImageCard = ({ img, index, onClick }: any) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onClick}
      className="relative overflow-hidden bg-transparent group cursor-pointer break-inside-avoid w-full mb-1 sm:mb-2 rounded-none"
    >
      <div className="relative w-full flex items-center justify-center">
        <Image
          src={img.src}
          alt={img.category}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          onLoad={() => setIsLoaded(true)}
          className={`transition-transform duration-700 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* שכבת Hover מודרנית עם אייקון התרחבות */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params);
  const decodedCategory = decodeURIComponent(category);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lightboxDirection, setLightboxDirection] = useState(0);
  
  const filteredImages = initialImages.filter(img => img.category === decodedCategory);

  useEffect(() => {
    if (selectedIndex !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null) {
      setLightboxDirection(1);
      setSelectedIndex((selectedIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedIndex !== null) {
      setLightboxDirection(-1);
      setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <main className={`min-h-screen w-full bg-[#f8f8f8] text-[#331a34] antialiased m-0 p-0 block relative ${fredoka.className}`} dir="rtl">
      
      {/* Header אלגנטי */}
      <div className="relative w-full pt-32 pb-16 flex flex-col items-center justify-center bg-gradient-to-b from-[#f0e6ef] to-[#f8f8f8]">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-widest text-[#331a34] drop-shadow-sm text-center"
        >
          {categoryNames[decodedCategory] || decodedCategory}
        </motion.h1>

        {/* פירורי לחם (Breadcrumbs) מעוצבים כגלולה (Pill) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 px-6 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm text-lg font-light text-[#8d6a87]"
        >
          <Link href="/gallery" className="hover:text-[#ff6fc6] transition-colors">
            גלריה
          </Link>
          <span className="text-pink-300">/</span>
          <span className="text-[#331a34] font-medium">{categoryNames[decodedCategory] || decodedCategory}</span>
        </motion.div>
      </div>

      <div className="w-full px-4 md:px-8 pb-24 relative z-30 flex flex-col items-center">
        {/* Lightbox מלוטש */}
        <AnimatePresence initial={false} custom={lightboxDirection}>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
              onClick={() => setSelectedIndex(null)}
            >
              <div
                className="relative w-full max-w-7xl h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* כפתור סגירה */}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
                  className="absolute top-4 right-4 md:top-8 md:right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-105"
                  aria-label="Close lightbox"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* מונה תמונות */}
                <div className="absolute inset-x-0 top-6 md:top-10 z-40 flex items-center justify-center pointer-events-none">
                  <span className="text-sm font-light tracking-widest text-white/70 bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-md">
                    {selectedIndex + 1} מתוך {filteredImages.length}
                  </span>
                </div>

                {/* התמונה המוגדלת - ללא קצוות עגולים */}
                <div className="relative mx-auto w-full h-[80vh] flex items-center justify-center overflow-hidden">
                  <AnimatePresence initial={false} custom={lightboxDirection}>
                    <motion.img
                      key={selectedIndex}
                      src={filteredImages[selectedIndex].src}
                      alt={filteredImages[selectedIndex].category}
                      custom={lightboxDirection}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring" as const, stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = swipePower(offset.x, velocity.x);
                        if (swipe < -swipeConfidenceThreshold) {
                          handleNext();
                        } else if (swipe > swipeConfidenceThreshold) {
                          handlePrev();
                        }
                      }}
                      className="absolute max-w-full max-h-[80vh] object-contain cursor-grab active:cursor-grabbing drop-shadow-2xl rounded-none"
                    />
                  </AnimatePresence>
                </div>

                {/* כפתורי ניווט חצים */}
                <button
                  onClick={handleNext}
                  className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110"
                  aria-label="Next image"
                >
                  <svg className="w-8 h-8 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                <button
                  onClick={handlePrev}
                  className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110"
                  aria-label="Previous image"
                >
                  <svg className="w-8 h-8 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* גריד התמונות (Masonry) - ללא רווחים כלל */}
        <section className="w-full max-w-7xl mx-auto relative">
          <div className="columns-1 sm:columns-2 md:columns-3 gap-1 sm:gap-1 w-full">
            {filteredImages.map((img, index) => (
              <LazyImageCard 
                key={img.id}
                img={img}
                index={index}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}