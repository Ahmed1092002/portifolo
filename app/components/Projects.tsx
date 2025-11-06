"use client";

import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";
import { useState, memo, useMemo } from "react";
import Card3D from "./Card3D";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, ChevronRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  demo?: string;
  company?: string;
}

function Projects() {
  const { t } = useTranslation();
  const skillsRaw = t("projects.skills") as unknown;
  const skillTags: string[] = Array.isArray(skillsRaw)
    ? (skillsRaw as string[])
    : [];

  const projectsRaw = t("projects.items") as unknown;
  const projects: Project[] = Array.isArray(projectsRaw)
    ? (projectsRaw as Project[])
    : [];
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedTag, setSelectedTag] = useState<number>(0);

  // Memoize visible projects calculation
  const visibleProjects = useMemo(
    () => (isVisible ? projects : projects.slice(0, 6)),
    [isVisible, projects]
  );

  function viewMoreProjects() {
    setIsVisible(!isVisible);
  }

  return (
    <section
      id="projects"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding} relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-r from-[#4fc3f7]/10 to-[#764ba2]/10 rounded-full blur-3xl"
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
            <Sparkles className="w-8 h-8 text-[#4fc3f7]" />
          </motion.div>

          <h2
            className={`${FONTS.body} font-extrabold text-3xl sm:text-4xl md:text-[45px] text-(--text-primary) tracking-tight md:tracking-[-1.35px] mb-3 relative`}
          >
            {t("projects.title")}
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
            {t("projects.subtitle")}
          </p>
        </motion.div>
        {/* Skills Tags - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14 md:mb-16 px-4"
        >
          {skillTags.map((tag, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedTag(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative rounded-full px-5 py-2.5 sm:px-6 sm:py-3 ${
                FONTS.body
              } font-medium text-sm sm:text-[15px] md:text-[16px] transition-all duration-300 ${
                selectedTag === index
                  ? "text-white"
                  : "border border-(--border-light) text-(--text-muted) hover:border-(--accent-primary) hover:text-(--accent-primary)"
              }`}
            >
              {selectedTag === index && (
                <motion.div
                  layoutId="activeTag"
                  className="absolute inset-0 bg-gradient-to-r from-[#4fc3f7] to-[#764ba2] rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tag}</span>

              {/* Glow effect for active tag */}
              {selectedTag === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -inset-1 bg-gradient-to-r from-[#4fc3f7] to-[#764ba2] rounded-full blur-lg opacity-50 -z-10"
                />
              )}
            </motion.button>
          ))}
        </motion.div>
        {/* Projects Grid - Enhanced */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-full sm:max-w-[650px] md:max-w-[900px] lg:max-w-[1200px] mx-auto px-4 sm:px-0 mb-12">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              layout
            >
              <Card3D className="group h-full">
                <div className="relative flex flex-col h-full p-6 sm:p-7 rounded-2xl bg-(--background)/50 backdrop-blur-xl border border-(--border-color)/50 hover:border-(--accent-primary) transition-all duration-500 overflow-hidden">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4fc3f7]/0 to-[#764ba2]/0 group-hover:from-[#4fc3f7]/10 group-hover:to-[#764ba2]/10 transition-all duration-500 rounded-2xl" />

                  {/* Content */}
                  <div className="relative z-10 flex-1 flex flex-col">
                    {/* Number Badge */}
                    <div className="absolute -top-3 -left-3 pb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4fc3f7] to-[#764ba2] flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="mt-5 flex-1">
                      <h3 className="font-['Inter'] font-bold text-lg sm:text-xl md:text-[22px] text-(--text-primary) mb-3 sm:mb-4 group-hover:text-[#4fc3f7] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="font-['Inter'] font-normal text-sm sm:text-base md:text-[15px] text-(--text-secondary) leading-relaxed mb-4">
                        {project.description}
                      </p>

                      {/* Demo Link */}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[#4fc3f7] hover:text-[#764ba2] transition-colors mb-4"
                        >
                          <ExternalLink className="w-4 h-4" />
                          {t("projects.demoLink")}
                        </a>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto pt-4 border-t border-(--border-color)/30">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/btn inline-flex items-center gap-2 text-sm font-medium text-(--text-primary) hover:text-[#4fc3f7] transition-colors"
                        >
                          View Project
                          <motion.div
                            animate={{
                              x: [0, 5, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </motion.div>
                        </a>
                      ) : (
                        <span className="text-sm text-(--text-dimmed)">
                          {project.company}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#4fc3f7]/20 via-transparent to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>{" "}
        {/* View All Button - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center px-4"
        >
          <motion.button
            onClick={viewMoreProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden border border-(--border-light) rounded-full px-10 py-3.5 sm:px-12 sm:py-4 font-['Montserrat'] font-medium text-sm sm:text-base md:text-[15px] text-(--text-primary) hover:border-[#4fc3f7] transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isVisible ? t("projects.viewLess") : t("projects.viewAll")}
              <motion.div
                animate={{
                  rotate: isVisible ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-4 h-4 rotate-90" />
              </motion.div>
            </span>

            {/* Hover background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4fc3f7]/10 to-[#764ba2]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Projects);
