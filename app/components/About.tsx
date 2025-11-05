"use client";
import { useState } from "react";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING, RESUME_LINK_PDF } from "../constants";

export default function About() {
  const { t } = useTranslation();
  const [downloading, setDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "starting" | "done" | "error"
  >("idle");

  // Trigger download without navigating away or opening a new tab
  const handleDownloadResume = () => {
    setDownloading(true);
    setDownloadStatus("starting");
    try {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      let finished = false;

      // Fallback: Some browsers may not fire events for downloads
      const timeoutId = window.setTimeout(() => {
        if (finished) return;
        finished = true;
        setDownloadStatus("done");
        setDownloading(false);
        try {
          document.body.removeChild(iframe);
        } catch {}
      }, 12_000);

      // Success handler
      const onLoad = () => {
        if (finished) return;
        finished = true;
        window.clearTimeout(timeoutId);
        setDownloadStatus("done");
        setDownloading(false);
        try {
          document.body.removeChild(iframe);
        } catch {}
      };

      // Error handler (rare for downloads, but keep just in case)
      const onError = () => {
        if (finished) return;
        finished = true;
        window.clearTimeout(timeoutId);
        setDownloadStatus("error");
        setDownloading(false);
        try {
          document.body.removeChild(iframe);
        } catch {}
        // last-resort fallback: same-tab navigation
        window.location.href = RESUME_LINK_PDF;
      };

      iframe.addEventListener("load", onLoad);
      iframe.addEventListener("error", onError);
      iframe.src = RESUME_LINK_PDF;
      document.body.appendChild(iframe);
    } catch {
      // Fallback: navigate in the same tab (last resort)
      setDownloading(false);
      setDownloadStatus("error");
      window.location.href = RESUME_LINK_PDF;
    }
  };

  return (
    <section
      id="about"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding}`}
    >
      <div className="max-w-[1512px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-8 sm:mb-10 md:mb-12">
          <h2
            className={`${FONTS.body} font-extrabold text-3xl sm:text-4xl md:text-[45px] text-(--text-primary) tracking-tight md:tracking-[-1.35px] mb-2`}
          >
            {t("about.title")}
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-xs sm:text-sm md:text-[14px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent tracking-tight md:tracking-[-0.42px]`}
          >
            {t("about.subtitle")}
          </p>
        </div>

        {/* Bio Text */}
        <div className="max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[840px] mx-auto">
          <div
            className={`${FONTS.body} font-medium text-sm sm:text-base md:text-[17px] text-(--text-secondary) leading-relaxed md:leading-[25px] text-center space-y-4 sm:space-y-5 md:space-y-6`}
          >
            <p>{t("about.paragraph1")}</p>
            <p>{t("about.paragraph2")}</p>
            <p>{t("about.paragraph3")}</p>
          </div>
        </div>

        {/* Download Resume Button */}
        <div className="flex flex-col items-center mt-10 sm:mt-12 md:mt-16 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={handleDownloadResume}
            disabled={downloading}
            className={`inline-flex items-center gap-2 border border-(--accent-primary) rounded-[55px] px-8 py-3 sm:px-9 sm:py-4 md:px-10 md:py-[18.5px] ${FONTS.nav} font-medium text-sm sm:text-base md:text-[15px] text-(--text-primary) hover:bg-(--accent-primary) transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {downloading && (
              <svg
                className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
              </svg>
            )}
            {downloading
              ? t("about.downloading") || "Preparing download..."
              : t("about.downloadResume")}
          </button>
          <div
            aria-live="polite"
            className={`${FONTS.body} text-[11px] sm:text-[12px] text-(--text-dimmed) text-center`}
          >
            {downloadStatus === "starting" &&
              (t("about.preparingFile") || "Preparing your file...")}
            {downloadStatus === "done" &&
              (t("about.ready") || "Download started")}
            {downloadStatus === "error" &&
              (t("about.downloadError") ||
                "Couldn't start download, opening file instead...")}
          </div>
        </div>
      </div>
    </section>
  );
}
