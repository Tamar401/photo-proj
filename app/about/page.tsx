"use client";

import { motion } from "framer-motion";
import DrawnLine from "@/components/DrawnLine";
import { Fredoka } from "next/font/google"; 
import Link from "next/link";

const fredoka = Fredoka({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// הגדרות אנימציה להופעה הדרגתית
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function AboutPage() {
  return (
    <main className={`min-h-screen w-full bg-[#f8f8f8] text-[#331a34] antialiased m-0 p-0 block relative ${fredoka.className}`} dir="rtl">
      {/* Hero Header */}
      <div className="relative w-full h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#f0e6ef] to-[#f8f8f8]">
        {/* קונטיינר מרכזי עם Flexbox למירכוז מושלם גם ב-RTL */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="absolute text-[6rem] md:text-[14rem] tracking-[10px] md:tracking-[25px] uppercase font-['iInspirationalDoctor'] text-[#ffb4d8] whitespace-nowrap"
            style={{ zIndex: 1 }}
          >
            ABOUT
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="relative z-20 text-6xl md:text-8xl font-bold text-[#331a34] tracking-widest uppercase drop-shadow-sm"
          >
            אודות
          </motion.h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full px-6 md:px-24 pt-16 pb-24 relative z-30 bg-[#fff4fb] rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.02)]" style={{ marginTop: '-40px' }}>
        <div className="max-w-6xl mx-auto">
          
          {/* לוגו לב */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
            className="w-full flex justify-center mb-8"
          >
            <motion.img
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              src="/לב.png"
              alt="Heart decoration"
              className="h-[70px] md:h-[90px] object-contain opacity-90 drop-shadow-sm"
            />
          </motion.div>

          {/* כותרת */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#ff6fc6] mb-4 font-hebrew">נעים להכיר, רחלי חלופסקי</h2>
            <p className="text-lg md:text-2xl text-[#8d6a87] font-light max-w-2xl mx-auto">
              צלמת המוקדשת לתיעוד הרגעים הקטנים והגדולים, ולהפיכתם לזיכרונות מתוקים שנשארים לתמיד.
            </p>
          </motion.div>

          {/* פריסת תוכן ותמונה */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* צד ימין - טקסט (אודות) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="lg:col-span-7 bg-white/70 backdrop-blur-sm p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-white"
            >
              <motion.div variants={itemVariants} className="space-y-6 text-[#5d3a59] text-lg leading-relaxed font-light">
                <p>
                  <strong className="font-medium text-[#331a34]">היי, אני רחלי!</strong> האהבה שלי למצלמה התחילה מהרצון לתפוס את הקסם שמתחבא בשגרת החיים. אני מאמינה שכל אדם, כל ילד וכל משפחה מביאים איתם סיפור ייחודי, והתפקיד שלי הוא לצייר את הסיפור הזה באור, צבע ורגש.
                </p>
                <p>
                  הגישה שלי לצילום היא טבעית ורכה. אני מחפשת את החיוך האמיתי, המבט החם והחיבורים הספונטניים. בין אם זה צילומי ניו-בורן עדינים, צילומי חלאקה מרגשים או סשן משפחתי מלא בצחוק - המטרה שלי היא שתרגישו בנוח, תהיו אתם, ותיהנו מכל רגע.
                </p>
                <p>
                  הסטודיו והצילומים בטבע הם המקומות שבהם היצירה שלי מתעוררת לחיים. אני דואגת לכל פרט קטן, מהסטיילינג ועד העיבוד הסופי, כדי שכל תמונה תהיה לא פחות ממושלמת.
                </p>
              </motion.div>

              {/* כפתור יצירת קשר / מעבר לגלריה */}
              <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
                <Link href="/gallery">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#ff6fc6] to-[#ffb4d8] hover:from-[#ff56b8] hover:to-[#ffa3d0] text-white font-medium py-3 px-8 rounded-full shadow-md transition-all duration-300"
                  >
                    לצפייה בגלריה
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-[#ff6fc6] border-2 border-pink-100 hover:border-[#ffb4d8] font-medium py-3 px-8 rounded-full shadow-sm transition-all duration-300"
                  >
                    בואו נדבר
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* צד שמאל - תמונה */}
            <motion.div
              initial={{ opacity: 0, x: -30, rotate: -3 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring" as const, duration: 1.2, delay: 0.4 }}
              className="lg:col-span-5 relative group"
            >
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                {/* אפשר להחליף את הנתיב הזה לתמונה אמיתית של הצלמת */}
                <img
                  src="/משפחה/1.jpg" 
                  alt="רחלי חלופסקי"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#ffb4d8]/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              {/* אלמנט עיצובי צף */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#ffb4d8] rounded-full blur-2xl opacity-40 -z-10"
              />
            </motion.div>

          </div>

        </div>
      </div>
    </main>
  );
}