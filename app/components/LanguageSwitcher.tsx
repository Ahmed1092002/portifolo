"use client";

import { useLanguage } from "../i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          language === "en"
            ? "bg-blue-600 text-white"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("ar")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          language === "ar"
            ? "bg-blue-600 text-white"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`}
        aria-label="Switch to Arabic"
      >
        AR
      </button>
    </div>
  );
}

