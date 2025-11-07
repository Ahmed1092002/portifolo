"use client";
import { useEffect, useState, useCallback, useRef, memo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

// Throttle helper for performance
function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 300 }; // Faster response, less computation
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>(
    []
  );
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [cursorVariant, setCursorVariant] = useState<
    "default" | "text" | "link"
  >("default");

  const lastTrailUpdate = useRef<number>(0);
  const rafId = useRef<number | undefined>(undefined);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother updates
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);

        // Throttle trail updates - only update every 50ms
        const now = Date.now();
        if (now - lastTrailUpdate.current > 50) {
          lastTrailUpdate.current = now;

          setTrail((prev) => {
            const newPoint = { x: e.clientX, y: e.clientY, id: now };
            const filtered = prev.slice(-15); // Reduced from 25 to 15

            // Only add if moved enough distance from last point
            if (
              filtered.length === 0 ||
              Math.hypot(
                filtered[filtered.length - 1].x - e.clientX,
                filtered[filtered.length - 1].y - e.clientY
              ) > 15 // Increased spacing for fewer points
            ) {
              return [...filtered, newPoint];
            }
            return filtered;
          });
        }

        const target = e.target as HTMLElement;
        const computedStyle = window.getComputedStyle(target);
        const cursor = computedStyle.cursor;

        // Detect different cursor states
        const isClickable =
          cursor === "pointer" ||
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") !== null ||
          target.closest("button") !== null;

        const isText =
          cursor === "text" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA";

        setIsPointer(isClickable);

        if (isText) {
          setCursorVariant("text");
        } else if (isClickable) {
          setCursorVariant("link");
        } else {
          setCursorVariant("default");
        }
      });
    },
    [cursorX, cursorY]
  );

  const handleClick = useCallback((e: MouseEvent) => {
    // Limit ripples to max 3 for performance
    const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
    setRipples((prev) => [...prev.slice(-2), newRipple]); // Keep max 3 ripples

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  }, []);

  const handleMouseEnter = useCallback(() => setIsHidden(false), []);
  const handleMouseLeave = useCallback(() => setIsHidden(true), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick]);

  // No need for trail cleanup interval, handled in mousemove

  if (isHidden) return null;

  return (
    <>
      {/* Click Ripples - Reduced animations */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="fixed pointer-events-none z-9999 border-2 border-[#4fc3f7] rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            willChange: "transform, opacity",
          }}
          initial={{
            width: 10,
            height: 10,
            opacity: 1,
            x: -5,
            y: -5,
          }}
          animate={{
            width: 50,
            height: 50,
            opacity: 0,
            x: -25,
            y: -25,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Trail particles - Reduced for performance */}
      {trail.slice(-10).map((point, index) => {
        // Only render last 10
        const opacity = 1 - index / 10;
        const size = 10 - (index / 10) * 6;

        return (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none z-9998 rounded-full"
            style={{
              left: point.x,
              top: point.y,
              width: size,
              height: size,
              background: `radial-gradient(circle, rgba(79, 195, 247, ${
                opacity * 0.6
              }) 0%, rgba(118, 75, 162, ${opacity * 0.3}) 100%)`,
              transform: "translate(-50%, -50%)",
              opacity: opacity * 0.8,
              willChange: "transform, opacity",
            }}
          />
        );
      })}

      {/* Main cursor - Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-9999 mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          willChange: "transform",
        }}
        animate={{
          scale:
            cursorVariant === "link" ? 1.5 : cursorVariant === "text" ? 0.8 : 1,
          rotate: cursorVariant === "link" ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div
          className="relative"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              width: "40px",
              height: "40px",
              left: "-20px",
              top: "-20px",
            }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(79, 195, 247, 0.4)",
                "0 0 0 10px rgba(79, 195, 247, 0)",
                "0 0 0 0 rgba(79, 195, 247, 0)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          {/* Main ring */}
          <div
            className="border-2 rounded-full"
            style={{
              width: cursorVariant === "link" ? "36px" : "32px",
              height: cursorVariant === "link" ? "36px" : "32px",
              borderColor: cursorVariant === "link" ? "#764ba2" : "#4fc3f7",
              transition: "all 0.2s ease",
            }}
          />
        </div>
      </motion.div>

      {/* Inner cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-10000 rounded-full"
        style={{
          left: cursorX,
          top: cursorY,
          background:
            cursorVariant === "link"
              ? "linear-gradient(135deg, #4fc3f7, #764ba2)"
              : "#4fc3f7",
          willChange: "transform",
        }}
        animate={{
          width:
            cursorVariant === "link" ? 16 : cursorVariant === "text" ? 2 : 8,
          height:
            cursorVariant === "link" ? 16 : cursorVariant === "text" ? 20 : 8,
          x: cursorVariant === "link" ? -8 : cursorVariant === "text" ? -1 : -4,
          y:
            cursorVariant === "link" ? -8 : cursorVariant === "text" ? -10 : -4,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {/* Pulsing effect for link hover - Simplified */}
        {cursorVariant === "link" && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "linear-gradient(135deg, #4fc3f7, #764ba2)",
              willChange: "transform, opacity",
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.div>
    </>
  );
}

export default memo(CustomCursor);
