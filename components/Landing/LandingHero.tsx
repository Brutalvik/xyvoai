"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { WordRotate } from "@/components/ui/WordRotate";

export default function LandingHeroSection() {
  const t = useTranslations();
  const verbs = t.raw("hero.verbs") as string[];

  return (
    <section className="relative min-h-[600px] flex flex-col bg-gradient-to-br from-[#18192b] via-[#23243a] to-[#312e81]">
      {/* Hero Content */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 gap-6 sm:gap-8 z-0">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight flex flex-wrap items-center gap-2 justify-center md:justify-start"
          >
            <span className="inline-block">
              <WordRotate className="inline-block text-primary" words={verbs} />
            </span>
            <span className="inline-block">{t("hero.headingRest")}</span>
          </motion.h1>
          <p className="text-base sm:text-lg text-white/90 mb-8 max-w-lg mx-auto md:mx-0">
            {t("hero.subtitle", {
              default:
                "A fully AI-native project management platform that eliminates chaos and supercharges clarity",
            })}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start w-full max-w-md mx-auto md:mx-0">
            <a
              href="#signup"
              className="bg-white text-[#7c3aed] px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition text-center w-full sm:w-auto"
            >
              {t("cta.getStarted", { default: "Get Started" })}
            </a>
            <a
              href="#demo"
              className="bg-white/20 border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition text-center flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z"
                />
              </svg>
              {t("cta.explore", { default: "Watch Demo" })}
            </a>
          </div>
        </div>
        {/* Dashboard Image */}
        <div className="flex-1 flex justify-center items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-black/80 w-full max-w-xs sm:max-w-md md:max-w-xl">
            {/* Replace src with your dashboard image */}
            <img
              src="/dashboard.png"
              alt="Dashboard preview"
              className="w-full h-[200px] sm:h-[280px] md:h-[320px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
