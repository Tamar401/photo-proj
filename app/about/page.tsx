"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full bg-[#f8f8f8] text-[#331a34] antialiased m-0 p-0 block relative">
      {/* Hero Header */}
      <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/home.png"
          alt="About Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute text-[10rem] md:text-[16rem] font-light text-[#ffb4d8] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-widest uppercase pointer-events-none"
            style={{ zIndex: 1 }}
          >
            ABOUT
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative z-20 text-6xl md:text-8xl font-light text-white tracking-widest uppercase"
          >
            אודות
          </motion.h1>
        </div>
      </div>

      <div className="w-full px-6 md:px-24 pt-20 pb-20 relative z-30 bg-[#fff4fb]" style={{ marginTop: '-40px', borderRadius: '40px 40px 0 0' }}>
        <div className="max-w-5xl mx-auto">
          
          {/* לוגו לב */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex justify-center mb-12"
          >
            <img
              src="/לב.png"
              alt="Heart decoration"
              className="h-[70px] md:h-[100px] object-contain opacity-80"
            />
          </motion.div>

          {/* כותרת */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-light text-[#331a34] mb-6">רחלי חלופסקי</h2>
            <p className="text-xl md:text-2xl text-[#ffb4d8] font-light">צלמת משפחה עם אהבה אינסופית</p>
          </motion.div>

          {/* סיפור ראשי */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto mb-20"
          >
            <div className="text-right space-y-6 text-lg leading-8 text-[#5d3a59]">
              <p>
                אני רחלי, צלמת משפחה וניו בורן שאוהבת לתפוס את הרגעים המחזיקים בלב. בשנים האחרונות התחייבתי לעזור למשפחות לשמר את הזיכרונות היקרים ביותר שלהם בצורה הטבעית והגנובה ביותר.
              </p>
              <p>
                הגישה שלי היא פשוטה: מירבי טבעיות, מינימום פוזות מלאכותיות. אני מאמינה שהמומנטים הטובים ביותר קורים כשאנשים פשוט עושים את שלהם - חוגכים, משחקים, מחובקים אחד לשני. זה מה שאני כאן כדי לתפוס.
              </p>
              <p>
                בכל צילום, אני לא מחפשת רק תמונות יפות - אני מחפשת את הרגש, את הקשר, את הרטט המיוחד שיכול להיות רק ביום הזה, עם המשפחה הזו. כי כל משפחה היא הסיפור שלהם שצריך להישמר לנצח.
              </p>
            </div>
          </motion.div>

          {/* ערכים */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-gradient-to-br from-pink-200 to-pink-300 p-4 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0 9c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#331a34] mb-2">טבעיות</h3>
              <p className="text-[#7e5b7b] text-sm">רגעים אמיתיים, ללא פוזות מלאכותיות או כפויות</p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-gradient-to-br from-pink-200 to-pink-300 p-4 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.1-.08-.21 0-.3.1l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.09-.09.17-.29.09-.39-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#331a34] mb-2">זמינות</h3>
              <p className="text-[#7e5b7b] text-sm">תמיד זמינה כדי לענות לשאלות ולהוביל אתכם</p>
            </div>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="bg-gradient-to-br from-pink-200 to-pink-300 p-4 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[#331a34] mb-2">מקצועיות</h3>
              <p className="text-[#7e5b7b] text-sm">עיבוד מקצועי וקולקציה של תמונות מושקעות</p>
            </div>
          </motion.div>

          {/* חוויה */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/70 rounded-2xl border border-pink-200/50 p-8 md:p-12 max-w-3xl mx-auto text-center mb-20"
          >
            <h3 className="text-4xl md:text-5xl font-light text-[#ffb4d8] mb-6">+500</h3>
            <p className="text-lg text-[#5d3a59] mb-2">משפחות מרוצות</p>
            <p className="text-[#7e5b7b] text-sm">שנתנו לי את הכבוד להיות חלק מהרגעים היקרים ביותר שלהם</p>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <p className="text-lg text-[#7e5b7b] mb-8">
              האם אתם מעוניינים לשמר את הרגעים הכי חשובים שלכם?
            </p>
            <motion.a
              href="/contact"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block bg-[#ffb4d8] hover:bg-[#ff9ecb] text-white font-semibold py-4 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              בואו נדבר
            </motion.a>
          </motion.div>

        </div>

        {/* Footer */}
        <footer className="border-t border-pink-100 pt-12 pb-8 mt-20 w-full max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-[#7e5b7b] gap-4">
          <p>© תמר יגלניק </p>
          <div className="flex gap-8 font-light">
            <a href="https://wa.me/972500000000" target="_blank" rel="noopener noreferrer" className="hover:text-[#c24f8d] transition-colors duration-300">WHATSAPP</a>
            <a href="mailto:r0527149555@gmail.com" className="hover:text-[#c24f8d] transition-colors duration-300">EMAIL</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
