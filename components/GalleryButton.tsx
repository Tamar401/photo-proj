"use client";

import { useState } from "react";

export default function GalleryButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes fillFromLeftToRight {
          0% {
            background-position: -100% center;
          }
          100% {
            background-position: 0% center;
          }
        }

        @keyframes fillBackToRight {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 100% center;
          }
        }

        .gallery-button {
          position: relative;
          display: inline-block;
          padding: 1rem 2.5rem;
          border: 2px solid #ffb4d8;
          border-radius: 9999px;
          background: linear-gradient(90deg, #ffb4d8 0%, #ffb4d8 50%, transparent 50%, transparent 100%);
          background-size: 200% 100%;
          background-position: 100% center;
          color: #ffb4d8;
          font-weight: 600;
          font-size: 1.125rem;
          letter-spacing: 0.1em;
          text-decoration: none;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.6s ease;
        }

        .gallery-button.hovered {
          animation: fillFromLeftToRight 0.6s ease-in-out forwards;
          color: white;
        }

        .gallery-button.unhovered {
          animation: fillBackToRight 0.6s ease-in-out forwards;
          color: #ffb4d8;
        }
      `}</style>
      <a
        href="/gallery"
        className={`gallery-button ${isHovered ? "hovered" : "unhovered"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        לגלריה
      </a>
    </>
  );
}
