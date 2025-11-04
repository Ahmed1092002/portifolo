"use client";

import { useTranslation } from "../i18n/useTranslation";

export default function Hero() {
  const { t } = useTranslation();
  const isVisible = true;

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-4 font-medium">
            {t("hero.subtitle")}
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {t("hero.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {t("hero.viewWork")}
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
            >
              {t("hero.getInTouch")}
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-20 animate-bounce">
          <a
            href="#about"
            className="inline-block text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Scroll to about section"
          >
            <svg
              className="w-6 h-6"
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
