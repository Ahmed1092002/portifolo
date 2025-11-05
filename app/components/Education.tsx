"use client";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";
import Card3D from "./Card3D";

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export default function Education() {
  const { t } = useTranslation();
  const educationRaw = t("education.items") as unknown;
  const education: EducationItem[] = Array.isArray(educationRaw)
    ? (educationRaw as EducationItem[])
    : [];

  return (
    <section
      id="education"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding}`}
    >
      <div className="max-w-[1512px] mx-auto">
        <div className="flex flex-col items-center mb-8 sm:mb-10 md:mb-12">
          <h2
            className={`${FONTS.body} font-extrabold text-3xl sm:text-4xl md:text-[45px] text-(--text-primary) tracking-tight md:tracking-[-1.35px] mb-2`}
          >
            {t("education.title")}
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-xs sm:text-sm md:text-[14px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent tracking-tight md:tracking-[-0.42px]`}
          >
            {t("education.subtitle")}
          </p>
        </div>
        <div className="space-y-5 sm:space-y-6 md:space-y-8 max-w-full sm:max-w-xl md:max-w-2xl mx-auto px-4 sm:px-0">
          {education.map((item, idx) => (
            <Card3D key={idx}>
              <div className="bg-(--card-bg)/80 backdrop-blur-sm border border-(--border-color) rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 flex flex-col gap-1.5 sm:gap-2 shadow-lg hover:border-(--accent-primary) hover:shadow-[0_0_30px_rgba(79,195,247,0.3)] transition-all duration-300">
                <div className="text-base sm:text-lg font-bold bg-linear-to-r from-[#4fc3f7] to-[#764ba2] bg-clip-text text-transparent">
                  {item.degree}
                </div>
                <div className="text-sm sm:text-base text-(--text-primary)">
                  {item.institution}
                </div>
                <div className="text-xs sm:text-sm text-(--text-muted)">
                  {item.year}
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </section>
  );
}
