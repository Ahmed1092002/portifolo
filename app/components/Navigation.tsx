"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "../i18n/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { FONTS } from "../constants";

export default function Navigation() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navLinks = [
    { key: "home", href: "#home" },
    { key: "about", href: "#about" },
    { key: "education", href: "#education" },
    { key: "experience", href: "#experience" },
    { key: "projects", href: "#projects" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Scrollspy logic
      const offsets = navLinks.map((link) => {
        const id = link.href.replace("#", "");
        const el = document.getElementById(id);
        if (!el) return { id, top: 0 };
        const rect = el.getBoundingClientRect();
        return { id, top: rect.top };
      });
      const current = offsets.findLast((o) => o.top <= 150) || offsets[0];
      setActiveSection(current.id);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-(--background)/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1512px] mx-auto px-4 sm:px-6 lg:px-[120px]">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link
            href="#home"
            className={`${FONTS.logo} text-[32px] text-(--text-primary) hover:text-(--accent-primary) transition-colors duration-200`}
          >
            {t("hero.name")}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
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
          <div className="hidden lg:flex items-center gap-[40px]">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`${
                  FONTS.nav
                } text-[18px] transition-colors duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? "font-semibold text-(--accent-primary)"
                    : "font-medium text-(--text-muted) hover:text-(--accent-primary)"
                }`}
              >
                {t(`nav.${link.key}`) ||
                  link.key.charAt(0).toUpperCase() + link.key.slice(1)}
              </a>
            ))}
          </div>

          {/* Contact Button & Theme Switcher */}
          <div className="hidden lg:flex items-center gap-5">
            <LanguageSwitcher />
            <a
              href="#contact"
              className={`border border-(--accent-primary) rounded-[9px] px-[26.5px] py-[11.5px] ${FONTS.nav} font-medium text-[15px] text-(--text-primary) hover:bg-(--accent-primary) hover:text-(--background) transition-all duration-200`}
            >
              {t("nav.contact")}
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t border-(--border-color) bg-(--background)/95 backdrop-blur-md">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block ${FONTS.nav} font-medium text-[16px] text-(--text-muted) hover:text-(--accent-primary) transition-colors duration-200`}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block border border-(--accent-primary) rounded-[9px] px-[26.5px] py-[11.5px] ${FONTS.nav} font-medium text-[15px] text-(--text-primary) text-center hover:bg-(--accent-primary) transition-all duration-200`}
            >
              {t("nav.contact")}
            </a>
            <div className="flex justify-center pt-2">
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
