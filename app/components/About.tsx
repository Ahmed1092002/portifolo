"use client";

import { useTranslation } from "../i18n/useTranslation";

export default function About() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t("about.title")}
        </h2>
        <div className="max-w-3xl mx-auto mt-12">
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {t("about.paragraph1")}
          </p>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {t("about.paragraph2")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {t("about.frontend.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("about.frontend.description")}
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
              <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {t("about.backend.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("about.backend.description")}
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20">
              <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                {t("about.design.title")}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t("about.design.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
