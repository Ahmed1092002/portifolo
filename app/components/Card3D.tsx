"use client";
import { useRef, useState, MouseEvent, ReactNode } from "react";

interface Card3DProps {
  children: ReactNode;
  className?: string;
}

export default function Card3D({ children, className = "" }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          isHovering ? "translateZ(20px)" : ""
        }`,
        transition: isHovering
          ? "transform 0.1s ease-out"
          : "transform 0.3s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Glass morphism overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg pointer-events-none"
        style={{
          transform: "translateZ(1px)",
        }}
      />

      {/* Shine effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg"
        style={{
          background: `radial-gradient(circle at ${
            ((rotateY + 10) / 20) * 100
          }% ${
            ((rotateX + 10) / 20) * 100
          }%, rgba(79, 195, 247, 0.2) 0%, transparent 60%)`,
          transform: "translateZ(2px)",
        }}
      />

      {children}
    </div>
  );
}
