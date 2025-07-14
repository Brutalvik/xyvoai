"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Button } from "@heroui/button";

import { BackgroundLines } from "@/components/ui/BackgroundLines";
import { WordRotate } from "@/components/ui/WordRotate";
import HeroCard from "@/components/HeroCard";

export default function HeroSection() {
  const t = useTranslations();
  const verbs = t.raw("hero.verbs") as string[];

  return (
    <BackgroundLines>
      <section className="sm:px-8 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        <div className="text-center lg:text-left flex-1 max-w-2xl w-full">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold leading-tight flex flex-wrap items-center justify-center lg:justify-start gap-2"
            initial={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block">
              <WordRotate className="inline-block text-primary" words={verbs} />
            </span>
            <span className="inline-block">{t("hero.headingRest")}</span>
          </motion.h1>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-base sm:text-lg text-default-500 max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            animate={{ opacity: 1 }}
            className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button color="primary" size="lg" variant="solid">
              <Rocket className="w-5 h-5 mr-2" />
              {t("cta.getStarted")}
            </Button>
            <Button size="lg" variant="solid">
              {t("cta.explore")}
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 max-w-xl w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <HeroCard />
        </motion.div>
      </section>
    </BackgroundLines>
  );
}
