"use client";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";
import Card3D from "./Card3D";
import { motion } from "framer-motion";
import Typewriter from "./Typewriter";
import Parallax from "./Parallax";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className={`min-h-screen relative flex items-center justify-center ${SPACING.containerPadding} pt-20 sm:pt-24 md:pt-[105px] pb-8 sm:pb-12 md:pb-16`}
    >
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
        <Parallax speed={-0.3}>
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
          >
            <div className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[250px] overflow-hidden">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(79, 195, 247, 0.3)",
                    "0 0 60px rgba(79, 195, 247, 0.6)",
                    "0 0 20px rgba(79, 195, 247, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-full h-full rounded-full"
              >
                <img
                  src="/Photoroom-20240702_185228_transparent.png"
                  alt="Profile Picture"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        </Parallax>

        {/* Name and Title */}
        <div className="mb-4 sm:mb-6">
          <motion.h1
            className={`${FONTS.heading} font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[63px] text-(--text-primary) tracking-tight md:tracking-[-3.78px] mb-2`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t("hero.name")}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Typewriter
              words={[
                t("hero.title"),
                "Flutter Developer",
                "React Developer",
                "Full Stack Engineer",
              ]}
              className={`${FONTS.heading} text-lg sm:text-xl md:text-2xl lg:text-[26px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent`}
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

        {/* Contact Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card3D className="inline-block">
            <a
              href="#contact"
              className={`inline-block border-2 border-(--accent-primary) rounded-[75px] px-8 py-3 sm:px-10 sm:py-4 md:px-[50px] md:py-[18.5px] ${FONTS.nav} font-medium text-sm sm:text-base md:text-[15px] text-(--text-primary) bg-(--background)/50 backdrop-blur-sm hover:bg-(--accent-primary) hover:shadow-[0_0_30px_rgba(79,195,247,0.5)] transition-all duration-200`}
            >
              {t("hero.contactMe")}
            </a>
          </Card3D>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="mt-12 sm:mt-16 md:mt-20 flex justify-center">
          <a
            href="#about"
            className="inline-flex flex-col items-center text-gray-400 hover:text-[#4fc3f7] transition-colors"
            aria-label="Scroll to about section"
          >
            <div className="w-[30px] h-[50px] sm:w-[35px] sm:h-[55px] md:w-[40px] md:h-[60px] border-2 border-current rounded-full flex items-start justify-center p-2 mb-2">
              <div className="w-1.5 h-2.5 sm:w-2 sm:h-3 bg-current rounded-full animate-bounce"></div>
            </div>
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
