"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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

// קומפוננטת כרטיס התמונה - מעודכנת לאנימציה רכה ואיטית
const LazyImageCard = ({ img, index, onClick }: any) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      // מתחיל מ-0.5 כדי שהמרחק שהתמונה עוברת יהיה קטן יותר והתנועה תרגיש רכה
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1, margin: "50px" }}
      // משך זמן של שניה וחצי, תנועה חלקה בשני הקצוות, והשהיה קצת יותר ארוכה
      transition={{ duration: 1.2, ease: "easeInOut", delay: (index % 3) * 0.1 }}
      onClick={onClick}
      className="relative overflow-hidden bg-[#eaeaea] group cursor-pointer break-inside-avoid w-full mb-2 min-h-[250px]"
    >
      <Image
        src={img.src}
        alt={img.category}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ width: '100%', height: 'auto' }}
        onLoad={() => setIsLoaded(true)}
        // האטתי גם את הגדילה במעבר עכבר ל-1000 (שנייה שלמה) כדי שגם זה ירגיש חלומי
        className={`transition-all duration-1000 ease-out group-hover:brightness-75 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
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
    <main className="min-h-screen w-full bg-[#f3eae3] text-[#331a34] antialiased m-0 p-0 block relative pt-24">
      <div className="w-full px-4 md:px-12 pt-8 pb-12 relative z-30 bg-[#f5ede6] flex flex-col items-center">

        <AnimatePresence initial={false} custom={lightboxDirection}>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.9)] p-4"
              onClick={() => setSelectedIndex(null)}
            >
              <div
                className="relative w-full max-w-[95vw] max-h-[95vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-transparent shadow-none overflow-hidden w-full h-full">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
                    className="absolute top-8 right-8 z-50 text-white/70 hover:text-white text-3xl cursor-pointer transition-all hover:scale-110"
                    aria-label="Close lightbox"
                  >
                    ✕
                  </button>

                  <div className="absolute inset-x-0 top-8 z-40 flex items-center justify-center px-4 pointer-events-none">
                    <span className="text-sm font-light tracking-widest text-white/60">
                      {selectedIndex + 1} / {filteredImages.length}
                    </span>
                  </div>

                  <div className="relative mx-auto w-full h-[85vh] flex items-center justify-center overflow-hidden">
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
                          x: { type: "spring", stiffness: 300, damping: 30 },
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
                        className="absolute max-w-full max-h-[calc(85vh-80px)] object-contain cursor-grab active:cursor-grabbing shadow-2xl"
                      />
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={handlePrev}
                    className="absolute left-4 md:left-12 top-1/2 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all hover:scale-110"
                    aria-label="Previous image"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-4 md:right-12 top-1/2 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md transition-all hover:scale-110"
                    aria-label="Next image"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-widest">{categoryNames[decodedCategory] || decodedCategory}</h1>

        {/* Breadcrumb Navigation */}
        <div className="w-full flex items-center justify-end px-4 md:px-12 mb-12">
          <div className="flex items-center gap-3 text-lg md:text-xl font-light text-[#ffb4d8]">
            <span className="text-[black]">{categoryNames[decodedCategory] || decodedCategory}</span>
            <span>/</span>
            <Link 
              href="/gallery" 
              className="hover:text-[#ff9ecb] transition-colors"
            >
              גלריה
            </Link>
          </div>
        </div>

        <section className="mb-16 w-full max-w-[1600px] mx-auto relative">
          {/* הוגדר ל-3 עמודות במקסימום כמו שביקשת */}
          <div className="columns-1 sm:columns-2 md:columns-3 gap-1 w-full">
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