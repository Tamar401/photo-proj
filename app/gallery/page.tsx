"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { id: "משפחה", name: "משפחה", image: "/משפחה/ארי 2 ביצהה.jpg" },
  { id: "ניו בורן", name: "ניו בורן", image: "/ניו בורן/12311-Edit.jpg" },
  { id: "סמאש קייק", name: "סמאש קייק", image: "/סמאש קייק/לאתר6 copy.jpg" },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen w-full bg-[#f8f8f8] text-[#331a34] antialiased m-0 p-0 block relative">
      {/* Hero Header */}
      <div className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
        <img
          src="/משפחה/לתמר.jpg"
          alt="Gallery Header"
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
            gallery
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative z-20 text-6xl md:text-8xl font-light text-white tracking-widest uppercase"
          >
            גלריה
          </motion.h1>
        </div>
      </div>

      <div className="w-full px-6 md:px-24 pt-12 pb-12 relative z-30 bg-[#fff4fb] flex flex-col items-center" style={{ marginTop: '-40px', borderRadius: '40px 40px 0 0' }}>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Link key={category.id} href={`/gallery/${category.id}`}>
              <motion.div
                className="relative overflow-hidden rounded-2xl cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* centered large label that grows and turns pink on hover */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-4xl md:text-5xl font-light tracking-widest text-white/90 transition-transform duration-400 transform group-hover:scale-110 group-hover:text-[#ffb4d8]">
                      {category.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
