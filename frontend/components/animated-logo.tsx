import React, { useState, useEffect } from 'react';

export default function AnimatedLogo() {
  const [shape, setShape] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setShape(prev => (prev + 1) % 3); // Change shape every 2 seconds
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const shapes = [
    "M12 11.5L17 9L12 6.5L7 9L12 11.5ZM12 11.5V17.5", // Diamond shape
    "M16 4L20 12H12L16 4Z", // Triangle shape
    "M12 2L2 22H22L12 2Z" // Pyramid shape
  ];

  return (
    <div className="logo-container">
      <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4, 4)">
          <path className="diamond" d={shapes[shape]} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </g>
      </svg>
      <style jsx>{`
        .logo-container {
          display: inline-block;
          color: #000000;
        }
        @media (prefers-color-scheme: dark) {
          .logo-container {
            color: #FFFFFF;
          }
        }
        .diamond {
          animation: morph 2s infinite alternate;
        }
        @keyframes morph {
          0% {
            d: path("M12 11.5L17 9L12 6.5L7 9L12 11.5ZM12 11.5V17.5");
          }
          50% {
            d: path("M16 4L20 12H12L16 4Z");
          }
          100% {
            d: path("M12 2L2 22H22L12 2Z");
          }
        }
      `}</style>
    </div>
  )
}


