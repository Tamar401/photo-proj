"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. תמונות שיתחלפו לאט ובעדינות ברקע של כותרת השם
const heroImages = [
  "/ארי 2 ביצהה.jpg",
  "/חיים (1).jpg",
  "/לתמר.jpg",
  "/קולדצקי10 copy.jpg",
  "/קולדצקי ראשון.jpg",
];

// 2. גלריית העבודות המלאה למטה
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

  const testimonials = [
    {
      name: 'הילה וינשטיין',
      title: 'אמא מרוצה',
      quote: 'רחלי תפסה את הרגעים הכי טבעיים של הילדים שלנו בצורה כל כך עדינה ויפה. התוצאות עלו על כל הציפיות.',
    },
    {
      name: 'אביב לוי',
      title: 'זוג צעיר',
      quote: 'הצילומים היו מקצועיים וחוויתיים. רחלי הובילה אותנו בשקט ובקסם, והצילום יצא כמו מתוך מגזין.',
    },
    {
      name: 'איריס רוזן',
      title: 'משפחה',
      quote: 'התמונות נראות יוקרתיות אך מלאות חמימות. התחושה במהלך הצילומים הייתה רגועה ומלאת אמון.',
    },
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialNext = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const testimonialPrev = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

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
    <main className="min-h-screen w-full bg-[#f8f8f8] text-[#331a34] antialiased m-0 p-0 block relative pt-16">
      
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
              backgroundColor: "rgba(255, 245, 251, 0.96)", 
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
                className="object-contain rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(203,120,154,0.3)] border border-pink-200/50 pointer-events-none bg-white"
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
              className="text-[#67405d] hover:text-[#331a34] bg-white/90 hover:bg-white transition-all duration-300 p-4 rounded-full border border-pink-200/60 cursor-pointer"
              style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 999999 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* חץ ימינה - הודגש עם inline style */}
            <button 
              onClick={handleNext}
              className="text-[#67405d] hover:text-[#331a34] bg-white/90 hover:bg-white transition-all duration-300 p-4 rounded-full border border-pink-200/60 cursor-pointer"
              style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 999999 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* כפתור סגירה - הודגש עם inline style */}
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              className="text-[#c94a8c] hover:text-[#a9296d] text-sm tracking-widest cursor-pointer transition-colors font-light bg-white/90 px-5 py-2.5 rounded-full border border-pink-200/70"
              style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 999999 }}
            >
              ✕ CLOSE
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header 
        style={{ height: "100vh", marginTop: "-4rem" }} 
        className="relative flex flex-col justify-center items-center text-center w-full overflow-hidden px-6 m-0 z-10"
      >
        <div className="absolute inset-0 z-0 bg-[#f8f8f8] w-full h-full">
          <AnimatePresence>
            <motion.img
                key={currentHeroIndex}
                src={heroImages[currentHeroIndex]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="w-full h-full object-cover object-center absolute inset-0"
                style={{ width: "100%", height: "100%" }}
                alt="Background Content"
              />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8f8] via-transparent to-transparent z-10" />
        </div>

        <div className="relative z-20 pointer-events-none">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute text-[2rem] md:text-[8rem] font-light text-[#ffb4d8] left-0 right-0 top-1/2 -translate-y-1/2 tracking-widest uppercase pointer-events-none text-left whitespace-nowrap"
            style={{ zIndex: 1, transform: 'translateX(-85%)' }}
          >
            RACHELY CHALOFSKI
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative z-20 text-5xl md:text-7xl font-light text-white tracking-widest"
          >
            רחלי חלופסקי
          </motion.h1>
        </div>
      </header>

      <section className="w-full px-6 md:px-24 py-20 relative z-30 bg-[#f8f8f8] text-[#331a34]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: testimonial text area */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="h-96 flex items-center">
                  <div className="max-w-2xl">
                    <p className="italic text-[#5d3a59] text-lg leading-8">{testimonials[testimonialIndex].quote}</p>
                    <p className="mt-6 font-semibold text-[#331a34]">{testimonials[testimonialIndex].name}</p>
                    <p className="text-sm text-[#d47aa5]">{testimonials[testimonialIndex].title}</p>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <button onClick={testimonialPrev} className="px-4 py-2 bg-white/90 border border-pink-100 text-[#331a34] rounded-md shadow-sm">← קודם</button>
                  <button onClick={testimonialNext} className="px-4 py-2 bg-[#ffb4d8] text-white rounded-md shadow-sm">הבא →</button>
                </div>
              </div>
            </div>

            {/* Right: big pink panel */}
            <div className="order-1 lg:order-2 flex justify-end">
              <div className="relative w-full max-w-md h-96 bg-[#f4c9cc] rounded-md flex items-center justify-center">
                <div className="text-6xl font-extrabold text-white text-right leading-none pr-8">סיפורי<br/>לקוחות</div>

                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTestimonialIndex(idx)}
                      className={`w-3 h-3 rounded-full ${idx === testimonialIndex ? 'bg-[#331a34]' : 'bg-[#12363f]/60'}`}
                      aria-label={`הצג חוות דעת ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery removed from homepage — moved to /gallery */}
      <div className="w-full px-6 md:px-24 pt-8 pb-12 relative z-30 bg-[#f8f8f8] flex flex-col items-center">
        <p className="max-w-5xl mx-auto text-center text-[#7e5b7b] py-12">הגלריה הועברה לעמוד נפרד. יש ללחוץ על "גלריה" בכותרת כדי לעבור לעמוד המלא.</p>

        <footer className="border-t border-pink-100 pt-12 pb-8 flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-[#7e5b7b] gap-4 w-full max-w-5xl mx-auto">
          <p>© 2026 כל הזכויות שמורות לרחלי חלופסקי</p>
          <div className="flex gap-8 font-light">
            <a href="https://wa.me/972500000000" target="_blank" rel="noopener noreferrer" className="hover:text-[#c24f8d] transition-colors duration-300">WHATSAPP</a>
            <a href="mailto:info@example.com" className="hover:text-[#c24f8d] transition-colors duration-300">EMAIL</a>
          </div>
        </footer>
      </div>

    </main>
  );
}