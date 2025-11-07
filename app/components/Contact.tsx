"use client";

import { useState, useCallback, memo, useMemo } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  User,
  MessageSquare,
  Sparkles,
  CheckCircle,
} from "lucide-react";

function Contact() {
  const { t } = useTranslation();

  const serviceOptions = useMemo(() => {
    const serviceOptionsRaw = t("contact.serviceOptions") as unknown;
    return Array.isArray(serviceOptionsRaw)
      ? (serviceOptionsRaw as string[])
      : [];
  }, [t]);

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

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitStatus({ type: null, message: "" });

      try {
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
          to_name: "Ahmed Tamer",
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
    },
    [formData, t]
  );

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  return (
    <section
      id="contact"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding} relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-linear-to-r from-[#4fc3f7]/10 to-[#764ba2]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-linear-to-r from-[#764ba2]/10 to-[#4fc3f7]/10 rounded-full blur-3xl"
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
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <Mail className="w-8 h-8 text-[#4fc3f7]" />
          </motion.div>

          <h2
            className={`${FONTS.body} font-extrabold text-3xl sm:text-4xl md:text-[45px] text-(--text-primary) tracking-tight md:tracking-[-1.35px] mb-3 relative`}
          >
            {t("contact.title")}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-2 left-0 h-1 bg-linear-to-r from-[#4fc3f7] to-[#764ba2] rounded-full"
            />
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-xs sm:text-sm md:text-[14px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent tracking-tight md:tracking-[-0.42px]`}
          >
            {t("contact.subtitle")}
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-full sm:max-w-[580px] md:max-w-[720px] mx-auto px-4 sm:px-0"
        >
          <div className="relative bg-(--card-bg)/40 backdrop-blur-xl border border-(--border-color)/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-linear-to-br from-[#4fc3f7]/20 to-transparent rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl from-[#764ba2]/20 to-transparent rounded-br-3xl" />

            <form
              onSubmit={handleSubmit}
              className="relative z-10 space-y-5 sm:space-y-6"
            >
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <label
                  htmlFor="name"
                  className={`flex items-center gap-2 ${FONTS.body} font-bold text-base sm:text-lg md:text-[18px] text-(--text-primary) mb-3`}
                >
                  <User className="w-5 h-5 text-[#4fc3f7]" />
                  {t("contact.name")}
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.namePlaceholder")}
                    required
                    className={`w-full h-[60px] sm:h-[65px] md:h-[70px] rounded-xl border-2 border-(--border-light) bg-(--background)/50 backdrop-blur-sm px-5 sm:px-6 md:px-7 ${FONTS.body} font-normal text-base sm:text-lg md:text-[18px] text-(--text-primary) placeholder:text-(--text-dimmed) focus:outline-none focus:border-[#4fc3f7] focus:shadow-[0_0_20px_rgba(79,195,247,0.2)] transition-all duration-300`}
                  />
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-[#4fc3f7]/0 to-[#764ba2]/0 group-focus-within:from-[#4fc3f7]/10 group-focus-within:to-[#764ba2]/10 pointer-events-none transition-all duration-300" />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <label
                  htmlFor="email"
                  className={`flex items-center gap-2 ${FONTS.body} font-bold text-base sm:text-lg md:text-[18px] text-(--text-primary) mb-3`}
                >
                  <Mail className="w-5 h-5 text-[#4fc3f7]" />
                  {t("contact.email")}
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact.emailPlaceholder")}
                    required
                    className={`w-full h-[60px] sm:h-[65px] md:h-[70px] rounded-xl border-2 border-(--border-light) bg-(--background)/50 backdrop-blur-sm px-5 sm:px-6 md:px-7 ${FONTS.body} font-normal text-base sm:text-lg md:text-[18px] text-(--text-primary) placeholder:text-(--text-dimmed) focus:outline-none focus:border-[#4fc3f7] focus:shadow-[0_0_20px_rgba(79,195,247,0.2)] transition-all duration-300`}
                  />
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-[#4fc3f7]/0 to-[#764ba2]/0 group-focus-within:from-[#4fc3f7]/10 group-focus-within:to-[#764ba2]/10 pointer-events-none transition-all duration-300" />
                </div>
              </motion.div>

              {/* Service Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <label
                  htmlFor="service"
                  className={`flex items-center gap-2 ${FONTS.body} font-bold text-base sm:text-lg md:text-[18px] text-(--text-primary) mb-3`}
                >
                  <Sparkles className="w-5 h-5 text-[#4fc3f7]" />
                  {t("contact.service")}
                </label>
                <div className="relative group">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className={`w-full h-[60px] sm:h-[65px] md:h-[70px] rounded-xl border-2 border-(--border-light) bg-(--background)/50 backdrop-blur-sm px-5 sm:px-6 md:px-7 ${FONTS.body} font-normal text-base sm:text-lg md:text-[18px] focus:outline-none focus:border-[#4fc3f7] focus:shadow-[0_0_20px_rgba(79,195,247,0.2)] appearance-none cursor-pointer transition-all duration-300`}
                    style={{
                      color: formData.service
                        ? "var(--text-primary)"
                        : "var(--text-dimmed)",
                    }}
                  >
                    <option value="" className="bg-(--background)">
                      {t("contact.selectService")}
                    </option>
                    {serviceOptions.map((option, index) => (
                      <option
                        key={index}
                        value={option.toLowerCase().replace(/\s+/g, "-")}
                        className="bg-(--background) text-(--text-primary)"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-5 sm:right-6 md:right-7 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
                      <path d="M7.5 10L3 5H12L7.5 10Z" fill="#4fc3f7" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <label
                  htmlFor="message"
                  className={`flex items-center gap-2 ${FONTS.body} font-bold text-base sm:text-lg md:text-[18px] text-(--text-primary) mb-3`}
                >
                  <MessageSquare className="w-5 h-5 text-[#4fc3f7]" />
                  {t("contact.message")}
                </label>
                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    required
                    className="w-full rounded-xl border-2 border-(--border-light) bg-(--background)/50 backdrop-blur-sm px-5 sm:px-6 md:px-7 py-4 sm:py-5 font-['Inter'] font-normal text-base sm:text-lg md:text-[18px] text-(--text-primary) placeholder:text-(--text-dimmed) focus:outline-none focus:border-[#4fc3f7] focus:shadow-[0_0_20px_rgba(79,195,247,0.2)] resize-none transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-xl bg-linear-to-r from-[#4fc3f7]/0 to-[#764ba2]/0 group-focus-within:from-[#4fc3f7]/10 group-focus-within:to-[#764ba2]/10 pointer-events-none transition-all duration-300" />
                </div>
              </motion.div>

              {/* Status Message */}
              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex items-center gap-3 p-4 sm:p-5 rounded-xl ${
                    submitStatus.type === "success"
                      ? "bg-green-500/10 border-2 border-green-500/30 text-green-500"
                      : "bg-red-500/10 border-2 border-red-500/30 text-red-500"
                  } ${FONTS.body} text-sm sm:text-base`}
                >
                  {submitStatus.type === "success" && (
                    <CheckCircle className="w-5 h-5 shrink-0" />
                  )}
                  {submitStatus.message}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className={`group relative w-full h-[60px] sm:h-[65px] md:h-[70px] rounded-xl overflow-hidden ${FONTS.button} font-bold text-base sm:text-lg md:text-[17px] text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {/* Animated Background */}
                <motion.div
                  animate={
                    !isSubmitting
                      ? {
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-linear-to-r from-[#4fc3f7] via-[#764ba2] to-[#4fc3f7] bg-[length:200%_100%]"
                />

                {/* Button Content */}
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <svg
                          className="w-5 h-5"
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
                        </svg>
                      </motion.div>
                      {t("contact.sending") || "Sending..."}
                    </>
                  ) : (
                    <>
                      {t("contact.submit")}
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>

                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-linear-to-r from-[#4fc3f7] to-[#764ba2] rounded-xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Contact);
