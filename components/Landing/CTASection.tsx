"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CTASection() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <section
      role="region"
      aria-labelledby="cta-heading"
      className="py-20 text-center text-default-700"
    >
      <motion.h2
        id="cta-heading"
        className="text-3xl md:text-4xl font-bold text-default-700 mb-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t("CTASection.title")}
      </motion.h2>

      <motion.p
        className="text-lg text-default-700 mb-8"
        aria-label={t("CTASection.ariaSubheading")}
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t("CTASection.subtitle")}
        {t("CTASection.cta")}
      </motion.p>

      <motion.div
        className="flex justify-center gap-4 mb-4"
        role="group"
        aria-label="Call to Action Buttons"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15, delayChildren: 0.4 },
          },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Button
            variant="ghost"
            color="primary"
            onPress={() => router.push("/signup")}
          >
            {t("CTASection.freeTrial")}
          </Button>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <Button
            variant="ghost"
            color="default"
            onPress={() => router.push("/")}
          >
            {t("CTASection.bookDemo")}
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="text-xs text-default-500"
        aria-label="Trial Details"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {t("CTASection.trialDetails")}
      </motion.div>
    </section>
  );
}
