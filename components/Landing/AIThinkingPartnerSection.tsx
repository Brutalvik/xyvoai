"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function AIThinkingPartnerSection() {
  const t = useTranslations();

  return (
    <section
      role="region"
      aria-labelledby="ai-partner-heading"
      className="py-20 bg-default-50"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
        {/* AI Chat Preview (LEFT side) */}
        <motion.div
          className="flex-1 max-w-xl order-1 md:order-none"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div
            className="bg-violet-50 rounded-xl p-6 shadow-md"
            aria-label="AI Assistant Message Area"
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                role="img"
                aria-label="Robot"
                className="text-white rounded-xl p-2 text-xl"
              >
                🤖
              </span>
              <span className="font-semibold text-default-400">
                AI Assistant
              </span>
            </div>
            <div className="bg-white rounded-xl p-3 mb-3 text-gray-700 text-sm">
              {t("AIThinkingPartnerSection.chat1")}
            </div>
            <div className="bg-violet-100 rounded-xl p-3 mb-3 text-violet-800 text-sm">
              {t("AIThinkingPartnerSection.chat2")}
            </div>
            <div className="bg-white rounded-xl p-3 mb-3 text-gray-700 text-sm">
              {t("AIThinkingPartnerSection.chat3")}
            </div>
            <div className="bg-violet-200 rounded-xl p-3 text-violet-800 text-sm">
              {t("AIThinkingPartnerSection.chat4")}
            </div>
          </div>
        </motion.div>

        {/* Text Content (RIGHT side) */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2
            id="ai-partner-heading"
            className="text-3xl md:text-4xl font-bold mb-4 text-default-700"
          >
            {t("AIThinkingPartnerSection.title")}
          </h2>
          <p className="text-default-500 mb-8">
            {t("AIThinkingPartnerSection.description")}
          </p>
          <ul
            className="space-y-6"
            aria-label={t("AIThinkingPartnerSection.benefitsAria")}
          >
            <li className="flex items-start gap-4">
              <span
                role="img"
                aria-label="Microphone"
                className="rounded-xl p-2 text-xl"
              >
                🎤
              </span>
              <div>
                <div className="font-semibold text-default-700">
                  {t("AIThinkingPartnerSection.voiceTitle")}
                </div>
                <p className="text-default-500 text-sm">
                  {t("AIThinkingPartnerSection.voiceDesc")}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span
                role="img"
                aria-label="Chart"
                className="rounded-xl p-2 text-xl"
              >
                📊
              </span>
              <div>
                <div className="font-semibold text-default-700">
                  {t("AIThinkingPartnerSection.analyticsTitle")}
                </div>
                <p className="text-default-500 text-sm">
                  {t("AIThinkingPartnerSection.analyticsDesc")}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span
                role="img"
                aria-label="Robot"
                className="rounded-xl p-2 text-xl"
              >
                🤖
              </span>
              <div>
                <div className="font-semibold text-default-700">
                  {t("AIThinkingPartnerSection.automationTitle")}
                </div>
                <p className="text-default-500 text-sm">
                  {t("AIThinkingPartnerSection.automationDesc")}
                </p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
