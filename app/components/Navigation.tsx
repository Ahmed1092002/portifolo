"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "../i18n/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import { FONTS } from "../constants";
import { useRef } from "react";

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
    { key: "services", href: "#skills" },
    { key: "resume", href: "#resume" },
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
          ? "bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1512px] mx-auto px-4 sm:px-6 lg:px-[120px]">
        <div className="flex items-center justify-between h-[80px]">
          {/* Logo */}
          <Link
            href="#home"
            className={`${FONTS.logo} text-[32px] text-white hover:text-[#4fc3f7] transition-colors duration-200`}
          >
            {t("hero.name")}
          </Link>

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
                    ? "font-semibold text-[#4fc3f7]"
                    : "font-medium text-[#c1c1c1] hover:text-[#4fc3f7]"
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
              className={`border border-[#4fc3f7] rounded-[9px] px-[26.5px] py-[11.5px] ${FONTS.nav} font-medium text-[15px] text-white hover:bg-[#4fc3f7] hover:text-white transition-all duration-200`}
            >
              {t("nav.contact")}
            </a>
            {/* Theme Switcher Icon */}
            <button
              className="w-[30px] h-[30px] flex items-center justify-center text-[#c1c1c1] hover:text-[#4fc3f7] transition-colors"
              aria-label="Toggle theme"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t border-[#2b2b2b]">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block ${FONTS.nav} font-medium text-[16px] text-[#c1c1c1] hover:text-[#4fc3f7] transition-colors duration-200`}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block border border-[#4fc3f7] rounded-[9px] px-[26.5px] py-[11.5px] ${FONTS.nav} font-medium text-[15px] text-white text-center hover:bg-[#4fc3f7] transition-all duration-200`}
            >
              {t("nav.contact")}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
