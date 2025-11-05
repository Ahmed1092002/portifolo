"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";

export default function Contact() {
  const { t } = useTranslation();
  // Guard against initial non-array values while translations load
  const serviceOptionsRaw = t("contact.serviceOptions") as unknown;
  const serviceOptions: string[] = Array.isArray(serviceOptionsRaw)
    ? (serviceOptionsRaw as string[])
    : [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // EmailJS configuration
      // Replace these with your actual EmailJS credentials from https://www.emailjs.com/
      const serviceId =
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_qco4okh";
      const templateId =
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_55bmak5";
      const publicKey =
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "l4jkIrJ8dO0l7IIHQ";

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        service_type: formData.service,
        message: formData.message,
        to_name: "Ahmed Tamer", // Your name
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus({
        type: "success",
        message:
          t("contact.successMessage") ||
          "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", service: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus({
        type: "error",
        message:
          t("contact.errorMessage") ||
          "Failed to send message. Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding}`}
    >
      <div className="max-w-[1512px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-8 sm:mb-10 md:mb-12">
          <h2
            className={`${FONTS.body} font-extrabold text-3xl sm:text-4xl md:text-[45px] text-(--text-primary) tracking-tight md:tracking-[-1.35px] mb-2`}
          >
            {t("contact.title")}
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-xs sm:text-sm md:text-[14px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent tracking-tight md:tracking-[-0.42px]`}
          >
            {t("contact.subtitle")}
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-full sm:max-w-[540px] md:max-w-[696px] mx-auto px-4 sm:px-0">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className={`block ${FONTS.body} font-bold text-base sm:text-lg md:text-[18px] text-(--text-primary) leading-[1.2] mb-3 sm:mb-4`}
              >
                {t("contact.name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("contact.namePlaceholder")}
                required
                className={`w-full h-[60px] sm:h-[65px] md:h-[70px] rounded-lg sm:rounded-[10px] border border-(--border-light) bg-transparent px-4 sm:px-6 md:px-8 ${FONTS.body} font-normal text-base sm:text-lg md:text-[20px] text-(--text-primary) placeholder:text-(--text-dimmed) focus:outline-none focus:border-(--accent-primary)`}
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className={`block ${FONTS.body} font-bold text-base sm:text-lg md:text-[18px] text-(--text-primary) leading-[1.2] mb-3 sm:mb-4`}
              >
                {t("contact.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("contact.emailPlaceholder")}
                required
                className={`w-full h-[60px] sm:h-[65px] md:h-[70px] rounded-lg sm:rounded-[10px] border border-(--border-light) bg-transparent px-4 sm:px-6 md:px-8 ${FONTS.body} font-normal text-base sm:text-lg md:text-[20px] text-(--text-primary) placeholder:text-(--text-dimmed) focus:outline-none focus:border-(--accent-primary)`}
              />
            </div>

            {/* Service Field */}
            <div>
              <label
                htmlFor="service"
                className={`block ${FONTS.body} font-bold text-base sm:text-lg md:text-[18px] text-(--text-primary) leading-[1.2] mb-3 sm:mb-4`}
              >
                {t("contact.service")}
              </label>
              <div className="relative">
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className={`w-full h-[60px] sm:h-[65px] md:h-[70px] rounded-lg sm:rounded-[10px] border border-(--border-light) bg-(--background) px-4 sm:px-6 md:px-8 ${FONTS.body} font-normal text-base sm:text-lg md:text-[20px] text-(--text-dimmed) focus:outline-none focus:border-(--accent-primary) appearance-none cursor-pointer`}
                  style={{
                    color: formData.service
                      ? "var(--text-primary)"
                      : "var(--text-dimmed)",
                  }}
                >
                  <option
                    value=""
                    className="bg-(--background) text-(--text-dimmed)"
                  >
                    {t("contact.selectService")}
                  </option>
                  {serviceOptions.map((option, index) => (
                    <option
                      key={index}
                      value={option.toLowerCase().replace(/\s+/g, "-")}
                      className="bg-[#1a1a1a] text-white"
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M7.5 10L3 5H12L7.5 10Z" fill="#8987a1" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className={`block ${FONTS.body} font-bold text-base sm:text-lg md:text-[18px] text-(--text-primary) leading-[1.2] mb-3 sm:mb-4`}
              >
                {t("contact.message")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
                className="w-full rounded-lg sm:rounded-[10px] border border-(--border-light) bg-transparent px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 font-['Inter'] font-normal text-base sm:text-lg md:text-[20px] text-(--text-primary) placeholder:text-(--text-dimmed) focus:outline-none focus:border-(--accent-primary) resize-none"
              />
            </div>

            {/* Status Message */}
            {submitStatus.type && (
              <div
                className={`p-3 sm:p-4 rounded-lg sm:rounded-[10px] ${
                  submitStatus.type === "success"
                    ? "bg-green-500/10 border border-green-500/20 text-green-500"
                    : "bg-red-500/10 border border-red-500/20 text-red-500"
                } ${FONTS.body} text-xs sm:text-sm md:text-[14px]`}
              >
                {submitStatus.message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-[56px] sm:h-[60px] md:h-[62px] bg-(--accent-primary) rounded-lg sm:rounded-[10px] ${FONTS.button} font-bold text-sm sm:text-base md:text-[16px] text-white leading-normal hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting
                ? t("contact.sending") || "Sending..."
                : t("contact.submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
