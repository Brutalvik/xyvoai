"use client";

import React from "react";
import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations();

  return (
    <section
      role="region"
      aria-labelledby="cta-heading"
      className="bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] py-20 text-center"
    >
      <h2
        id="cta-heading"
        className="text-3xl md:text-4xl font-bold text-white mb-4"
      >
        {t("CTASection.title")}
      </h2>

      <p
        className="text-lg text-white mb-8"
        aria-label={t("CTASection.ariaSubheading")}
      >
        {t("CTASection.subtitle")}
        {t("CTASection.cta")}
      </p>

      <div
        className="flex justify-center gap-4 mb-4"
        role="group"
        aria-label="Call to Action Buttons"
      >
        <button
          type="button"
          className="bg-white text-violet-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
          aria-label={t("CTASection.freeTrial")}
        >
          {t("CTASection.freeTrial")}
        </button>
        <button
          type="button"
          className="bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white hover:bg-white/30 transition"
          aria-label={t("CTASection.bookDemo")}
        >
          {t("CTASection.bookDemo")}
        </button>
      </div>

      <div className="text-xs text-white/80" aria-label="Trial Details">
        {t("CTASection.trialDetails")}
      </div>
    </section>
  );
}
