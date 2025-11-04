"use client";

import { useTranslation } from "../i18n/useTranslation";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-black dark:bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-400">
          {t("footer.copyright", { year: new Date().getFullYear().toString() })}
        </p>
      </div>
    </footer>
  );
}

