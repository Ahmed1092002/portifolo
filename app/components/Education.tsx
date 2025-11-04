"use client";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";

export default function Education() {
  const { t } = useTranslation();
  const educationRaw = t("education.items") as unknown;
  const education: Array<{
    degree: string;
    institution: string;
    year: string;
  }> = Array.isArray(educationRaw) ? (educationRaw as any) : [];

  return (
    <section
      id="education"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding}`}
    >
      <div className="max-w-[1512px] mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2
            className={`${FONTS.body} font-extrabold text-[45px] text-white tracking-[-1.35px] mb-2`}
          >
            {t("education.title")}
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-[14px] bg-linear-to-r from-[#4fc3f7] to-[#f5f5f5] bg-clip-text text-transparent tracking-[-0.42px]`}
          >
            {t("education.subtitle")}
          </p>
        </div>
        <div className="space-y-8 max-w-2xl mx-auto">
          {education.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#23272f] rounded-xl p-6 flex flex-col gap-2 shadow"
            >
              <div className="text-lg font-bold text-[#4fc3f7]">
                {item.degree}
              </div>
              <div className="text-base text-white">{item.institution}</div>
              <div className="text-sm text-[#c1c1c1]">{item.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
