"use client";

import { motion } from "framer-motion";

export default function HeartDecoration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileHover={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-3xl md:text-4xl"
      style={{ color: "#ffb4d8" }}
    >
      ♡
    </motion.div>
  );
}
