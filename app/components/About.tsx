"use client";
import { useState, useCallback, memo } from "react";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING, RESUME_LINK_PDF } from "../constants";
import Card3D from "./Card3D";
import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";

function About() {
  const { t } = useTranslation();
  const [downloading, setDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "starting" | "done" | "error"
  >("idle");

  // Trigger download without navigating away or opening a new tab
  const handleDownloadResume = useCallback(() => {
    setDownloading(true);
    setDownloadStatus("starting");
    // Use shared download utility (hidden iframe, fallback to same-tab nav)
    import("../utils/triggerDownload").then(({ triggerFileDownload }) =>
      triggerFileDownload(RESUME_LINK_PDF, {
        fallbackNavigate: true,
        onStatusChange: (s) => {
          setDownloadStatus(s);
          if (s === "done" || s === "error") setDownloading(false);
        },
      })
    );
  }, []);

  return (
    <section
      id="about"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding} relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-[#4fc3f7]/10 to-[#764ba2]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-[#764ba2]/10 to-[#4fc3f7]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-[1512px] mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12 sm:mb-14 md:mb-16"
        >
          {/* Decorative Element */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <Sparkles className="w-8 h-8 text-[#4fc3f7]" />
          </motion.div>

          <h2
            className={`${FONTS.body} font-extrabold text-3xl sm:text-4xl md:text-[45px] text-(--text-primary) tracking-tight md:tracking-[-1.35px] mb-3 relative`}
          >
            {t("about.title")}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#4fc3f7] to-[#764ba2] rounded-full"
            />
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-xs sm:text-sm md:text-[14px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent tracking-tight md:tracking-[-0.42px]`}
          >
            {t("about.subtitle")}
          </p>
        </motion.div>

        {/* Bio Text - Enhanced with Cards */}
        <div className="max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[840px] mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Card3D>
              <div className="bg-(--card-bg)/60 backdrop-blur-xl border border-(--border-color)/50 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl hover:border-(--accent-primary)/50 transition-all duration-500">
                <div
                  className={`${FONTS.body} font-medium text-sm sm:text-base md:text-[17px] text-(--text-secondary) leading-relaxed md:leading-[25px] space-y-4 sm:space-y-5 md:space-y-6`}
                >
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {t("about.paragraph1")}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {t("about.paragraph2")}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {t("about.paragraph3")}
                  </motion.p>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#4fc3f7]/20 to-transparent rounded-bl-full" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#764ba2]/20 to-transparent rounded-tr-full" />
              </div>
            </Card3D>
          </motion.div>
        </div>

        {/* Download Resume Button - Enhanced */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <Card3D>
            <motion.button
              type="button"
              onClick={handleDownloadResume}
              disabled={downloading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-[55px] px-8 py-3 sm:px-9 sm:py-4 md:px-10 md:py-[18.5px] ${FONTS.nav} font-medium text-sm sm:text-base md:text-[15px] text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300`}
            >
              {/* Animated Background Gradient */}
              <motion.div
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 bg-gradient-to-r from-[#4fc3f7] via-[#764ba2] to-[#4fc3f7] bg-[length:200%_100%]"
                style={{
                  backgroundSize: "200% 100%",
                }}
              />

              {/* Shimmer Effect */}
              <motion.div
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />

              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-3">
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
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                )}
                {downloading
                  ? t("about.downloading") || "Preparing download..."
                  : t("about.downloadResume")}
              </span>

              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4fc3f7] to-[#764ba2] rounded-[55px] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
            </motion.button>
          </Card3D>

          {/* Status Message */}
          <motion.div
            aria-live="polite"
            animate={{
              opacity: downloadStatus !== "idle" ? 1 : 0,
              y: downloadStatus !== "idle" ? 0 : -10,
            }}
            className={`${
              FONTS.body
            } text-[11px] sm:text-[12px] text-center px-4 py-2 rounded-full ${
              downloadStatus === "done"
                ? "bg-green-500/10 text-green-500"
                : downloadStatus === "error"
                ? "bg-red-500/10 text-red-500"
                : "bg-(--border-light)/50 text-(--text-dimmed)"
            }`}
          >
            {downloadStatus === "starting" &&
              (t("about.preparingFile") || "Preparing your file...")}
            {downloadStatus === "done" &&
              (t("about.ready") || "✓ Download started")}
            {downloadStatus === "error" &&
              (t("about.downloadError") ||
                "Couldn't start download, opening file instead...")}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(About);
