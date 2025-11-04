"use client";

import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";

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

  return (
    <section
      id="projects"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding}`}
    >
      <div className="max-w-[1512px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12">
          <h2
            className={`${FONTS.body} font-extrabold text-[45px] text-white tracking-[-1.35px] mb-2`}
          >
            {t("projects.title")}
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-[14px] bg-linear-to-r from-[#4fc3f7] to-[#f5f5f5] bg-clip-text text-transparent tracking-[-0.42px]`}
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
                    ? "bg-[#484e53] text-neutral-100"
                    : "border border-[#484e53] text-[darkgrey] hover:border-[#4fc3f7] hover:text-[#4fc3f7] cursor-pointer"
                }
              `}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Projects Grid - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10 max-w-[1144px] mx-auto">
          {projects.slice(0, 3).map((project, index) => (
            <div key={index} className="group">
              {/* Image */}
              <div className="h-[198.33px] rounded-lg overflow-hidden mb-8 bg-gradient-to-br from-[#4fc3f7]/20 to-[#2196f3]/20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="font-['Inter'] font-bold text-[20px] text-[#c1c1c1] leading-[1.5] mb-4">
                    {project.title}
                  </h3>
                  <p className="font-['Inter'] font-normal text-[14px] text-[darkgrey] leading-[1.5]">
                    {project.description}
                  </p>
                </div>

                {/* Arrow Button */}
                <button className="flex-shrink-0 bg-[#4fc3f7] rounded-full p-2 rotate-180 scale-y-[-1] hover:scale-110 transition-transform">
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

        {/* Projects Grid - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1144px] mx-auto mb-16">
          {projects.slice(3, 6).map((project, index) => (
            <div key={index} className="group">
              {/* Image */}
              <div className="h-[198.33px] rounded-lg overflow-hidden mb-8 bg-gradient-to-br from-[#4fc3f7]/20 to-[#2196f3]/20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="font-['Inter'] font-bold text-[20px] text-[#c1c1c1] leading-[1.5] mb-4">
                    {project.title}
                  </h3>
                  <p className="font-['Inter'] font-normal text-[14px] text-[darkgrey] leading-[1.5]">
                    {project.description}
                  </p>
                </div>

                {/* Arrow Button */}
                <button className="flex-shrink-0 bg-[#4fc3f7] rounded-full p-2 rotate-180 scale-y-[-1] hover:scale-110 transition-transform">
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
          <button className="border border-[#484e53] rounded-[75px] px-[40px] py-[13px] font-['Montserrat'] font-medium text-[15px] text-white hover:border-[#4fc3f7] hover:bg-[#4fc3f7] transition-all duration-200">
            View All
          </button>
        </div>
      </div>
    </section>
  );
}
