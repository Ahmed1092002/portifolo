"use client";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";

export default function Experience() {
  const { t } = useTranslation();
  const experienceRaw = t("experience.items") as unknown;
  const experience: Array<{
    role: string;
    company: string;
    period: string;
    description: string;
  }> = Array.isArray(experienceRaw)
    ? (experienceRaw as Array<{
        role: string;
        company: string;
        period: string;
        description: string;
      }>)
    : [];

  return (
    <section
      id="experience"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding}`}
    >
      <div className="max-w-[1512px] mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2
            className={`${FONTS.body} font-extrabold text-[45px] text-(--text-primary) tracking-[-1.35px] mb-2`}
          >
            {t("experience.title")}
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-[14px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent tracking-[-0.42px]`}
          >
            {t("experience.subtitle")}
          </p>
        </div>
        <div className="space-y-8 max-w-2xl mx-auto">
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="bg-(--card-bg) border border-(--border-color) rounded-xl p-6 flex flex-col gap-2 shadow hover:border-(--accent-primary) transition-all duration-300"
            >
              <div className="text-lg font-bold text-(--accent-primary)">
                {item.role}
              </div>
              <div className="text-base text-(--text-primary)">
                {item.company}
              </div>
              <div className="text-sm text-(--text-muted)">{item.period}</div>
              <div className="text-sm text-(--text-secondary)">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
