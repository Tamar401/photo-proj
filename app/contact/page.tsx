"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DrawnLine from "@/components/DrawnLine";

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
    <main className="min-h-screen w-full bg-[#f8f8f8] text-[#331a34] antialiased m-0 p-0 block relative">
      {/* Hero Header */}
      <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/משפחה/חיים (1).jpg"
          alt="Contact Header"
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
            CONTACT
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative z-20 text-6xl md:text-8xl font-light text-white tracking-widest uppercase font-hebrew"
          >
            צור קשר
          </motion.h1>
        </div>
      </div>

      <div className="w-full px-6 md:px-24 pt-16 pb-16 relative z-30 bg-[#fff4fb]" style={{ marginTop: '-40px'}}>
        <div className="max-w-4xl mx-auto">
          
          {/* לוגו לב */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full flex justify-center mb-8"
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >

            <h2 className="text-4xl md:text-5xl font-extrabold text-[#ff6fc6] mb-4 font-hebrew">בואו נדבר</h2>
            <p className="text-lg md:text-xl text-[#b0b0b0] font-light font-hebrew">
              אשמח לשמוע על הרעיון הבא שלכם
            </p>
          </motion.div>

          {/* פרטי קשר */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 flex items-center justify-center gap-6 max-w-2xl mx-auto flex-wrap"
          >
            <motion.a
              href="tel:0527149555"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-[#331a34] hover:text-[#ffb4d8] transition-colors duration-300 text-lg"
            >
              <span className="font-medium">052-714-9555</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
            </motion.a>

            <div className="h-6 w-px bg-pink-300"></div>

            <motion.a
              href="mailto:r0527149555@gmail.com"
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-[#331a34] hover:text-[#ffb4d8] transition-colors duration-300 text-lg"
            >
              <span className="font-medium">r0527149555@gmail.com</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* טופס */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto w-full"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <label className="block text-sm font-medium text-[#5d3a59] mb-2 text-right">שם מלא *</label>
                <motion.input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  whileFocus={{ borderColor: "#ffb4d8" }}
                  className="w-full p-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none transition-all duration-300 bg-white text-right text-[#331a34] placeholder-pink-300"
                  placeholder="הכניסו את שמכם המלא"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label className="block text-sm font-medium text-[#5d3a59] mb-2 text-right">אימייל *</label>
                <motion.input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  whileFocus={{ borderColor: "#ffb4d8" }}
                  className="w-full p-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none transition-all duration-300 bg-white text-right text-[#331a34] placeholder-pink-300"
                  placeholder="example@email.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <label className="block text-sm font-medium text-[#5d3a59] mb-2 text-right">טלפון (אופציונלי)</label>
                <motion.input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  whileFocus={{ borderColor: "#ffb4d8" }}
                  className="w-full p-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none transition-all duration-300 bg-white text-right text-[#331a34] placeholder-pink-300"
                  placeholder="050-1234567"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <label className="block text-sm font-medium text-[#5d3a59] mb-2 text-right">ההודעה שלכם *</label>
                <motion.textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  whileFocus={{ borderColor: "#ffb4d8" }}
                  rows={5}
                  className="w-full p-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:outline-none transition-all duration-300 bg-white resize-none text-right text-[#331a34] placeholder-pink-300"
                  placeholder="ספרו לי על הצילום שתרצו..."
                />
              </motion.div>

              {/* כפתור שליחה */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="pt-2"
              >
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#ffb4d8] hover:bg-[#ff9ecb] text-white font-semibold py-4 px-8 rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-3 text-base">
                    {status === "sending" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        שולח הודעה...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        שלחו הודעה
                      </>
                    )}
                  </span>
                </motion.button>
              </motion.div>

              {/* הודעות סטטוס */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-lg flex items-center gap-3 shadow-sm"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-right flex-1">
                      <div className="font-semibold text-sm">ההודעה נשלחה בהצלחה!</div>
                      <div className="text-xs opacity-80">אחזור אליכם בהקדם</div>
                    </div>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg flex items-center gap-3 shadow-sm"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-right flex-1">
                      <div className="font-semibold text-sm">אופס! משהו השתבש</div>
                      <div className="text-xs opacity-80">{errorText}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
