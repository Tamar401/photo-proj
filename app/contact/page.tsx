"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DrawnLine from "@/components/DrawnLine";
import { Fredoka } from "next/font/google"; 

const fredoka = Fredoka({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// הגדרות אנימציה להופעה הדרגתית של אלמנטים
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<null | "idle" | "sending" | "success" | "error">(null);
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorText("");

    console.log("📤 שליחת הודעה:", { name, email, phone, message });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await res.json();
      console.log("📩 תגובה מהשרת:", { status: res.status, data });

      if (res.ok) {
        console.log("✅ ההודעה נשלחה בהצלחה!");
        setStatus("success");
        setName(""); setEmail(""); setPhone(""); setMessage("");
        setTimeout(() => setStatus(null), 5000); // סגור הודעה אחרי 5 שניות
      } else {
        console.error("❌ שגיאה:", data?.error);
        setStatus("error");
        setErrorText(data?.error || "שגיאה בשליחת הטופס");
      }
    } catch (err) {
      console.error("⚠️ שגיאה ברשת:", err);
      setStatus("error");
      setErrorText("שגיאה ברשת — נסי שוב מאוחר יותר");
    }
  };

  return (
    <main className={`min-h-screen w-full bg-[#f8f8f8] text-[#331a34] antialiased m-0 p-0 block relative ${fredoka.className}`} dir="rtl">
      {/* Hero Header */}
      <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/משפחה/חיים (1).jpg"
          alt="Contact Header"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-transparent" />
        
        {/* קונטיינר מרכזי עם Flexbox למירכוז מושלם גם ב-RTL */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="absolute text-[5rem] md:text-[12rem] tracking-[10px] md:tracking-[20px] uppercase font-['iInspirationalDoctor'] text-[#ffb4d8] whitespace-nowrap"
            style={{ zIndex: 1 }}
          >
            CONTACT
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            className="relative z-20 text-6xl md:text-8xl font-bold text-white tracking-widest uppercase drop-shadow-lg"
          >
            צור קשר
          </motion.h1>
        </div>
      </div>

      <div className="w-full px-6 md:px-24 pt-16 pb-24 relative z-30 bg-[#fff4fb] rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.03)]" style={{ marginTop: '-40px'}}>
        <div className="max-w-5xl mx-auto">
          
          {/* לוגו לב עם אנימציית "פעימה" עדינה */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
            className="w-full flex justify-center mb-6"
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
            className="text-center mb-12 flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#ff6fc6] mb-2 font-hebrew">בואו נדבר</h2>
            <p className="text-lg md:text-xl text-[#8d6a87] font-light font-hebrew">
              אשמח לשמוע על הרעיון הבא שלכם
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            
            {/* פרטי קשר - צד ימין במסכים גדולים */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="md:col-span-5 flex flex-col gap-6"
            >
              {/* כרטיסיית טלפון */}
              <motion.a
                variants={itemVariants}
                href="tel:0527149555"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(255, 111, 198, 0.3)" }}
                className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50 transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-[#ff6fc6] group-hover:bg-[#ffb4d8] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#331a34] font-semibold text-lg">חייגו אליי</h3>
                  <p className="text-[#8d6a87] font-light mt-1">052-714-9555</p>
                </div>
              </motion.a>

              {/* כרטיסיית אימייל */}
              <motion.a
                variants={itemVariants}
                href="mailto:r0527149555@gmail.com"
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(255, 111, 198, 0.3)" }}
                className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50 transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-[#ff6fc6] group-hover:bg-[#ffb4d8] group-hover:text-white transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#331a34] font-semibold text-lg">כתבו לי למייל</h3>
                  <p className="text-[#8d6a87] font-light mt-1 text-sm sm:text-base">r0527149555@gmail.com</p>
                </div>
              </motion.a>
            </motion.div>

            {/* טופס השארת פרטים - צד שמאל */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="md:col-span-7 bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-[#8d6a87] mb-2">שם מלא *</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 rounded-xl bg-white/80 border border-pink-100 focus:border-[#ffb4d8] focus:ring-4 focus:ring-[#ffb4d8]/20 outline-none transition-all duration-300 text-[#331a34] placeholder-pink-200"
                    placeholder="הכניסו את שמכם המלא"
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-[#8d6a87] mb-2">אימייל *</label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/80 border border-pink-100 focus:border-[#ffb4d8] focus:ring-4 focus:ring-[#ffb4d8]/20 outline-none transition-all duration-300 text-[#331a34] placeholder-pink-200 text-left"
                      placeholder="example@email.com"
                      dir="ltr"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-[#8d6a87] mb-2">טלפון (אופציונלי)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/80 border border-pink-100 focus:border-[#ffb4d8] focus:ring-4 focus:ring-[#ffb4d8]/20 outline-none transition-all duration-300 text-[#331a34] placeholder-pink-200 text-left"
                      placeholder="050-1234567"
                      dir="ltr"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-[#8d6a87] mb-2">ההודעה שלכם *</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full p-4 rounded-xl bg-white/80 border border-pink-100 focus:border-[#ffb4d8] focus:ring-4 focus:ring-[#ffb4d8]/20 outline-none transition-all duration-300 resize-none text-[#331a34] placeholder-pink-200"
                    placeholder="ספרו לי על הצילום שתרצו..."
                  />
                </motion.div>

                {/* כפתור שליחה */}
                <motion.div variants={itemVariants} className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#ff6fc6] to-[#ffb4d8] hover:from-[#ff56b8] hover:to-[#ffa3d0] text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-pink-200 hover:shadow-pink-300 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-3 text-lg">
                      {status === "sending" ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          שולחת הודעה...
                        </>
                      ) : (
                        <>
                          שלחו הודעה
                          <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.div>

                {/* הודעות סטטוס */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-5 py-4 rounded-xl flex items-center gap-4 shadow-sm mt-4"
                    >
                      <div className="bg-[#dcfce7] rounded-full p-1">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">ההודעה נשלחה בהצלחה!</div>
                        <div className="text-xs opacity-80 mt-0.5">אחזור אליכם בהקדם.</div>
                      </div>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-[#fef2f2] border border-[#fecaca] text-[#991b1b] px-5 py-4 rounded-xl flex items-center gap-4 shadow-sm mt-4"
                    >
                      <div className="bg-[#fee2e2] rounded-full p-1">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">אופס! משהו השתבש</div>
                        <div className="text-xs opacity-80 mt-0.5">{errorText}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
}