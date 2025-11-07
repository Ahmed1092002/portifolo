"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/LanguageContext";

export default function LocalizationLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useLanguage();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-9999 flex items-center justify-center px-4 sm:px-6 bg-white dark:bg-gray-900"
          >
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-black opacity-50" />
            
            <div className="relative text-center max-w-md w-full">
              {/* Animated Logo/Icon */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-6 sm:mb-8"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto border-3 sm:border-4 border-cyan-500 dark:border-cyan-400 rounded-lg relative shadow-lg shadow-cyan-500/30 dark:shadow-cyan-400/50">
                  <div className="absolute inset-2 bg-cyan-500/10 dark:bg-cyan-400/20 rounded-sm backdrop-blur-sm" />
                  <motion.div
                    className="absolute inset-0 border-2 border-blue-500 dark:border-blue-400 rounded-lg"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>

              {/* Loading Text */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2"
              >
                Loading...
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-6 sm:mb-8"
              >
                Preparing your experience
              </motion.p>

              {/* Animated Dots */}
              <div className="flex justify-center gap-2 sm:gap-3 mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-cyan-500 dark:bg-cyan-400 rounded-full shadow-md sm:shadow-lg shadow-cyan-500/40 dark:shadow-cyan-400/50"
                    animate={{
                      y: [0, -8, 0],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Pulse Circles - Multiple layers for better visual effect */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 border border-cyan-500/20 dark:border-cyan-400/20 rounded-full pointer-events-none"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 border border-blue-500/20 dark:border-blue-400/20 rounded-full pointer-events-none"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5,
                }}
              />

              {/* Decorative Elements */}
              <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-500 dark:bg-cyan-400 rounded-full opacity-50 blur-sm" />
              <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 dark:bg-purple-400 rounded-full opacity-50 blur-sm" />
              <div className="absolute top-1/4 right-10 sm:right-16 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 dark:bg-blue-400 rounded-full opacity-40 blur-sm" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render children only when loading is complete */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
