"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speedX: number;
  speedY: number;
  speedZ: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  shape: "cube" | "circle" | "triangle" | "hexagon" | "star";
}

export default function FloatingShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createParticle = (): Particle => {
      // Theme-aware colors
      const isDark = theme === "dark";
      const colors = isDark
        ? [
            "rgba(79, 195, 247, 0.15)", // Cyan
            "rgba(118, 75, 162, 0.15)", // Purple
            "rgba(100, 181, 246, 0.15)", // Light Blue
            "rgba(156, 39, 176, 0.15)", // Deep Purple
            "rgba(3, 169, 244, 0.15)", // Sky Blue
          ]
        : [
            "rgba(79, 195, 247, 0.25)", // Cyan (more opaque for light mode)
            "rgba(118, 75, 162, 0.25)", // Purple
            "rgba(100, 181, 246, 0.25)", // Light Blue
            "rgba(156, 39, 176, 0.25)", // Deep Purple
            "rgba(3, 169, 244, 0.25)", // Sky Blue
          ];

      const shapes: Array<"cube" | "circle" | "triangle" | "hexagon" | "star"> =
        ["cube", "circle", "triangle", "hexagon", "star"];

      return {
        x: Math.random() * (canvas?.width || window.innerWidth),
        y: Math.random() * (canvas?.height || window.innerHeight),
        z: Math.random() * 1000,
        size: Math.random() * 35 + 15,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        speedZ: (Math.random() - 0.5) * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      };
    };

    const updateParticle = (p: Particle) => {
      if (!canvas) return;
      p.x += p.speedX;
      p.y += p.speedY;
      p.z += p.speedZ;
      p.rotation += p.rotationSpeed;

      if (p.x > canvas.width) p.x = 0;
      if (p.x < 0) p.x = canvas.width;
      if (p.y > canvas.height) p.y = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.z > 1000) p.z = 0;
      if (p.z < 0) p.z = 1000;
    };

    const drawParticle = (p: Particle) => {
      if (!ctx || !canvas) return;

      const scale = 1000 / (1000 + p.z);
      const x2d = p.x * scale + (canvas.width / 2) * (1 - scale);
      const y2d = p.y * scale + (canvas.height / 2) * (1 - scale);
      const size2d = p.size * scale;

      ctx.save();
      ctx.translate(x2d, y2d);
      ctx.rotate(p.rotation);

      // Adjust opacity based on theme
      const isDark = theme === "dark";
      ctx.globalAlpha = isDark ? 0.4 * scale : 0.6 * scale;

      ctx.strokeStyle = p.color;
      ctx.fillStyle = p.color;
      ctx.lineWidth = isDark ? 2 * scale : 2.5 * scale;

      // Draw different shapes
      switch (p.shape) {
        case "cube":
          // Front face
          ctx.strokeRect(-size2d / 2, -size2d / 2, size2d, size2d);
          // Add depth lines
          const depth = size2d * 0.3;
          ctx.beginPath();
          ctx.moveTo(-size2d / 2, -size2d / 2);
          ctx.lineTo(-size2d / 2 + depth, -size2d / 2 - depth);
          ctx.moveTo(size2d / 2, -size2d / 2);
          ctx.lineTo(size2d / 2 + depth, -size2d / 2 - depth);
          ctx.moveTo(size2d / 2, size2d / 2);
          ctx.lineTo(size2d / 2 + depth, size2d / 2 - depth);
          ctx.moveTo(-size2d / 2, size2d / 2);
          ctx.lineTo(-size2d / 2 + depth, size2d / 2 - depth);
          ctx.stroke();
          // Back face
          ctx.strokeRect(
            -size2d / 2 + depth,
            -size2d / 2 - depth,
            size2d,
            size2d
          );
          break;

        case "circle":
          // Outer circle
          ctx.beginPath();
          ctx.arc(0, 0, size2d / 2, 0, Math.PI * 2);
          ctx.stroke();
          // Inner circle for depth
          ctx.beginPath();
          ctx.arc(0, 0, size2d / 3, 0, Math.PI * 2);
          ctx.stroke();
          // Connecting lines
          ctx.beginPath();
          ctx.moveTo(size2d / 3, 0);
          ctx.lineTo(size2d / 2, 0);
          ctx.moveTo(0, size2d / 3);
          ctx.lineTo(0, size2d / 2);
          ctx.moveTo(-size2d / 3, 0);
          ctx.lineTo(-size2d / 2, 0);
          ctx.moveTo(0, -size2d / 3);
          ctx.lineTo(0, -size2d / 2);
          ctx.stroke();
          break;

        case "triangle":
          // Front triangle
          ctx.beginPath();
          ctx.moveTo(0, -size2d / 2);
          ctx.lineTo(size2d / 2, size2d / 2);
          ctx.lineTo(-size2d / 2, size2d / 2);
          ctx.closePath();
          ctx.stroke();
          // Back triangle for 3D effect
          const triDepth = size2d * 0.25;
          ctx.beginPath();
          ctx.moveTo(triDepth, -size2d / 2 - triDepth);
          ctx.lineTo(size2d / 2 + triDepth, size2d / 2 - triDepth);
          ctx.lineTo(-size2d / 2 + triDepth, size2d / 2 - triDepth);
          ctx.closePath();
          ctx.stroke();
          // Connect front and back
          ctx.beginPath();
          ctx.moveTo(0, -size2d / 2);
          ctx.lineTo(triDepth, -size2d / 2 - triDepth);
          ctx.stroke();
          break;

        case "hexagon":
          const drawHex = (radius: number) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
              const angle = (Math.PI / 3) * i;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
          };
          // Outer hexagon
          drawHex(size2d / 2);
          // Inner hexagon for depth
          drawHex(size2d / 3);
          break;

        case "star":
          const drawStar = (radius: number) => {
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
              const angle = (Math.PI / 2.5) * i - Math.PI / 2;
              const x = radius * Math.cos(angle);
              const y = radius * Math.sin(angle);
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
          };
          // Outer star
          drawStar(size2d / 2);
          // Inner star for depth
          drawStar(size2d / 3.5);
          break;
      }

      ctx.restore();
    };

    // Create particles - increased count for more variety
    const particles: Particle[] = [];
    for (let i = 0; i < 20; i++) {
      particles.push(createParticle());
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [theme]); // Re-run when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: theme === "dark" ? 0.5 : 0.7 }}
    />
  );
}
