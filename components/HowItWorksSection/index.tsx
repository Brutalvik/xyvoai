"use client";

import { Card, CardBody } from "@heroui/card";
import { motion } from "framer-motion";
import { Lightbulb, CalendarClock, BarChart, Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import { FC } from "react";

type FeatureKey =
  | "taskCreation"
  | "smartScheduling"
  | "progressTracking"
  | "multilingual";

interface FeatureItem {
  icon: FC<React.SVGProps<SVGSVGElement>>;
  key: FeatureKey;
}

const features: FeatureItem[] = [
  { icon: Lightbulb, key: "taskCreation" },
  { icon: CalendarClock, key: "smartScheduling" },
  { icon: BarChart, key: "progressTracking" },
  { icon: Languages, key: "multilingual" },
];

export default function HowItWorksSection() {
  const t = useTranslations("HowItWorks");

  return (
    <section className="w-full bg-background py-24">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-bold text-white mb-16 tracking-tight"
        >
          {t("title")}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            if (!Icon) return null;

            return (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-muted/40 shadow-xl bg-gradient-to-br from-background/60 to-muted/10 backdrop-blur-sm hover:scale-[1.03] hover:shadow-2xl transition-transform duration-300 ease-out rounded-2xl">
                  <CardBody className="p-8 flex flex-col items-center justify-center text-center gap-4">
                    <div className="bg-primary/20 rounded-full p-4 shadow-inner">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-default-700 leading-snug">
                      {t(`${feature.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                      {t(`${feature.key}.description`)}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
