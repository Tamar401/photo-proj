"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AnimatedUnderline from "@/components/AnimatedUnderline";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

const heroImages = [
  "/משפחה/לאתר 2.jpg",
  "/משפחה/חיים (1).jpg",
  "/משפחה/לתמר.jpg",
  "/סמאש קייק/לאתר6 copy.jpg",
  "/משפחה/1.jpg"
];

const initialImages = [
  { id: 1, src: "/משפחה/1.jpg", category: "משפחה" },
  { id: 2, src: "/משפחה/לאתר 2.jpg", category: "משפחה" },
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

  return (
    <main className="min-h-screen w-full bg-[#f8f8f8] text-[#331a34] antialiased m-0 p-0 block relative pt-16">
      
      {/* לייטבוקס נשאר כפי שהיה */}
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

      <header style={{ height: "100vh", marginTop: "-4rem" }} className="relative flex flex-col justify-center items-center text-center w-full overflow-hidden px-6 m-0 z-10">
       <div className="absolute inset-0 z-0 bg-[#f8f8f8] w-full h-full">
          <div className="relative w-full h-full">
            <AnimatePresence>
              <motion.img
                key={currentHeroIndex}
                src={heroImages[currentHeroIndex]}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1.1 
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f8f8] via-transparent to-transparent z-10" />
        </div>

        <div className="relative z-20 pointer-events-none">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            className="absolute text-[10rem] md:text-[14rem] font-light text-[#ffb4d8] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-widest uppercase"
          >
            RACHELY
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
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
            className="text-3xl md:text-4xl font-light text-[#ffb4d8] mb-4 tracking-wide"
          >
            !נעים להכיר
          </motion.h2>

          {/* Animated Underline */}
          <div className="w-20 h-1 mx-auto mb-8">
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

      {/* Before After Slider Section */}
      <section className="w-full px-6 md:px-24 py-20 bg-[#f8f8f8] text-[#331a34]">
        <div className="max-w-5xl mx-auto">
          
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
          
          {/* Animated Underline */}
          <div className="w-20 h-1 mx-auto mb-16">
            <AnimatedUnderline />
          </div>

          {/* Before After Slider */}
          <BeforeAfterSlider />

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
            className="text-4xl md:text-5xl font-light text-center mb-4 text-[#ffb4d8]"
          >
            מה אני מצלמת
          </motion.h2>
          
          {/* Animated Underline */}
          <div className="w-24 h-1 mx-auto mb-16">
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

  <section className="w-full px-6 md:px-24 py-20 bg-[#f0ede5] text-[#331a34]">
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