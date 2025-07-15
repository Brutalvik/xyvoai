"use client";
import React from "react";
import { useTranslations } from "next-intl";

export default function FeaturesSection() {
  const t = useTranslations();
  return (
    <section
      id="features"
      role="region"
      aria-labelledby="features-heading"
      className="py-20 bg-white"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="features-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-2"
        >
          {t("FeaturesSection.title")}
        </h2>
        <p className="text-center text-gray-500 mb-12">
          {t("FeaturesSection.subtitle")}
        </p>
        <div className="grid md:grid-cols-3 gap-8" role="list">
          <article
            className="bg-violet-50 rounded-xl p-6 shadow-sm"
            role="listitem"
          >
            <div
              className="bg-violet-600 w-10 h-10 flex items-center justify-center rounded-lg mb-4"
              aria-hidden="true"
            >
              <span className="text-white text-2xl">🎤</span>
            </div>
            <h3 className="font-bold text-lg mb-1">
              {t("FeaturesSection.aiTitle")}
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              {t("FeaturesSection.aiDesc")}
            </p>
            <ul
              className="text-sm text-gray-600 space-y-1"
              aria-label={t("FeaturesSection.aiAria")}
            >
              <li>✔ {t("FeaturesSection.aiVoice")}</li>
              <li>✔ {t("FeaturesSection.aiSummaries")}</li>
              <li>✔ {t("FeaturesSection.aiPrioritization")}</li>
            </ul>
          </article>

          <article
            className="bg-green-50 rounded-xl p-6 shadow-sm"
            role="listitem"
          >
            <div
              className="bg-green-600 w-10 h-10 flex items-center justify-center rounded-lg mb-4"
              aria-hidden="true"
            >
              <span className="text-white text-2xl">🗂️</span>
            </div>
            <h3 className="font-bold text-lg mb-1">
              {t("FeaturesSection.pmTitle")}
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              {t("FeaturesSection.pmDesc")}
            </p>
            <ul
              className="text-sm text-gray-600 space-y-1"
              aria-label={t("FeaturesSection.pmAria")}
            >
              <li>✔ {t("FeaturesSection.pmKanban")}</li>
              <li>✔ {t("FeaturesSection.pmStory")}</li>
              <li>✔ {t("FeaturesSection.pmTimeline")}</li>
            </ul>
          </article>

          <article
            className="bg-orange-50 rounded-xl p-6 shadow-sm"
            role="listitem"
          >
            <div
              className="bg-orange-500 w-10 h-10 flex items-center justify-center rounded-lg mb-4"
              aria-hidden="true"
            >
              <span className="text-white text-2xl">🔌</span>
            </div>
            <h3 className="font-bold text-lg mb-1">
              {t("FeaturesSection.integrationsTitle")}
            </h3>
            <p className="text-gray-700 text-sm mb-3">
              {t("FeaturesSection.integrationsDesc")}
            </p>
            <ul
              className="text-sm text-gray-600 space-y-1"
              aria-label={t("FeaturesSection.integrationsAria")}
            >
              <li>✔ {t("FeaturesSection.integrationsSync")}</li>
              <li>✔ {t("FeaturesSection.integrationsWorkflows")}</li>
              <li>✔ {t("FeaturesSection.integrationsPermissions")}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
