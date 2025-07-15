"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function TimelineView() {
  const t = useTranslations("ViewsSection");
  const phases = [
    {
      label: t("setup", { default: "Setup" }),
      start: 0,
      end: 10,
      color: "bg-gray-400",
    },
    {
      label: t("auth", { default: "Auth" }),
      start: 12,
      end: 32,
      color: "bg-[#7c3aed]",
    },
    {
      label: t("api", { default: "API" }),
      start: 34,
      end: 45,
      color: "bg-blue-400",
    },
    {
      label: t("ui", { default: "UI" }),
      start: 48,
      end: 70,
      color: "bg-green-400",
    },
    {
      label: t("review", { default: "Review" }),
      start: 75,
      end: 90,
      color: "bg-orange-400",
    },
  ];

  return (
    <motion.div
      key="timeline"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center"
      role="tabpanel"
      aria-labelledby="tab-timeline"
      tabIndex={0}
    >
      <div className="w-full max-w-2xl relative h-24">
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded-full" />
        {phases.map((ev, i) => (
          <div
            key={ev.label}
            className={`absolute h-4 rounded-full ${ev.color}`}
            style={{
              left: `${ev.start}%`,
              width: `${ev.end - ev.start}%`,
              top: "40%",
            }}
            aria-label={`${ev.label} phase`}
          >
            <span className="sr-only">{ev.label}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between w-full max-w-2xl mt-2 text-xs text-gray-500">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
      <div className="mt-4 text-sm text-gray-600 text-center">
        <span className="inline-block w-4 h-4 rounded-full bg-[#7c3aed] mr-2 align-middle"></span>
        {t("timelineDemo", { default: "Timeline demo" })}
      </div>
    </motion.div>
  );
}
