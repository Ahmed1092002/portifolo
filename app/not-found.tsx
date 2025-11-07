"use client";

import Link from "next/link";
import { useTranslation } from "./i18n/useTranslation";
import { FONTS, SPACING } from "./constants";
import Card3D from "./components/Card3D";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-(--background) ${SPACING.containerPadding}`}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1
            className={`${FONTS.heading} font-bold text-[120px] sm:text-[180px] md:text-[240px] text-(--accent-primary) opacity-20 leading-none select-none`}
          >
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2
                className={`${FONTS.heading} font-semibold text-3xl sm:text-4xl md:text-5xl text-(--text-primary) mb-4`}
              >
                {t("notFound.title") || "Page Not Found"}
              </h2>
              <p
                className={`${FONTS.body} text-base sm:text-lg md:text-xl text-(--text-muted) mb-8 px-4`}
              >
                {t("notFound.description") ||
                  "Sorry, the page you're looking for doesn't exist or has been moved."}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
          <Card3D>
            <Link
              href="/"
              className={`${FONTS.button} px-8 py-4 bg-(--accent-primary) text-white rounded-lg font-medium text-lg hover:shadow-[0_0_30px_rgba(79,195,247,0.5)] transition-all duration-300 inline-block`}
            >
              {t("notFound.goHome") || "Go to Homepage"}
            </Link>
          </Card3D>

          <Card3D>
            <button
              onClick={() => window.history.back()}
              className={`${FONTS.button} px-8 py-4 border-2 border-(--border-light) text-(--text-primary) rounded-lg font-medium text-lg hover:border-(--accent-primary) hover:shadow-[0_0_20px_rgba(79,195,247,0.3)] transition-all duration-300`}
            >
              {t("notFound.goBack") || "Go Back"}
            </button>
          </Card3D>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex items-center justify-center gap-8 text-(--text-dimmed)">
          <svg
            className="w-12 h-12 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
