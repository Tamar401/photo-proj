"use client";

import { motion } from "framer-motion";

export default function Testimonial({ quote, author }: { quote: string; author: string }) {
  return (
    <motion.blockquote initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-pink-50 p-6 rounded-lg shadow-lg">
      <p className="text-pink-600 italic">“{quote}”</p>
      <footer className="text-pink-300 text-sm mt-4">— {author}</footer>
    </motion.blockquote>
  );
}
