"use client";

import { useTranslation } from "../i18n/useTranslation";

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: "React", level: 90, category: "Frontend" },
  { name: "Next.js", level: 85, category: "Frontend" },
  { name: "TypeScript", level: 88, category: "Frontend" },
  { name: "JavaScript", level: 92, category: "Frontend" },
  { name: "Tailwind CSS", level: 90, category: "Frontend" },
  { name: "Node.js", level: 85, category: "Backend" },
  { name: "Python", level: 80, category: "Backend" },
  { name: "PostgreSQL", level: 75, category: "Database" },
  { name: "MongoDB", level: 78, category: "Database" },
  { name: "Git", level: 88, category: "Tools" },
  { name: "Docker", level: 70, category: "Tools" },
  { name: "AWS", level: 65, category: "Cloud" },
];

const categories = ["Frontend", "Backend", "Database", "Tools", "Cloud"];

export default function Skills() {
  const { t } = useTranslation();
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Frontend: "from-blue-500 to-blue-600",
      Backend: "from-purple-500 to-purple-600",
      Database: "from-green-500 to-green-600",
      Tools: "from-orange-500 to-orange-600",
      Cloud: "from-pink-500 to-pink-600",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t("skills.title")}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          {t("skills.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const categorySkills = skills.filter(
              (skill) => skill.category === category
            );
            return (
              <div
                key={category}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                  {category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full bg-gradient-to-r ${getCategoryColor(
                            skill.category
                          )} transition-all duration-1000`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
