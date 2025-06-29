"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  const t = useTranslations("privacy");

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-10 text-sm sm:text-base leading-relaxed text-foreground"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <p className="mb-4">{t("intro")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        {t("collectionTitle")}
      </h2>
      <p className="mb-4">{t("collection")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t("usageTitle")}</h2>
      <p className="mb-4">{t("usage")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t("sharingTitle")}</h2>
      <p className="mb-4">{t("sharing")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t("securityTitle")}</h2>
      <p className="mb-4">{t("security")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">
        {t("yourRightsTitle")}
      </h2>
      <p className="mb-4">{t("yourRights")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t("retentionTitle")}</h2>
      <p className="mb-4">{t("retention")}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">{t("contactTitle")}</h2>
      <p className="mb-4">{t("contact")}</p>
    </motion.div>
  );
}
