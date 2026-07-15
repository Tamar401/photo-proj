"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleStartDragging = () => setIsDragging(true);
  const handleStopDragging = () => setIsDragging(false);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const newPos = (x / rect.width) * 100;
      setSliderPos(Math.max(0, Math.min(100, newPos)));
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleStopDragging);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleStopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleStopDragging);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleStopDragging);
    };
  }, [isDragging]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-5xl mx-auto relative overflow-hidden rounded-2xl cursor-col-resize select-none"
      onMouseDown={handleStartDragging}
      onTouchStart={handleStartDragging}
      style={{ aspectRatio: "16/9" }}
    >
      {/* תמונה תחתונה - אחרי (תופסת את כל הרקע) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/אחרי.jpg"
          alt="After"
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 right-4 bg-black/50 text-white px-4 py-2 rounded text-sm font-medium z-10">
          אחרי
        </div>
      </div>

      {/* תמונה עליונה - לפני (הרוחב שלה נחתך דינמית) */}
      <div
        className="absolute inset-y-0 left-0 h-full overflow-hidden z-10"
        style={{ width: `${sliderPos}%` }}
      >
        {/* שימי לב: מוגדר רוחב קשיח של המיכל הראשי כדי למנוע כיווץ של התמונה */}
        <div
          className="h-full relative"
          style={{ width: containerRef.current?.getBoundingClientRect().width || "100%" }}
        >
          <img
            src="/לפני.JPG"
            alt="Before"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        </div>
        <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded text-sm font-medium">
          לפני
        </div>
      </div>

      {/* קו הגרירה והכפתור */}
      <div
        className="absolute inset-y-0 z-30 w-1 bg-gradient-to-b from-[#ffb4d8] via-white to-[#ffb4d8] shadow-xl cursor-col-resize group hover:w-1.5 transition-all"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        {/* כפתור הגרירה העגול במרכז */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-3 border-[#ffb4d8] hover:scale-110 transition-transform select-none pointer-events-none">
          <div className="flex gap-1.5 text-[#ffb4d8]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19l7-7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}