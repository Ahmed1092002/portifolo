"use client";

import { useState, useEffect, useCallback, memo, useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "../i18n/useTranslation";
import { useLanguage } from "../i18n/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { FONTS } from "../constants";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "education", href: "#education" },
  { key: "experience", href: "#experience" },
  { key: "projects", href: "#projects" },
] as const;

function Navigation() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const offsets = NAV_LINKS.map((link) => {
        const id = link.href.replace("#", "");
        const el = document.getElementById(id);
        if (!el) return { id, top: 0 };
        const rect = el.getBoundingClientRect();
        return { id, top: rect.top };
      });
      const current = offsets.findLast((o) => o.top <= 150) || offsets[0];
      setActiveSection(current.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setIsMobileMenuOpen(false);
    },
    []
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-(--background)/95 backdrop-blur-md shadow-lg border-b border-(--border-color)"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1512px] mx-auto px-4 sm:px-6 lg:px-[50px]">
        <div className="flex items-center justify-between h-[64px] sm:h-[72px] md:h-[80px]">
          {/* Logo with Animation */}
          <Link
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className={`${FONTS.logo} text-[24px] sm:text-[28px] md:text-[32px] text-(--text-primary) hover:text-(--accent-primary) transition-all duration-200 relative group`}
          >
            {t("hero.name")}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-(--accent-primary) group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 focus:outline-none hover:bg-(--accent-primary)/10 rounded-md transition-colors"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-6 h-0.5 bg-(--text-primary) transition-all ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-(--text-primary) transition-all ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-(--text-primary) transition-all ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`${
                  FONTS.nav
                } text-[16px] xl:text-[18px] transition-all duration-200 relative group ${
                  activeSection === link.href.replace("#", "")
                    ? "font-semibold text-(--accent-primary)"
                    : "font-medium text-(--text-muted) hover:text-(--accent-primary)"
                }`}
              >
                {t(`nav.${link.key}`) ||
                  link.key.charAt(0).toUpperCase() + link.key.slice(1)}
                {activeSection === link.href.replace("#", "") && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-(--accent-primary)"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Download CV Button - Primary */}
            <a
              href={process.env.NEXT_PUBLIC_RESUME_LINK_PDF}
              download
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex items-center gap-2 bg-(--accent-primary) text-white rounded-lg px-5 py-2.5 ${FONTS.nav} font-medium text-[15px] overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,195,247,0.4)] hover:scale-105`}
            >
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <svg
                className="w-4 h-4 relative z-10 group-hover:animate-bounce"
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
              <span className="relative z-10">CV</span>
            </a>

            {/* Settings Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  isSettingsOpen
                    ? "bg-(--accent-primary)/20 text-(--accent-primary)"
                    : "hover:bg-(--accent-primary)/10 text-(--text-primary)"
                }`}
                aria-label="Settings"
              >
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${
                    isSettingsOpen ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              {/* Settings Dropdown Menu */}
              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute mt-2 w-56 bg-(--background) border border-(--border-color) rounded-xl shadow-2xl overflow-hidden backdrop-blur-md z-50 ${
                      language === "ar" ? "left-0" : "right-0"
                    }`}
                  >
                    {/* Theme Toggle */}
                    <button
                      onClick={() => {
                        toggleTheme();
                        setIsSettingsOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-(--accent-primary)/10 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        {theme === "dark" ? (
                          <svg
                            className="w-5 h-5 text-(--accent-primary)"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5 text-(--accent-primary)"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                            />
                          </svg>
                        )}
                        <span className="text-sm font-medium text-(--text-primary)">
                          {theme === "dark" ? "Light Mode" : "Dark Mode"}
                        </span>
                      </div>
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    <div className="h-px bg-(--border-color)" />

                    {/* Language Section */}
                    <div className="p-3">
                      <p className="text-xs text-(--text-secondary) px-2 py-1 font-semibold uppercase tracking-wide">
                        Language
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => {
                            setLanguage("en");
                            setIsSettingsOpen(false);
                          }}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            language === "en"
                              ? "bg-(--accent-primary) text-white shadow-md"
                              : "bg-(--background) border border-(--border-color) text-(--text-primary) hover:bg-(--accent-primary)/10"
                          }`}
                        >
                          EN
                        </button>
                        <button
                          onClick={() => {
                            setLanguage("ar");
                            setIsSettingsOpen(false);
                          }}
                          className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            language === "ar"
                              ? "bg-(--accent-primary) text-white shadow-md"
                              : "bg-(--background) border border-(--border-color) text-(--text-primary) hover:bg-(--accent-primary)/10"
                          }`}
                        >
                          AR
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-(--border-color) bg-(--background)/98 backdrop-blur-md overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`block ${
                      FONTS.nav
                    } font-medium text-[16px] px-4 py-3 rounded-lg transition-all ${
                      activeSection === link.href.replace("#", "")
                        ? "text-(--accent-primary) bg-(--accent-primary)/10"
                        : "text-(--text-muted) hover:text-(--accent-primary) hover:bg-(--accent-primary)/5"
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                  </motion.a>
                ))}

                {/* Download CV Button - Mobile */}
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  href={process.env.NEXT_PUBLIC_RESUME_LINK_PDF}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-center gap-2 bg-(--accent-primary) text-white rounded-lg px-5 py-3 mx-4 mt-3 ${FONTS.nav} font-medium text-[15px] hover:shadow-[0_0_20px_rgba(79,195,247,0.4)] transition-all`}
                >
                  <svg
                    className="w-4 h-4"
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
                  {t("nav.downloadCV") || "Download CV"}
                </motion.a>

                <div className="border-t border-(--border-color) mt-4 pt-4 mx-4">
                  {/* Theme Toggle Mobile */}
                  <button
                    onClick={toggleTheme}
                    className="w-full px-4 py-3 text-left hover:bg-(--accent-primary)/10 transition-colors flex items-center gap-3 rounded-lg"
                  >
                    {theme === "dark" ? (
                      <svg
                        className="w-5 h-5 text-(--accent-primary)"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-(--accent-primary)"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    )}
                    <span className="text-sm font-medium text-(--text-primary)">
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </span>
                  </button>

                  {/* Language Mobile */}
                  <div className="mt-3">
                    <p className="text-xs text-(--text-secondary) px-4 mb-2 font-semibold uppercase tracking-wide">
                      Language
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setLanguage("en")}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          language === "en"
                            ? "bg-(--accent-primary) text-white"
                            : "bg-(--background) border border-(--border-color) text-(--text-primary)"
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLanguage("ar")}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          language === "ar"
                            ? "bg-(--accent-primary) text-white"
                            : "bg-(--background) border border-(--border-color) text-(--text-primary)"
                        }`}
                      >
                        AR
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default memo(Navigation);
