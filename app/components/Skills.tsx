"use client";

import { useTranslation } from "../i18n/useTranslation";
import { FONTS, SPACING } from "../constants";
import { memo, useMemo, type ReactNode } from "react";
import {
  BarChart3,
  LineChart,
  MessageSquareText,
  Bot,
  Brain,
  Sparkles,
} from "lucide-react";
import Card3D from "./Card3D";
import { motion } from "framer-motion";

interface Service {
  icon: ReactNode;
  title: string;
  description: string;
}

const ICONS: ReactNode[] = [
  <BarChart3 key="bar" className="w-6 h-6" aria-hidden="true" />,
  <LineChart key="line" className="w-6 h-6" aria-hidden="true" />,
  <MessageSquareText key="msg" className="w-6 h-6" aria-hidden="true" />,
  <Bot key="bot" className="w-6 h-6" aria-hidden="true" />,
  <Brain key="brain" className="w-6 h-6" aria-hidden="true" />,
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function Skills() {
  const { t } = useTranslation();
  
  const services = useMemo(() => {
    const servicesRaw = t("services.items") as unknown;
    const servicesArray: Array<Partial<Service>> = Array.isArray(servicesRaw)
      ? (servicesRaw as Array<Partial<Service>>)
      : [];
    
    return servicesArray.map((item, i) => ({
      icon: (item as Partial<Service>).icon ?? ICONS[i] ?? (
        <BarChart3 className="w-6 h-6" aria-hidden="true" />
      ),
      title: item.title ?? "",
      description: item.description ?? "",
    }));
  }, [t]);

  return (
    <section
      id="services"
      className={`${SPACING.sectionPadding} ${SPACING.containerPadding} relative overflow-hidden`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-[#4fc3f7]/20 to-[#764ba2]/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-[1512px] mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12 sm:mb-14 md:mb-16"
        >
          {/* Decorative Element */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4"
          >
            <Sparkles className="w-8 h-8 text-[#4fc3f7]" />
          </motion.div>

          <h2
            className={`${FONTS.body} font-extrabold text-3xl sm:text-4xl md:text-[45px] text-(--text-primary) tracking-tight md:tracking-[-1.35px] mb-3 relative`}
          >
            {t("services.title")}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#4fc3f7] to-[#764ba2] rounded-full"
            />
          </h2>
          <p
            className={`${FONTS.body} font-semibold text-xs sm:text-sm md:text-[14px] bg-linear-to-r from-(--accent-gradient-start) to-(--accent-gradient-end) bg-clip-text text-transparent tracking-tight md:tracking-[-0.42px]`}
          >
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8 max-w-full sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1200px] mx-auto px-4 sm:px-0"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card3D className="h-full group">
                <div className="relative border border-(--border-color) rounded-2xl p-6 sm:p-7 md:p-8 hover:border-(--accent-primary) transition-all duration-500 h-full backdrop-blur-sm bg-(--background)/80 overflow-hidden">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4fc3f7]/0 to-[#764ba2]/0 group-hover:from-[#4fc3f7]/5 group-hover:to-[#764ba2]/5 transition-all duration-500 rounded-2xl" />

                  {/* Animated Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative z-10 mb-5 sm:mb-6 md:mb-7"
                  >
                    <div className="relative inline-block">
                      <motion.div
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(79, 195, 247, 0.3)",
                            "0 0 40px rgba(118, 75, 162, 0.5)",
                            "0 0 20px rgba(79, 195, 247, 0.3)",
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="bg-gradient-to-br from-[#4fc3f7] to-[#764ba2] w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-white shadow-xl"
                      >
                        {service.icon}
                      </motion.div>

                      {/* Floating particles */}
                      <motion.div
                        animate={{
                          y: [-5, 5, -5],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute -top-1 -right-1 w-3 h-3 bg-[#4fc3f7] rounded-full blur-sm"
                      />
                      <motion.div
                        animate={{
                          y: [5, -5, 5],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                        className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#764ba2] rounded-full blur-sm"
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3
                      className={`${FONTS.body} font-semibold text-base sm:text-lg md:text-[18px] text-(--text-primary) mb-3 sm:mb-4 leading-[1.2] group-hover:text-[#4fc3f7] transition-colors duration-300`}
                    >
                      {service.title}
                    </h3>
                    <p
                      className={`${FONTS.body} font-normal text-xs sm:text-sm md:text-[14px] text-(--text-secondary) leading-relaxed`}
                    >
                      {service.description}
                    </p>
                  </div>

                  {/* Decorative corner gradient */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#4fc3f7]/10 via-transparent to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Card3D>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(Skills);
