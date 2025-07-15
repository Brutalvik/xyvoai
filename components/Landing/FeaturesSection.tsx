"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const t = useTranslations();

  const cards = [
    {
      icon: "🎤",
      color: "bg-violet-600",
      bg: "bg-violet-50",
      title: t("FeaturesSection.aiTitle"),
      desc: t("FeaturesSection.aiDesc"),
      aria: t("FeaturesSection.aiAria"),
      items: [
        t("FeaturesSection.aiVoice"),
        t("FeaturesSection.aiSummaries"),
        t("FeaturesSection.aiPrioritization"),
      ],
    },
    {
      icon: "🗂️",
      color: "bg-green-600",
      bg: "bg-green-50",
      title: t("FeaturesSection.pmTitle"),
      desc: t("FeaturesSection.pmDesc"),
      aria: t("FeaturesSection.pmAria"),
      items: [
        t("FeaturesSection.pmKanban"),
        t("FeaturesSection.pmStory"),
        t("FeaturesSection.pmTimeline"),
      ],
    },
    {
      icon: "🔌",
      color: "bg-orange-500",
      bg: "bg-orange-50",
      title: t("FeaturesSection.integrationsTitle"),
      desc: t("FeaturesSection.integrationsDesc"),
      aria: t("FeaturesSection.integrationsAria"),
      items: [
        t("FeaturesSection.integrationsSync"),
        t("FeaturesSection.integrationsWorkflows"),
        t("FeaturesSection.integrationsPermissions"),
      ],
    },
  ];

  return (
    <section
      id="features"
      role="region"
      aria-labelledby="features-heading"
      className="py-20 bg-background"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="features-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-2 text-foreground"
        >
          {t("FeaturesSection.title")}
        </h2>
        <p className="text-center text-muted mb-12">
          {t("FeaturesSection.subtitle")}
        </p>
        <div className="grid md:grid-cols-3 gap-8" role="list">
          {cards.map((card, i) => (
            <motion.article
              key={i}
              role="listitem"
              className={`${card.bg} rounded-xl p-6 shadow-sm`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div
                className={`${card.color} w-10 h-10 flex items-center justify-center rounded-lg mb-4`}
                aria-hidden="true"
              >
                <span className="text-default text-2xl">{card.icon}</span>
              </div>
              <h3 className="font-bold text-lg mb-1 text-foreground">
                {card.title}
              </h3>
              <p className="text-default text-sm mb-3">{card.desc}</p>
              <ul
                className="text-sm text-default space-y-1"
                aria-label={card.aria}
              >
                {card.items.map((text, j) => (
                  <li key={j}>✔ {text}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
