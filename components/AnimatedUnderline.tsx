"use client";

import { motion } from "framer-motion";

export default function AnimatedUnderline() {
  return (
    <motion.div
      className="h-1 bg-[#ffb4d8] rounded-full"
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    />
  );
}
