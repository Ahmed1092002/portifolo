"use client";

import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";
import type { ReactNode } from "react";
import {
  BarChart3,
  LineChart,
  MessageSquareText,
  Bot,
  Brain,
} from "lucide-react";

interface Service {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function Skills() {
  const { t } = useTranslation();
  const ICONS: ReactNode[] = [
    <BarChart3 key="bar" className="w-6 h-6" aria-hidden="true" />,
    <LineChart key="line" className="w-6 h-6" aria-hidden="true" />,
    <MessageSquareText key="msg" className="w-6 h-6" aria-hidden="true" />,
    <Bot key="bot" className="w-6 h-6" aria-hidden="true" />,
    <Brain key="brain" className="w-6 h-6" aria-hidden="true" />,
  ];
  const servicesRaw = t("services.items") as unknown;
  const servicesArray: Array<Partial<Service>> = Array.isArray(servicesRaw)
    ? (servicesRaw as Array<Partial<Service>>)
    : [];
  const services: Service[] = servicesArray.map((item, i) => ({
    icon: (item as Partial<Service>).icon ?? ICONS[i] ?? (
      <BarChart3 className="w-6 h-6" aria-hidden="true" />
    ),
    title: item.title ?? "",
    description: item.description ?? "",
  }));

  return (
    <section
      id="services"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding}`}
    >
      <div className="max-w-[1512px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-8 sm:mb-10 md:mb-12">
          <h2
            className={`${FONTS.body} font-extrabold text-3xl sm:text-4xl md:text-[45px] text-(--text-primary) tracking-tight md:tracking-[-1.35px] mb-2`}
          >
            {t("services.title")}
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-xs sm:text-sm md:text-[14px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent tracking-tight md:tracking-[-0.42px]`}
          >
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Grid - Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mb-4 sm:mb-5 max-w-full sm:max-w-[600px] md:max-w-[937px] mx-auto px-4 sm:px-0">
          {services.slice(0, 3).map((service, index) => (
            <div
              key={index}
              className="border border-(--border-color) rounded-lg sm:rounded-[10px] p-4 sm:p-5 md:p-6 hover:border-(--accent-primary) transition-all duration-300"
            >
              <div className="bg-[#f5f8ff] w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-[9px] flex items-center justify-center mb-4 sm:mb-5 md:mb-6 text-xl sm:text-2xl text-[#1a1a1a]">
                {service.icon}
              </div>
              <h3
                className={`${FONTS.body} font-semibold text-sm sm:text-[15px] text-(--text-primary) mb-3 sm:mb-4 leading-[1.2]`}
              >
                {service.title}
              </h3>
              <p
                className={`${FONTS.body} font-normal text-xs sm:text-sm md:text-[14px] text-(--text-secondary) leading-normal`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Services Grid - Row 2 */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 max-w-full sm:max-w-[600px] md:max-w-[936px] mx-auto px-4 sm:px-0">
          {/* AI Chatbots - Featured Card */}
          <div className="border border-(--border-color) rounded-lg sm:rounded-[10px] p-4 sm:p-5 md:p-6 hover:border-(--accent-primary) transition-all duration-300">
            <div className="flex flex-col h-full">
              <div className="bg-[#f5f8ff] w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-[9px] flex items-center justify-center mb-4 sm:mb-5 md:mb-6 text-xl sm:text-2xl text-[#1a1a1a]">
                {services[3]?.icon}
              </div>
              <h3
                className={`${FONTS.body} font-semibold text-base sm:text-lg md:text-[19.773px] text-(--text-primary) mb-3 sm:mb-4 leading-[1.2]`}
              >
                {services[3]?.title ?? ""}
              </h3>
              <p
                className={`${FONTS.body} font-normal text-xs sm:text-sm md:text-[14px] text-(--text-secondary) leading-normal mb-4 sm:mb-5 md:mb-6`}
              >
                {services[3]?.description ?? ""}
              </p>
            </div>
          </div>

          {/* Machine Learning Card */}
          {/* <div className="border border-(--border-color) rounded-[10px] p-6 hover:border-(--accent-primary) transition-all duration-300">
            <div className="bg-[#f5f8ff] w-11 h-11 rounded-[9px] flex items-center justify-center mb-6 text-2xl text-[#1a1a1a]">
              {services[4]?.icon}
            </div>
            <h3
              className={`${FONTS.body} font-semibold text-[15px] text-(--text-primary) mb-4 leading-[1.2]`}
            >
              {services[4]?.title ?? ""}
            </h3>
            <p
              className={`${FONTS.body} font-normal text-[14px] text-(--text-secondary) leading-normal`}
            >
              {services[4]?.description ?? ""}
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
}
