"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FloatingCTA() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring" as const, stiffness: 260, damping: 20, delay: 1 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Link href="/contact">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-zinc-900 px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] backdrop-blur-md transition-colors hover:bg-zinc-200 font-hebrew"
        >
          דברו איתי
        </motion.button>
      </Link>
    </motion.div>
  );
}