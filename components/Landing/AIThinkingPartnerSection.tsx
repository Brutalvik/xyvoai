"use client";
import React from "react";
import { useTranslations } from "next-intl";

export default function AIThinkingPartnerSection() {
  const t = useTranslations();
  return (
    <section
      role="region"
      aria-labelledby="ai-partner-heading"
      className="py-20 bg-default-50"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <h2
            id="ai-partner-heading"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t("AIThinkingPartnerSection.title")}
          </h2>
          <p className="text-gray-700 mb-8">
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
                className="bg-violet-100 text-violet-700 rounded-lg p-2 text-xl"
              >
                🎤
              </span>
              <div>
                <div className="font-semibold">
                  {t("AIThinkingPartnerSection.voiceTitle")}
                </div>
                <p className="text-gray-600 text-sm">
                  {t("AIThinkingPartnerSection.voiceDesc")}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span
                role="img"
                aria-label="Chart"
                className="bg-blue-100 text-blue-700 rounded-lg p-2 text-xl"
              >
                📊
              </span>
              <div>
                <div className="font-semibold">
                  {t("AIThinkingPartnerSection.analyticsTitle")}
                </div>
                <p className="text-gray-600 text-sm">
                  {t("AIThinkingPartnerSection.analyticsDesc")}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span
                role="img"
                aria-label="Robot"
                className="bg-green-100 text-green-700 rounded-lg p-2 text-xl"
              >
                🤖
              </span>
              <div>
                <div className="font-semibold">
                  {t("AIThinkingPartnerSection.automationTitle")}
                </div>
                <p className="text-gray-600 text-sm">
                  {t("AIThinkingPartnerSection.automationDesc")}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="flex-1 max-w-xl">
          <div
            className="bg-violet-50 rounded-xl p-6 shadow-md"
            aria-label="AI Assistant Message Area"
          >
            <div className="flex items-center gap-2 mb-4">
              <span
                role="img"
                aria-label="Robot"
                className="bg-violet-600 text-white rounded-lg p-2 text-xl"
              >
                🤖
              </span>
              <span className="font-semibold text-gray-800">AI Assistant</span>
            </div>
            <div className="bg-white rounded p-3 mb-3 text-gray-700 text-sm">
              {t("AIThinkingPartnerSection.chat1")}
            </div>
            <div className="bg-violet-100 rounded p-3 mb-3 text-gray-700 text-sm">
              {t("AIThinkingPartnerSection.chat2")}
            </div>
            <div className="bg-white rounded p-3 mb-3 text-gray-700 text-sm">
              {t("AIThinkingPartnerSection.chat3")}
            </div>
            <div className="bg-violet-200 rounded p-3 text-violet-800 text-sm">
              {t("AIThinkingPartnerSection.chat4")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
