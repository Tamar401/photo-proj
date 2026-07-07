"use client";

export default function FloatingCTA() {
  return (
    <a href="/contact" aria-label="Contact page" className="fixed bottom-8 right-8 z-50">
      <div className="bg-gradient-to-br from-[#00d2ff] to-[#00ff87] text-black font-medium px-5 py-3 rounded-full shadow-2xl transform transition-all hover:scale-105 flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span>קבעו סשן</span>
      </div>
    </a>
  );
}
