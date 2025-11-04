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
        <div className="flex flex-col items-center mb-12">
          <h2
            className={`${FONTS.body} font-extrabold text-[45px] text-white tracking-[-1.35px] mb-2`}
          >
            {t("services.title")}
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-[14px] bg-linear-to-r from-[#4fc3f7] to-[#f5f5f5] bg-clip-text text-transparent tracking-[-0.42px]`}
          >
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services Grid - Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5 max-w-[937px] mx-auto">
          {services.slice(0, 3).map((service, index) => (
            <div
              key={index}
              className="border border-[#2b2b2b] rounded-[10px] p-6 hover:border-[#4fc3f7] transition-all duration-300"
            >
              <div className="bg-[#f5f8ff] w-11 h-11 rounded-[9px] flex items-center justify-center mb-6 text-2xl text-[#1a1a1a]">
                {service.icon}
              </div>
              <h3
                className={`${FONTS.body} font-semibold text-[15px] text-white mb-4 leading-[1.2]`}
              >
                {service.title}
              </h3>
              <p
                className={`${FONTS.body} font-normal text-[14px] text-[#e1e1e1] leading-normal`}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Services Grid - Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[936px] mx-auto">
          {/* AI Chatbots - Featured Card */}
          <div className="border border-[#2b2b2b] rounded-[10px] p-6 hover:border-[#4fc3f7] transition-all duration-300 md:col-span-1">
            <div className="flex flex-col h-full">
              <div className="bg-[#f5f8ff] w-11 h-11 rounded-[9px] flex items-center justify-center mb-6 text-2xl text-[#1a1a1a]">
                {services[3]?.icon}
              </div>
              <h3
                className={`${FONTS.body} font-semibold text-[19.773px] text-white mb-4 leading-[1.2]`}
              >
                {services[3]?.title ?? ""}
              </h3>
              <p
                className={`${FONTS.body} font-normal text-[14px] text-[#e1e1e1] leading-normal mb-6`}
              >
                {services[3]?.description ?? ""}
              </p>

            </div>
          </div>

          {/* Machine Learning Card */}
          <div className="border border-[#2b2b2b] rounded-[10px] p-6 hover:border-[#4fc3f7] transition-all duration-300">
            <div className="bg-[#f5f8ff] w-11 h-11 rounded-[9px] flex items-center justify-center mb-6 text-2xl text-[#1a1a1a]">
              {services[4]?.icon}
            </div>
            <h3
              className={`${FONTS.body} font-semibold text-[15px] text-white mb-4 leading-[1.2]`}
            >
              {services[4]?.title ?? ""}
            </h3>
            <p
              className={`${FONTS.body} font-normal text-[14px] text-[#e1e1e1] leading-normal`}
            >
              {services[4]?.description ?? ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
