"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function ConditionsOfUse() {
  const t = useTranslations("conditions");

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-10 text-sm sm:text-base leading-relaxed text-foreground"
      initial={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <p className="mb-4">{t("intro")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        {t("acceptanceTitle")}
      </h2>
      <p className="mb-4">{t("acceptance")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        {t("intellectualTitle")}
      </h2>
      <p className="mb-4">{t("intellectual")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        {t("disclaimerTitle")}
      </h2>
      <p className="mb-4">{t("disclaimer")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        {t("limitationTitle")}
      </h2>
      <p className="mb-4">{t("limitation")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        {t("userConductTitle")}
      </h2>
      <p className="mb-4">{t("userConduct")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        {t("governingLawTitle")}
      </h2>
      <p className="mb-4">{t("governingLaw")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        {t("modificationTitle")}
      </h2>
      <p className="mb-4">{t("modification")}</p>
    </motion.div>
  );
}
