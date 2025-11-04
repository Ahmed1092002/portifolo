"use client";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className={`min-h-screen relative flex items-center justify-center ${SPACING.containerPadding} pt-[105px] pb-16`}
    >
      {/* Background Pattern */}
      <div
        className="absolute top-[139px] left-1/2 -translate-x-1/2 w-[1025px] h-[764px] rounded-[500px] opacity-20 "
        style={{
          background:
            "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(79, 195, 247, 0.1) 35px, rgba(79, 195, 247, 0.1) 70px)",
        }}
      />

      <div className="max-w-[1512px] mx-auto text-center relative z-10">
        {/* Profile Image */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-[202px] h-[197px] rounded-full overflow-hidden border-4 border-[#4fc3f7]">
            <div className="w-full h-full bg-gradient-to-br from-[#4fc3f7] to-[#2196f3] flex items-center justify-center text-white text-6xl font-bold">
              G
            </div>
          </div>
        </div>

        {/* Name and Title */}
        <div className="mb-6">
          <h1
            className={`${FONTS.heading} font-bold text-[63px] text-white tracking-[-3.78px] mb-2`}
          >
            {t("hero.name")}
          </h1>
          <p
            className={`${FONTS.heading} font-semibold text-[26px] bg-gradient-to-r from-[#4fc3f7] to-[#f5f5f5] bg-clip-text text-transparent`}
          >
            {t("hero.title")}
          </p>
        </div>

        {/* Description */}
        <p
          className={`${FONTS.heading} font-medium text-[19px] text-[#e1e1e1] leading-[30px] max-w-[793px] mx-auto mb-12`}
        >
          {t("hero.description")}
        </p>

        {/* Contact Button */}
        <a
          href="#contact"
          className={`inline-block border border-[#4fc3f7] rounded-[75px] px-[50px] py-[18.5px] ${FONTS.nav} font-medium text-[15px] text-white hover:bg-[#4fc3f7] hover:shadow-lg transition-all duration-200`}
        >
          {t("hero.contactMe")}
        </a>

        {/* Scroll Indicator */}
        <div className="mt-20 flex justify-center">
          <a
            href="#about"
            className="inline-flex flex-col items-center text-gray-400 hover:text-[#4fc3f7] transition-colors"
            aria-label="Scroll to about section"
          >
            <div className="w-[40px] h-[60px] border-2 border-current rounded-full flex items-start justify-center p-2 mb-2">
              <div className="w-2 h-3 bg-current rounded-full animate-bounce"></div>
            </div>
            <svg
              className="w-6 h-6 animate-bounce"
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
