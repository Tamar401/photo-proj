"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SiteHero from "../../components/SiteHero";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Build a mailto fallback that opens the user's mail client with prefilled body
    const to = "r0527149555@gmail.com";
    const subject = encodeURIComponent("פניה דרך טופס יצירת קשר — אתר רחלי");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;
    // Small timeout for animation feel
    setTimeout(() => {
      window.location.href = mailto;
      setSending(false);
    }, 450);
  };

  return (
    <main className="min-h-screen bg-white text-pink-600">
      <SiteHero title="צור קשר" subtitle="מלאו פרטים ונחזור אליכם בהקדם — ניתן גם להתקשר ל- 052-714-9555" />
      <div className="container-max px-6 py-16 w-full max-w-3xl mx-auto">
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-pink-50 p-8 rounded-2xl backdrop-blur-sm border border-pink-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-light">צור קשר</h1>
              <p className="muted mt-2">מלאו פרטים ונחזור אליכם בהקדם — ניתן גם להתקשר ל- <a href="tel:0527149555" className="text-[#00ff87]">052-714-9555</a></p>
            </div>
            <div className="hidden md:block">
              <Link href="/">
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#ff9ecb] to-[#ffd7e8] text-black font-medium">חזור לדף הבית</button>
              </Link>
            </div>
          </div>

          <form onSubmit={submit} className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="שם" className="px-4 py-3 bg-pink-50 border border-pink-100 rounded-md outline-none focus:ring-2 focus:ring-[#ff9ecb]" />
              <input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="אימייל" type="email" className="px-4 py-3 bg-pink-50 border border-pink-100 rounded-md outline-none focus:ring-2 focus:ring-[#ff9ecb]" />
            </div>

            <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder="הודעה" rows={6} className="px-4 py-3 bg-pink-50 border border-pink-100 rounded-md outline-none focus:ring-2 focus:ring-[#ff9ecb]" />

            <div className="flex items-center justify-between">
              <button type="submit" disabled={sending} className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#ff9ecb] to-[#ffd7e8] text-black font-medium transform transition-transform hover:scale-105">
                {sending ? 'פותח את הדואר...' : 'שלחו הודעה'}
              </button>

              <div className="text-xs text-pink-300">או התקשרו: <a href="tel:0527149555" className="text-[#ff6fae]">052-714-9555</a></div>
            </div>
          </form>
        </motion.section>
      </div>
    </main>
  );
}
