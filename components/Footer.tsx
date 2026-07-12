"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white border-t border-pink-100 py-12 px-6"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* תאגיד */}
        <motion.a
          href="mailto:t4136401@gmail.com"
          whileHover={{ scale: 1.05 }}
          className="text-center md:text-left text-sm tracking-wider text-[#7e5b7b] hover:text-[#ffb4d8] transition-colors duration-300 cursor-pointer"
        >
          <span className="flex items-center gap-1 justify-center md:justify-start">
            {/* <span>Create with</span> */}
            <span className="text-[#ffb4d8] text-lg"></span>
            <span>Tamar Yagelnik</span>
          </span>
        </motion.a>

        {/* פרטי קשר */}
        <div className="flex items-center gap-6 text-sm text-[#7e5b7b]">
          <motion.a
            href="tel:0527149555"
            whileHover={{ color: "#ffb4d8" }}
            className="flex items-center gap-2 transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            <span>052-714-9555</span>
          </motion.a>

          <div className="w-px h-4 bg-pink-200/50"></div>

          <motion.a
            href="mailto:r0527149555@gmail.com"
            whileHover={{ color: "#ffb4d8" }}
            className="flex items-center gap-2 transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span>r0527149555@gmail.com</span>
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}
