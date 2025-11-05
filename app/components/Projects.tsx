"use client";

import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";
import { useEffect, useState } from "react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
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
        <div className="flex flex-col items-center mb-12">
          <h2
            className={`${FONTS.body} font-extrabold text-[45px] text-(--text-primary) tracking-[-1.35px] mb-2`}
          >
            {t("projects.title")}
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-[14px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent tracking-[-0.42px]`}
          >
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-[55px] mb-16">
          {skillTags.map((tag, index) => (
            <div
              key={index}
              className={`
                rounded-[50px] px-6 py-3 ${
                  FONTS.body
                } font-normal text-[16px] leading-normal transition-all duration-200
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-10 max-w-[1144px] mx-auto">
          {visibleProjects.map((project, index) => (
            <div key={index} className="group">
              {/* Content */}
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="font-['Inter'] font-bold text-[20px] text-(--text-muted) leading-normal mb-4">
                    {project.title}
                  </h3>
                  <p className="font-['Inter'] font-normal text-[14px] text-(--text-dimmed) leading-normal">
                    {project.description}
                  </p>
                </div>

                {/* Arrow Button */}
                <button className="shrink-0 bg-(--accent-primary) rounded-full p-2 rotate-180 scale-y-[-1] hover:scale-110 transition-transform">
                  <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
                    <path
                      d="M8 5L15 12L8 19"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button
            onClick={viewMoreProjects}
            className="border border-(--border-light) rounded-[75px] px-10 py-[13px] font-['Montserrat'] font-medium text-[15px] text-(--text-primary) hover:border-(--accent-primary) hover:bg-(--accent-primary) transition-all duration-200"
          >
            {isVisible ? t("projects.viewLess") : t("projects.viewAll")}
          </button>
        </div>
      </div>
    </section>
  );
}
