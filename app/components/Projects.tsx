"use client";

import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";
import { useEffect, useState } from "react";
import Card3D from "./Card3D";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  demo?: string;
}

export default function Projects() {
  const { t } = useTranslation();
  // Guard against initial non-array values while translations load
  const skillsRaw = t("projects.skills") as unknown;
  const skillTags: string[] = Array.isArray(skillsRaw)
    ? (skillsRaw as string[])
    : [];

  const projectsRaw = t("projects.items") as unknown;
  const projects: Project[] = Array.isArray(projectsRaw)
    ? (projectsRaw as Project[])
    : [];
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(
    projects.slice(0, 6)
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function viewMoreProjects() {
    if (!isVisible) {
      setVisibleProjects(projects);
      setIsVisible(true);
    } else {
      setVisibleProjects(projects.slice(0, 6));
      setIsVisible(false);
    }
  }

  useEffect(() => {
    setVisibleProjects(isVisible ? projects : projects.slice(0, 6));
  }, [isVisible, projects]);

  return (
    <section
      id="projects"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding}`}
    >
      <div className="max-w-[1512px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-8 sm:mb-10 md:mb-12">
          <h2
            className={`${FONTS.body} font-extrabold text-3xl sm:text-4xl md:text-[45px] text-(--text-primary) tracking-tight md:tracking-[-1.35px] mb-2`}
          >
            {t("projects.title")}
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-xs sm:text-sm md:text-[14px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent tracking-tight md:tracking-[-0.42px]`}
          >
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-[55px] mb-10 sm:mb-12 md:mb-16 px-4">
          {skillTags.map((tag, index) => (
            <div
              key={index}
              className={`
                rounded-[50px] px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 ${
                  FONTS.body
                } font-normal text-sm sm:text-[15px] md:text-[16px] leading-normal transition-all duration-200
                ${
                  index === 0
                    ? "bg-(--border-light) text-(--text-primary)"
                    : "border border-(--border-light) text-(--text-muted) hover:border-(--accent-primary) hover:text-(--accent-primary) cursor-pointer"
                }
              `}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Projects Grid - Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 md:gap-16 lg:gap-10 mb-8 sm:mb-10 max-w-full sm:max-w-[650px] md:max-w-[900px] lg:max-w-[1144px] mx-auto px-4 sm:px-0">
          {visibleProjects.map((project, index) => (
            <Card3D key={index} className="group h-full">
              {/* Content */}
              <div className="flex items-end justify-between gap-3 h-full p-5 rounded-lg bg-(--background)/50 backdrop-blur-sm border border-(--border-color)/50 hover:border-(--accent-primary) transition-all duration-300">
                <div className="flex-1 flex-col self-start">
                  <h3 className="font-['Inter'] font-bold text-base sm:text-lg md:text-[20px] text-(--text-muted) leading-normal mb-3 sm:mb-4 group-hover:text-(--accent-primary) transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-['Inter'] font-normal text-xs sm:text-sm md:text-[14px] text-(--text-dimmed) leading-normal">
                    {project.description}
                  </p>
                  <p className="font-['Inter'] font-normal text-xs sm:text-sm md:text-[14px] text-(--text-dimmed) leading-normal">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-(--accent-primary) transition-colors"
                      >
                        {t("projects.demoLink")}
                      </a>
                    )}
                  </p>
                </div>

                {/* Arrow Button - Opens link if available */}
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 bg-gradient-to-br from-[#4fc3f7] to-[#764ba2] rounded-full p-1.5 sm:p-2 rotate-180 scale-y-[-1] hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(79,195,247,0.5)]"
                    aria-label={`View ${project.title}`}
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      viewBox="0 0 23 23"
                      fill="none"
                    >
                      <path
                        d="M8 5L15 12L8 19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ) : (
                  <button className="shrink-0 bg-gradient-to-br from-[#4fc3f7] to-[#764ba2] rounded-full p-1.5 sm:p-2 rotate-180 scale-y-[-1] hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(79,195,247,0.5)] opacity-50 cursor-not-allowed">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      viewBox="0 0 23 23"
                      fill="none"
                    >
                      <path
                        d="M8 5L15 12L8 19"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </Card3D>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center px-4">
          <button
            onClick={viewMoreProjects}
            className="border border-(--border-light) rounded-[75px] px-8 py-2.5 sm:px-9 sm:py-3 md:px-10 md:py-[13px] font-['Montserrat'] font-medium text-sm sm:text-base md:text-[15px] text-(--text-primary) hover:border-(--accent-primary) hover:bg-(--accent-primary) transition-all duration-200"
          >
            {isVisible ? t("projects.viewLess") : t("projects.viewAll")}
          </button>
        </div>
      </div>
    </section>
  );
}
