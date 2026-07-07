"use client";

import { motion } from "framer-motion";
import SiteHero from "../../components/SiteHero";

export default function About() {
  return (
    <main className="min-h-screen bg-white text-pink-600">
      <SiteHero title="אודות רחלי" subtitle="רחלי יוצרת תמונות שלוות וקולנועיות שמדגישות רגשות. העבודה משלבת תאורה מבוקרת ורגעים טבעיים לויזואל עדין ונתפס." />
      <div className="container-max px-6 py-16">
        <section className="grid md:grid-cols-2 gap-8">
          <div className="card">
            <h3 className="text-sm text-[#00d2ff] tracking-widest mb-2">השיטה</h3>
            <p className="muted">תכנון מוקפד, חיבור אמיתי והנחייה עדינה בשטח. כל סשן מתמקד בסיפור ובאסתטיקה נצחית.</p>
          </div>

          <div className="card">
            <h3 className="text-sm text-[#00ff87] tracking-widest mb-2">לקוחות</h3>
            <p className="muted">מותגים, זוגות ומשפחות המחפשים מראה ערוך, עדין וניתן לשימור.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
