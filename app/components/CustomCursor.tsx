"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>(
    []
  );

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Add trail effect
      setTrail((prev) => [
        ...prev.slice(-20),
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ]);

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "A" ||
          target.tagName === "BUTTON"
      );
    };

    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => prev.slice(-15));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Trail particles */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9999] rounded-full bg-cyan-400/20"
          style={{
            left: point.x,
            top: point.y,
            width: `${8 - index * 0.3}px`,
            height: `${8 - index * 0.3}px`,
            transform: "translate(-50%, -50%)",
            opacity: 1 - index * 0.05,
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      >
        <div className="w-8 h-8 border-2 border-cyan-400 rounded-full" />
      </div>

      {/* Inner cursor */}
      <div
        className="fixed pointer-events-none z-[9999] bg-cyan-400 rounded-full"
        style={{
          left: position.x,
          top: position.y,
          width: isPointer ? "12px" : "6px",
          height: isPointer ? "12px" : "6px",
          transform: "translate(-50%, -50%)",
          transition: "width 0.2s, height 0.2s",
        }}
      />
    </>
  );
}
