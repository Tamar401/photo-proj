"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence,useScroll, useTransform  } from "framer-motion";
import Link from "next/link";
import AnimatedUnderline from "@/components/AnimatedUnderline";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BackgroundCurve from "@/components/BackgroundCurve";
import GalleryButton from "@/components/GalleryButton";
import { Rubik } from "next/font/google";


import { Heebo } from "next/font/google"; // ייבוא הפונט המרובע והעבה

// הגדרת הפונט במשקל הכי עבה שלו למראה עוצמתי
const heebo = Heebo({
  subsets: ["hebrew"],
  weight: ["300","400","900"],
});
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["hebrew"],
  weight: ["600", "700"], // משקלים עבים ועגלגלים
});
// קומפוננטה שחושפת את הטקסט מילה-מילה לפי הגלילה
const RevealText = ({ text, className }: { text: string, className?: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // מעקב אחרי הגלילה של האלמנט הספציפי הזה
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"] // מתחיל להיצבע כשהוא קצת נכנס למסך, ומסיים כשהוא באמצע
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={`flex flex-wrap justify-center gap-x-2 gap-y-1 ${className} ${heebo.className}`}>
      {words.map((word, i) => {
        // חישוב מתי כל מילה צריכה להתחיל ולהיגמר להיצבע
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        // מעבר משקיפות 0.2 (נראה כמו אפור בהיר) ל-1 (צבע מלא)
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        
        return (
          <motion.span key={i} style={{ opacity }} className="transition-opacity duration-100">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};
const heroImages = [
  "/משפחה/1.jpg",
  "/סמאש קייק/לאתר6 copy.jpg",
  "/משפחה/ארי 2 ביצהה.jpg",
  "/משפחה/לאתר 2.jpg",
  "/משפחה/לתמר1.jpg",
  "/ניו בורן/12315-Edit (1).jpg"
  
  
];

const initialImages = [
  { id: 2, src: "/משפחה/לאתר 2.jpg", category: "משפחה" },
  { id: 1, src: "/משפחה/1.jpg", category: "משפחה" },
  { id: 4, src: "/משפחה/חיים (1).jpg", category: "משפחה" },
  { id: 6, src: "/משפחה/לאתר3 copy.jpg", category: "משפחה" },
  { id: 7, src: "/משפחה/לאתר4 copy.jpg", category: "משפחה" },
  { id: 8, src: "/משפחה/לאתר5 copy.jpg", category: "משפחה" },
  { id: 9, src: "/משפחה/לאתר7 copy.jpg", category: "משפחה" },
  { id: 10, src: "/משפחה/לתמר.jpg", category: "משפחה" },
  { id: 11, src: "/משפחה/לתמר1.jpg", category: "משפחה" },
  { id: 12, src: "/משפחה/ניסןי copy.jpg", category: "משפחה" },
  { id: 14, src: "/משפחה/קולדצקי10 copy.jpg", category: "משפחה" },
  { id: 15, src: "/משפחה/קולדצקי12222.jpg", category: "משפחה" },
  { id: 16, src: "/משפחה/קולדצקי222 עם ביצה.jpg", category: "משפחה" },
  { id: 17, src: "/משפחה/שלמה   עע חתוך טוב copy.jpg", category: "משפחה" },
  { id: 18, src: "/משפחה/שני ותמר שני.jpg", category: "משפחה" },
  { id: 19, src: "/סמאש קייק/לאתר6 copy.jpg", category: "סמאש קייק" },
  { id: 20, src: "/סמאש קייק/לאתר8 copy.jpg", category: "סמאש קייק" },
  { id: 21, src: "/סמאש קייק/לאתר9 copy.jpg", category: "סמאש קייק" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("הכל");
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedIndex]);

  // החלפת תמונת רקע עליונה כל 6 שניות
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    { name: 'הילה וינשטיין', title: 'אמא מרוצה', quote: 'רחלי תפסה את הרגעים הכי טבעיים של הילדים שלנו בצורה כל כך עדינה ויפה.', image: '/משפחה/לאתר 2.jpg' },
    { name: 'אביב לוי', title: 'זוג צעיר', quote: 'הצילומים היו מקצועיים וחוויתיים. רחלי הובילה אותנו בשקט ובקסם.', image: '/משפחה/לתמר.jpg' },
    { name: 'איריס רוזן', title: 'משפחה', quote: 'התמונות נראות יוקרתיות אך מלאות חמימות. התחושה הייתה רגועה ומלאת אמון.', image: '/משפחה/קולדצקי10 copy.jpg' },
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const filteredImages = activeCategory === "הכל"
    ? initialImages
    : initialImages.filter((image) => image.category === activeCategory);
// מערך של 4 אנימציות שונות שיתחלפו ביניהן
const currentAnim = [
  { initial: 1, animate: 1.1 },     // 1. זום פנימה
  { initial: 1.1, animate: 1 },     // 2. זום החוצה
  { initial: 1.05, animate: 1.15 }, // 3. זום פנימה עדין
  { initial: 1.15, animate: 1.05 }  // 4. זום החוצה עדין
][currentHeroIndex % 4]; // הפעולה % 4 דואגת שהאנימציות יחזרו על עצמן במעגליות
  return (
    <main className="min-h-screen w-full bg-[#f8f8f8] text-[#331a34] antialiased m-0 p-0 block relative pt-16">
      
      {/* לייטבוקס */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[99999] flex justify-center items-center bg-[rgba(255,245,251,0.96)] backdrop-blur-md p-4"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={filteredImages[selectedIndex].src}
                alt="View Enlarged"
                className="max-w-[70vw] max-h-[80vh] object-contain rounded-[2rem] bg-white border border-pink-200/50"
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <header style={{ height: "100vh", marginTop: "-4rem" }} className="relative flex flex-col w-full overflow-hidden m-0 z-10">
       <div className="absolute inset-0 z-0 bg-[#f8f8f8] w-full h-full">
          <div className="relative w-full h-full">
          <AnimatePresence>
  <motion.img
    key={currentHeroIndex}
    src={heroImages[currentHeroIndex]}
    initial={{ opacity: 0, scale: currentAnim.initial }}
    animate={{ 
      opacity: 1, 
      scale: currentAnim.animate 
    }}
    exit={{ opacity: 0 }}
    transition={{ 
      opacity: { duration: 1.5, ease: "easeInOut" },
      scale: { duration: 6, ease: "linear" } 
    }}
    className="w-full h-full object-cover object-center absolute inset-0"
    alt="Background Content"
  />
</AnimatePresence>
          </div>
         
        </div>

        {/* אזור הכיתוב - ממוקם בדיוק במרכז המסך */}
        <div className="absolute inset-0 z-20 flex items-center justify-center w-full pointer-events-none">
         {/* כיתוב הרקע הוורוד (RACHELY) */}
<motion.span
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 0.6, scale: 1 }}
  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
  className="absolute text-[5rem] sm:text-[8rem] md:text-[11rem] lg:text-[14rem] font-['Bongkar'] text-[#ffb4d8] tracking-widest uppercase z-0 whitespace-nowrap"
>
  RACHELY
</motion.span>
          
{/* הכיתוב הלבן מעל (רחלי חלופסקי) */}
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
  className={`relative z-10 text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[9.5rem] text-white tracking-widest drop-shadow-md whitespace-nowrap ${fredoka.className}`}
>
  רחלי חלופסקי
</motion.h1>
        </div>

        {/* אזור הכפתורים - ממוקם ממש בתחתית, מעל לנקודות הניווט */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-20 left-0 right-0 z-30 flex flex-row items-center justify-center gap-6 md:gap-10"
        >
          {/* כפתור קצת עלי */}
          <Link 
            href="/about" 
            className="flex items-center gap-2 text-white text-xl md:text-3xl font-medium hover:text-[#ffb4d8] transition-colors duration-300 drop-shadow-md"
          >
            <span className="text-2xl md:text-4xl">&laquo; קצת עלי </span>
          </Link>
          
          {/* כפתור לגלריה */}
          <GalleryButton />
        </motion.div>

        {/* Navigation Dots - ניווט דוטס למטה */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-3">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentHeroIndex(index)}
              initial={{ opacity: 0.6, scale: 0.8 }}
              animate={{ 
                opacity: index === currentHeroIndex ? 1 : 0.6,
                scale: index === currentHeroIndex ? 1 : 0.8
              }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentHeroIndex 
                  ? 'bg-[#ffb4d8] shadow-lg shadow-[#ffb4d8]/50' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </header>


      <section className="w-full px-6 md:px-24 py-32 bg-[#f8f8f8] text-[#331a34]">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* "נעים להכיר!" */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-light text-[#ffb4d8] mb-4 tracking-wide"
          >
            !נעים להכיר
          </motion.h2>

         <div className="w-full max-w-[347px] h-[31px] mx-auto mb-8">
  <AnimatedUnderline />
</div>

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

     {/* About text - מופעל באנימציית גלילה מילה אחר מילה */}
          <div className="mt-8 mb-12 w-full" dir="rtl">
            <RevealText 
              text="הופכת רגעים מתוקים לחוויה בלתי נשכחת! אני צלמת המתמחה בתיעוד רגעים אמתיים ועמוקים. כל תצלום הוא סיפור של רגש וחום, מלמד אותי להסתכל בעיניים הפתוחות ולתפוס את היופי האמיתי של החיים. אני מאמינה שבכל רגע יש קסם - בחיוך של ילד, בטבע שמסביב לנו. העבודה שלי היא לשמר ולשמור על הרגעים האלה לנצח."
              // הקטנו את הגדלים (text-lg במקום text-2xl) והוספנו font-light למראה דק
              className="text-lg md:text-xl lg:text-2xl text-[black] font-light leading-snug md:leading-tight"
            />
          </div>


          {/* Gallery Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <GalleryButton />
          </motion.div>

        </div>
      </section>
{/* Before After Slider Section */}
      <section className="relative w-full px-6 md:px-24 py-16 md:py-20 bg-[#f3eae3] text-[#331a34]">
        
        {/* קו עליון - קרוב יותר לקצה */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-1.5 bg-[#ffb4d8] rounded-r-full"
        />

        {/* הקטנתי מעט את הרוחב המקסימלי (max-w-4xl) כדי שהסליידר לא יהיה ענק מידי */}
        <div className="max-w-4xl mx-auto">
          
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-light text-center mb-4 text-[#ffb4d8]"
          >
            העיבוד שלי
          </motion.h2>
          
          <div className="w-full max-w-[347px] h-[31px] mx-auto mb-8">
            <AnimatedUnderline />
          </div>

          {/* עוטף חכם לסליידר - שומר על פרופורציות ומונע חיתוך למטה */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
            <BeforeAfterSlider />
          </div>

        </div>

        {/* קו תחתון - קרוב יותר לקצה */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }} 
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 h-1.5 bg-[#ffb4d8] rounded-l-full"
        />

      </section>

      {/* What I Photograph Section - שונה חזרה לבהיר כדי לשמור על התחלופה */}
      <section className="w-full px-6 md:px-24 py-20 bg-[#f8f8f8] text-[#331a34]">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-light text-center mb-4 text-[#ffb4d8]"
          >
            מה אני מצלמת
          </motion.h2>
          
        <div className="w-full max-w-[347px] h-[31px] mx-auto mb-8">
  <AnimatedUnderline />
</div>


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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Overlay & Heart */}
                  <div className="absolute inset-0 bg-[#331a34]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-[#ffb4d8] transform scale-50 group-hover:scale-100 transition-transform duration-700 ease-in-out" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Overlay & Heart */}
                  <div className="absolute inset-0 bg-[#331a34]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-[#ffb4d8] transform scale-50 group-hover:scale-100 transition-transform duration-700 ease-in-out" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Overlay & Heart */}
                  <div className="absolute inset-0 bg-[#331a34]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-[#ffb4d8] transform scale-50 group-hover:scale-100 transition-transform duration-700 ease-in-out" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Overlay & Heart */}
                  <div className="absolute inset-0 bg-[#331a34]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14 text-[#ffb4d8] transform scale-50 group-hover:scale-100 transition-transform duration-700 ease-in-out" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-light text-center text-[#5d3a59]">צילומי סמאש קייק</h3>
              </motion.div>
            </Link>

          </div>

        </div>
      </section>


   
  <section className="w-full px-6 md:px-24 py-20 bg-[#f3eae3] text-[#331a34]">
  <div className="max-w-4xl mx-auto">
    <AnimatePresence mode="wait">
      <motion.div
        key={testimonialIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
      >
        {/* סימן ציטוט פותח */}
        <div className="text-6xl text-black font-serif hidden md:block">“</div>

        <div className="flex-1 text-center md:text-right">
          <p className="text-lg md:text-xl leading-relaxed text-[#331a34] mb-6">
            {testimonials[testimonialIndex].quote}
          </p>
          
          {/* קו אדום מפריד */}
          <div className="w-16 h-1 #ffb4d8 mx-auto md:mr-0 mb-4" />
          
          <div className="font-bold text-lg">{testimonials[testimonialIndex].name}</div>
          <div className="text-sm opacity-70">{testimonials[testimonialIndex].title}</div>
        </div>

        {/* תמונה עגולה */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
           <img
            src={testimonials[testimonialIndex].image}
            alt={testimonials[testimonialIndex].name}
            className="w-full h-full rounded-full object-cover shadow-xl border-4 border-white"
          />
        </div>
      </motion.div>
    </AnimatePresence>

    {/* נקודות ניווט */}
    <div className="mt-12 flex justify-center items-center gap-3">
      {testimonials.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setTestimonialIndex(idx)}
          className={`h-3 w-3 rounded-full transition ${idx === testimonialIndex ? 'bg-[#ffb4d8]' : 'bg-gray-300'}`}
        />
      ))}
    </div>
  </div>
</section>


    </main>
    
  );
}