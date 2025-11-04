"use client";

import { useTranslation } from "../i18n/useTranslation";

interface Project {
  titleKey: string;
  descriptionKey: string;
  technologies: string[];
  image?: string;
  link?: string;
  github?: string;
}

const projectKeys = [
  "ecommerce",
  "taskManagement",
  "portfolio",
  "weather",
  "analytics",
  "lms",
];

export default function Projects() {
  const { t } = useTranslation();
  const projects: Project[] = projectKeys.map((key) => ({
    titleKey: key,
    descriptionKey: key,
    technologies:
      key === "ecommerce"
        ? ["Next.js", "TypeScript", "Stripe", "PostgreSQL"]
        : key === "taskManagement"
        ? ["React", "Node.js", "Socket.io", "MongoDB"]
        : key === "portfolio"
        ? ["Next.js", "Tailwind CSS", "TypeScript"]
        : key === "weather"
        ? ["React", "Chart.js", "Weather API"]
        : key === "analytics"
        ? ["Next.js", "Python", "D3.js", "PostgreSQL"]
        : ["Vue.js", "Laravel", "MySQL"],
    link: undefined, // Add links here if needed
    github: undefined, // Add GitHub links here if needed
  }));

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-black"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t("projects.title")}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          {t("projects.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                <div className="text-white text-4xl font-bold opacity-50">
                  {t(`projects.${project.titleKey}.title`).charAt(0)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                  {t(`projects.${project.titleKey}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t(`projects.${project.descriptionKey}.description`)}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      {t("projects.liveDemo")}
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:underline font-medium"
                    >
                      {t("projects.github")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
