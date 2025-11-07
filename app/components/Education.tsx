"use client";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";
import { memo, useMemo } from "react";
import Card3D from "./Card3D";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

function Education() {
  const { t } = useTranslation();

  const education = useMemo(() => {
    const educationRaw = t("education.items") as unknown;
    return Array.isArray(educationRaw) ? (educationRaw as EducationItem[]) : [];
  }, [t]);

  return (
    <section
      id="education"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding} relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-10 w-80 h-80 bg-gradient-to-r from-[#764ba2]/20 to-[#4fc3f7]/20 rounded-full blur-3xl"
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
            <GraduationCap className="w-8 h-8 text-[#4fc3f7]" />
          </motion.div>

          <h2
            className={`${FONTS.body} font-extrabold text-3xl sm:text-4xl md:text-[45px] text-(--text-primary) tracking-tight md:tracking-[-1.35px] mb-3 relative`}
          >
            {t("education.title")}
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
            {t("education.subtitle")}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-full sm:max-w-xl md:max-w-3xl mx-auto px-4 sm:px-0">
          {/* Vertical Line */}
          <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4fc3f7] via-[#764ba2] to-transparent" />

          <div className="space-y-8 sm:space-y-10 md:space-y-12">
            {education.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.15 + 0.2,
                    type: "spring",
                  }}
                  className="absolute left-6 sm:left-8 top-8 z-10"
                >
                  <div className="relative">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 rounded-full border-2 border-[#4fc3f7] bg-(--background) flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#764ba2]" />
                    </motion.div>
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 rounded-full border-2 border-[#4fc3f7]"
                    />
                  </div>
                </motion.div>

                {/* Card */}
                <div className="ml-16 sm:ml-20 md:ml-24">
                  <Card3D>
                    <div className="relative bg-(--card-bg)/60 backdrop-blur-xl border border-(--border-color) rounded-2xl p-5 sm:p-6 md:p-7 shadow-xl hover:border-(--accent-primary) hover:shadow-[0_0_30px_rgba(79,195,247,0.2)] transition-all duration-500 overflow-hidden group">
                      {/* Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4fc3f7]/0 to-[#764ba2]/0 group-hover:from-[#4fc3f7]/5 group-hover:to-[#764ba2]/5 transition-all duration-500" />

                      <div className="relative z-10 flex flex-col gap-2.5 sm:gap-3">
                        {/* Degree */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.15 + 0.3 }}
                          className="flex items-start gap-3"
                        >
                          <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#4fc3f7] mt-1 shrink-0" />
                          <div className="text-lg sm:text-xl md:text-[22px] font-bold bg-linear-to-r from-[#4fc3f7] to-[#764ba2] bg-clip-text text-transparent">
                            {item.degree}
                          </div>
                        </motion.div>

                        {/* Institution */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.15 + 0.4 }}
                          className="text-base sm:text-lg text-(--text-primary) pl-8 sm:pl-9"
                        >
                          {item.institution}
                        </motion.div>

                        {/* Year */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.15 + 0.5 }}
                          className="flex items-center gap-2 text-sm sm:text-base text-(--text-muted) pl-8 sm:pl-9"
                        >
                          <Calendar className="w-4 h-4 text-[#764ba2]" />
                          {item.year}
                        </motion.div>

                        {/* Description (if available) */}
                        {item.description && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 + 0.6 }}
                            className="text-sm sm:text-base text-(--text-secondary) leading-relaxed pl-8 sm:pl-9 mt-2 pt-2 border-t border-(--border-color)/30"
                          >
                            {item.description}
                          </motion.div>
                        )}
                      </div>

                      {/* Decorative corner */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#4fc3f7]/10 via-transparent to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </Card3D>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Education);
