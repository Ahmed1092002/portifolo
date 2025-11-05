"use client";
import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";

export default function About() {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding}`}
    >
      <div className="max-w-[1512px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12">
          <h2
            className={`${FONTS.body} font-extrabold text-[45px] text-(--text-primary) tracking-[-1.35px] mb-2`}
          >
            {t("about.title")}
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-[14px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent tracking-[-0.42px]`}
          >
            {t("about.subtitle")}
          </p>
        </div>

        {/* Bio Text */}
        <div className="max-w-[840px] mx-auto">
          <div
            className={`${FONTS.body} font-medium text-[17px] text-(--text-secondary) leading-[25px] text-center space-y-6`}
          >
            <p>{t("about.paragraph1")}</p>
            <p>{t("about.paragraph2")}</p>
            <p>{t("about.paragraph3")}</p>
          </div>
        </div>

        {/* Download Resume Button */}
        <div className="flex justify-center mt-16">
          <a
            href="#"
            className={`inline-block border border-(--accent-primary) rounded-[55px] px-[40px] py-[18.5px] ${FONTS.nav} font-medium text-[15px] text-(--text-primary) hover:bg-(--accent-primary) transition-all duration-200`}
          >
            {t("about.downloadResume")}
          </a>
        </div>
      </div>
    </section>
  );
}
