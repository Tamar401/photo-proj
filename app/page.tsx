"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// 1. תמונות שיתחלפו לאט ובעדינות ברקע של כותרת השם
const heroImages = [
  "/משפחה/לאתר 2.jpg",
  "/משפחה/חיים (1).jpg",
  "/משפחה/לתמר.jpg",
  "/סמאש קייק/לאתר6 copy.jpg",
  "/משפחה/קולדצקי ראשון.jpg",
];

// 2. גלריית העבודות המלאה למטה
const initialImages = [
  { id: 1, src: "/משפחה/1.jpg", category: "משפחה" },
  { id: 2, src: "/משפחה/לאתר 2.jpg", category: "משפחה" },
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
  { id: 19, src: "/סמאש קייק/לאתר6 copy.jpg", category: "סמאש קייק" },
  { id: 20, src: "/סמאש קייק/לאתר8 copy.jpg", category: "סמאש קייק" },
  { id: 21, src: "/סמאש קייק/לאתר9 copy.jpg", category: "סמאש קייק" },
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
      image: '/משפחה/לאתר 2.jpg',
    },
    {
      name: 'אביב לוי',
      title: 'זוג צעיר',
      quote: 'הצילומים היו מקצועיים וחוויתיים. רחלי הובילה אותנו בשקט ובקסם, והצילום יצא כמו מתוך מגזין.',
      image: '/משפחה/לתמר.jpg',
    },
    {
      name: 'איריס רוזן',
      title: 'משפחה',
      quote: 'התמונות נראות יוקרתיות אך מלאות חמימות. התחושה במהלך הצילומים הייתה רגועה ומלאת אמון.',
      image: '/משפחה/קולדצקי10 copy.jpg',
    },
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

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
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute text-[10rem] md:text-[14rem] font-light text-[#ffb4d8] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-widest uppercase pointer-events-none"
            style={{ zIndex: 1 }}
          >
            RACHELY
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative z-20 text-5xl md:text-7xl font-light text-white tracking-widest uppercase"
          >
            רחלי חלופסקי
          </motion.h1>
        </div>
      </header>



      <section className="w-full px-6 md:px-24 py-20 bg-[#f8f8f8] text-[#331a34]">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* "נעים להכיר!" */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-light text-[#ffb4d8] mb-8 tracking-wide"
          >
            !נעים להכיר
          </motion.h2>

          {/* "רחלי חלופסקי" - outline style */}
          <motion.h3
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-light mb-8 tracking-widest"
            style={{
              color: 'transparent',
              WebkitTextStroke: '2px #ffb4d8'
            } as any}
          >
            רחלי חלופסקי
          </motion.h3>

          {/* About text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl leading-8 text-[#5d3a59] max-w-3xl mx-auto"
          >
            אני צלמת המתמחה בתיעוד רגעים אמתיים ועמוקים. כל תצלום הוא סיפור של רגש וחום, 
            מלמד אותי להסתכל בעיניים הפתוחות ולתפוס את ההיפ האמתית של החיים.
            <br />
            <br />
            אני מאמינה שבכל רגע יש קסם - בחיוך של ילד,  בטבע שמסביב לנו. 
            העבודה שלי היא להשמר ולהישמור על הרגעים האלה לנצח.
          </motion.p>


          {/* Gallery Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <a
              href="/gallery"
              className="inline-block px-10 py-4 bg-[#ffb4d8] text-white font-light text-lg tracking-wide rounded-full hover:bg-[#ff9ac6] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              לגלריה
            </a>
          </motion.div>

        </div>
      </section>

      {/* What I Photograph Section */}
      <section className="w-full px-6 md:px-24 py-20 bg-white text-[#331a34]">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-light text-center mb-16 text-[#ffb4d8]"
          >
            מה אני מצלמת
          </motion.h2>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Category 1 - Family */}
            <Link href="/gallery/משפחה">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 h-48 md:h-56">
                  <img 
                    src="/משפחה/1.jpg" 
                    alt="צילומי משפחה" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-light text-center text-[#5d3a59]">צילומי משפחה</h3>
              </motion.div>
            </Link>

            {/* Category 2 - Newborn */}
            <Link href="/gallery/ניו בורן">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 h-48 md:h-56">
                  <img 
                    src="/ניו בורן/0P7A5441-Edit.jpg" 
                    alt="צילומי ניו בורן" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-light text-center text-[#5d3a59]">צילומי ניו בורן</h3>
              </motion.div>
            </Link>

            {/* Category 3 - Challah */}
            <Link href="/gallery/חלאקה">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 h-48 md:h-56">
                  <img 
                    src="/חלאקה/קולדצקי ראשון.jpg" 
                    alt="צילומי חלאקה" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-light text-center text-[#5d3a59]">צילומי חלאקה</h3>
              </motion.div>
            </Link>

            {/* Category 4 - Smash Cake */}
            <Link href="/gallery/סמאש קייק">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-lg mb-4 h-48 md:h-56">
                  <img 
                    src="/סמאש קייק/לאתר6 copy.jpg" 
                    alt="צילומי סמאש קייק" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-light text-center text-[#5d3a59]">צילומי סמאש קייק</h3>
              </motion.div>
            </Link>

          </div>

        </div>
      </section>

      <section className="w-full px-6 md:px-24 py-20 bg-[#f8f8f8] text-[#331a34]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-full flex justify-center mt-4 mb-6">
            <motion.img
              src="/לב.png"
              alt="Heart decoration"
              className="h-[70px] md:h-[100px] object-contain opacity-80"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#ffb4d8]">לקוחות מספרים</h2>

          <div className="mt-12 relative">
            <div className="max-w-3xl mx-auto px-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="flex items-start gap-6"
                >
                  <motion.img
                    src={testimonials[testimonialIndex].image}
                    alt={testimonials[testimonialIndex].name}
                    className="w-20 h-20 rounded-full object-cover shadow-md"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />

                  <div className="flex-1 text-right">
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="text-lg md:text-xl leading-8 text-[#5d3a59]"
                    >
                      {testimonials[testimonialIndex].quote}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.12, duration: 0.5 }}
                      className="mt-6 flex items-center justify-end gap-4"
                    >
                      <div className="text-sm font-semibold text-[#ffb4d8]">{testimonials[testimonialIndex].name}</div>
                      <div className="text-xs text-[#7e5b7b]">{testimonials[testimonialIndex].title}</div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-center items-center gap-3">
              {testimonials.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  whileHover={{ scale: 1.15 }}
                  className={`h-3 w-3 rounded-full transition ${idx === testimonialIndex ? 'bg-[#ffb4d8]' : 'bg-[#f0e6ef]'}`}
                  aria-label={`הצג חוות דעת ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>


    </main>
  );
}