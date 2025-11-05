"use client";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";

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
        <div className="flex flex-col items-center mb-12">
          <h2
            className={`${FONTS.body} font-extrabold text-[45px] text-(--text-primary) tracking-[-1.35px] mb-2`}
          >
            {t("education.title")}
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-[14px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent tracking-[-0.42px]`}
          >
            {t("education.subtitle")}
          </p>
        </div>
        <div className="space-y-8 max-w-2xl mx-auto">
          {education.map((item, idx) => (
            <div
              key={idx}
              className="bg-(--card-bg) border border-(--border-color) rounded-xl p-6 flex flex-col gap-2 shadow hover:border-(--accent-primary) transition-all duration-300"
            >
              <div className="text-lg font-bold text-(--accent-primary)">
                {item.degree}
              </div>
              <div className="text-base text-(--text-primary)">
                {item.institution}
              </div>
              <div className="text-sm text-(--text-muted)">{item.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
