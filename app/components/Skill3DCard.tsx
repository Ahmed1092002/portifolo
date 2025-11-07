"use client";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface Skill3DCardProps {
  skill: {
    name: string;
    level: number;
    icon?: string;
  };
  index: number;
}

export default function Skill3DCard({ skill, index }: Skill3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -15;
    const rotateYValue = ((x - centerX) / centerX) * 15;

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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative group"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          isHovering ? "translateZ(30px)" : ""
        }`,
        transition: isHovering
          ? "transform 0.1s ease-out"
          : "transform 0.5s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Card Background */}
      <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl p-6 overflow-hidden">
        {/* Animated gradient overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${
              ((rotateY + 15) / 30) * 100
            }% ${
              ((rotateX + 15) / 30) * 100
            }%, rgba(79, 195, 247, 0.15) 0%, transparent 70%)`,
            transform: "translateZ(1px)",
          }}
        />

        {/* Icon */}
        {skill.icon && (
          <div
            className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300"
            style={{ transform: "translateZ(20px)" }}
          >
            {skill.icon}
          </div>
        )}

        {/* Skill Name */}
        <h3
          className="text-lg font-semibold text-(--text-primary) mb-3"
          style={{ transform: "translateZ(15px)" }}
        >
          {skill.name}
        </h3>

        {/* Progress Bar */}
        <div
          className="relative h-2 bg-white/5 rounded-full overflow-hidden"
          style={{ transform: "translateZ(10px)" }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
              delay: index * 0.1 + 0.3,
              ease: "easeOut",
            }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ["-100%", "400%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Level percentage */}
        <motion.p
          className="text-sm text-(--text-secondary) mt-2 text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.5 }}
          style={{ transform: "translateZ(10px)" }}
        >
          {skill.level}%
        </motion.p>

        {/* Floating particles on hover */}
        {isHovering && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: "100%",
                  opacity: 0,
                }}
                animate={{
                  y: "-100%",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* 3D Shadow */}
      <div
        className="absolute inset-0 bg-cyan-500/10 rounded-xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          transform: `translateZ(-20px) translateY(${
            rotateX * 2
          }px) translateX(${rotateY * 2}px)`,
        }}
      />
    </motion.div>
  );
}
