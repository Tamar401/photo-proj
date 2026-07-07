"use client";

import { motion } from "framer-motion";
import SiteHero from "../../components/SiteHero";

export default function Blog() {
  return (
    <main className="min-h-screen bg-white text-pink-600">
      <SiteHero title="Stories" subtitle="Short essays, behind-the-scenes notes and client stories — thoughtful and image-led reflections from sessions and projects." />
      <div className="container-max">
        <section className="grid gap-6">
          <article className="card">
            <h2 className="text-xl font-medium mb-2">The Light That Stayed</h2>
            <p className="muted">A short preview of a client session exploring golden hour tones and understated direction.</p>
            <div className="mt-4">
              <a href="#" className="text-[#00d2ff] hover:underline">Read more →</a>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
