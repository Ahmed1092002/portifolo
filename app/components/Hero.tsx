"use client";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING, RESUME_LINK_PDF } from "../constants";
import Card3D from "./Card3D";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Typewriter from "./Typewriter";
import Parallax from "./Parallax";
import { Sparkles, Star } from "lucide-react";
import { memo, useCallback, useRef, useState } from "react";
import Image from "next/image";
import { triggerFileDownload } from "../utils/triggerDownload";

function Hero() {
  const { t } = useTranslation();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  // Faster spring for less computation
  const springX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 25 });
  const [downloading, setDownloading] = useState(false);

  const rafId = useRef<number | undefined>(undefined);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      // Capture values before RAF to avoid synthetic event pooling issues
      const currentTarget = e.currentTarget as HTMLElement;
      const clientX = e.clientX;
      const clientY = e.clientY;

      // Use requestAnimationFrame for smoother parallax
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const rect = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - rect.left - rect.width / 2) / 20);
        mouseY.set((clientY - rect.top - rect.height / 2) / 20);
      });
    },
    [mouseX, mouseY]
  );

  return (
    <section
      id="home"
      className={`min-h-screen relative flex items-center justify-center ${SPACING.containerPadding} pt-20 sm:pt-24 md:pt-[105px] pb-8 sm:pb-12 md:pb-16 overflow-hidden`}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30 will-change-transform"
        style={{ willChange: "background" }}
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(79, 195, 247, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(79, 195, 247, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(79, 195, 247, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating Stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 30}%`,
            top: `${25 + (i % 2) * 30}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          <Star
            className="w-4 h-4 sm:w-5 sm:h-5 text-[#4fc3f7]"
            fill="#4fc3f7"
          />
        </motion.div>
      ))}

      {/* Background Pattern */}
      <div
        className="absolute top-[80px] sm:top-[100px] md:top-[139px] left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[600px] lg:w-[1025px] lg:h-[764px] rounded-[500px] opacity-10 md:opacity-20"
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(79, 195, 247, 0.1) 35px, rgba(79, 195, 247, 0.1) 70px)",
        }}
      />

      <div className="max-w-[1512px] mx-auto text-center relative z-10 px-4">
        {/* Profile Image */}
        <Parallax speed={-0.3} className="pt-4">
          <motion.div
            className="flex justify-center mb-6 sm:mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1,
            }}
            style={{
              x: springX,
              y: springY,
            }}
          >
            <div className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[250px]">
              {/* Rotating Border */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(45deg, #4fc3f7, #00bcd4, #4fc3f7)",
                  padding: "3px",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-(--background) rounded-full" />
              </motion.div>

              {/* Image with Glow */}
              <motion.div
                className="absolute inset-[3px] rounded-full overflow-hidden gpu-accelerate"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(79, 195, 247, 0.3)",
                    "0 0 60px rgba(79, 195, 247, 0.6)",
                    "0 0 20px rgba(79, 195, 247, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Image
                  src="/Photoroom-20240702_185228_transparent.png"
                  alt="Profile Picture"
                  className="w-full h-full object-contain"
                  width={250}
                  height={250}
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </Parallax>

        {/* Name and Title */}
        <div className="mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-4"
          >
            <h1
              className={`${FONTS.heading} font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[63px] text-(--text-primary) tracking-tight md:tracking-[-3.78px] relative inline-block`}
            >
              {t("hero.name")}
              {/* Animated Underline */}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #4fc3f7, #764ba2, #4fc3f7)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
              />
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <motion.span
              className="text-lg sm:text-xl md:text-2xl lg:text-[26px] text-(--text-secondary)"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.span>
            <Typewriter
              words={[t("hero.title"), "Flutter Developer", "React Developer"]}
              className={`${FONTS.heading} text-lg sm:text-xl md:text-2xl lg:text-[26px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent font-semibold`}
            />
          </motion.div>
        </div>

        {/* Description */}
        <motion.p
          className={`${FONTS.heading} font-medium text-sm sm:text-base md:text-lg lg:text-[19px] text-(--text-secondary) leading-relaxed md:leading-[30px] max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[793px] mx-auto mb-8 sm:mb-10 md:mb-12`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {t("hero.description")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          {/* Primary CTA - Enhanced */}
          <Card3D className="inline-block">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-[75px] px-8 py-3 sm:px-10 sm:py-4 md:px-[50px] md:py-[18.5px] ${FONTS.nav} font-medium text-sm sm:text-base md:text-[15px] text-white`}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-[#4fc3f7] via-[#764ba2] to-[#4fc3f7] bg-[length:200%_100%]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                {t("hero.contactMe")}
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-linear-to-r from-[#4fc3f7] to-[#764ba2] rounded-[75px] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </motion.a>
          </Card3D>

          {/* Secondary CTA - Enhanced */}
          <Card3D className="inline-block">
            <motion.button
              type="button"
              onClick={() => {
                setDownloading(true);
                triggerFileDownload(RESUME_LINK_PDF, {
                  fallbackNavigate: true,
                  onStatusChange: (status) => {
                    if (status === "done" || status === "error") {
                      setDownloading(false);
                    }
                  },
                });
              }}
              disabled={downloading}
              whileHover={{ scale: downloading ? 1 : 1.05 }}
              whileTap={{ scale: downloading ? 1 : 0.95 }}
              className={`group relative inline-flex items-center gap-2 border-2 border-(--accent-primary) rounded-[75px] px-8 py-3 sm:px-10 sm:py-4 md:px-[50px] md:py-[18.5px] ${FONTS.nav} font-medium text-sm sm:text-base md:text-[15px] text-(--text-primary) bg-(--background)/50 backdrop-blur-sm hover:bg-(--accent-primary)/10 transition-all duration-300 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-linear-to-r from-[#4fc3f7]/0 via-[#4fc3f7]/10 to-[#764ba2]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                {downloading ? (
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </motion.svg>
                ) : (
                  <svg
                    className="w-4 h-4 group-hover:animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                )}
                {downloading
                  ? t("about.downloading") || "Preparing..."
                  : "Download CV"}
              </span>
            </motion.button>
          </Card3D>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className="text-sm text-(--text-secondary)">Follow me:</span>
          <div className="flex gap-3">
            {/* GitHub */}
            <a
              href="https://github.com/Ahmed1092002"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-(--background)/50 border border-(--border-color) hover:border-(--accent-primary) hover:bg-(--accent-primary)/10 transition-all"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/ahmedtamer109"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-(--background)/50 border border-(--border-color) hover:border-(--accent-primary) hover:bg-(--accent-primary)/10 transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex justify-center"
        >
          <a
            href="#about"
            className="inline-flex flex-col items-center text-gray-400 hover:text-[#4fc3f7] transition-colors group"
            aria-label="Scroll to about section"
          >
            <div className="w-[30px] h-[50px] sm:w-[35px] sm:h-[55px] md:w-10 md:h-[60px] border-2 border-current rounded-full flex items-start justify-center p-2 mb-2">
              <div className="w-1.5 h-2.5 sm:w-2 sm:h-3 bg-current rounded-full animate-bounce"></div>
            </div>
            <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              Scroll Down
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Hero);
