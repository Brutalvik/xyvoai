"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { WordRotate } from "@/components/ui/WordRotate";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { Image } from "@heroui/image";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3DCard";

export default function LandingHeroSection() {
  const router = useRouter();
  const t = useTranslations();
  const verbs = t.raw("hero.verbs") as string[];

  return (
    <section className="relative min-h-[600px] flex flex-col">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 gap-6 sm:gap-8 z-0">
        {/* Text Content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight flex flex-wrap items-center gap-2 justify-center md:justify-start"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block">
              <WordRotate className="inline-block text-primary" words={verbs} />
            </span>
            <span className="inline-block">{t("hero.headingRest")}</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg /90 mb-8 max-w-lg mx-auto md:mx-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t("hero.subtitle", {
              default:
                "A fully AI-native project management platform that eliminates chaos and supercharges clarity",
            })}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start w-full max-w-md mx-auto md:mx-0"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.6,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Button
                variant="solid"
                color="primary"
                onPress={() => router.push("/signup")}
              >
                {t("cta.getStarted", { default: "Get Started" })}
              </Button>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Button
                variant="flat"
                color="default"
                onPress={() => router.push("/")}
              >
                {t("cta.explore", { default: "Watch Demo" })}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 3D Animated Card */}
        <motion.div
          className="flex-1 w-full flex justify-center items-center sm:mx-0 mx-[5%]"
          initial={{ opacity: 0, scale: 0.95, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <CardContainer containerClassName="!py-0 w-full max-w-xs sm:max-w-md md:max-w-xl">
            <CardBody className="cursor-pointer">
              <CardItem translateZ={40}>
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-default-50 bg-black/80 w-full">
                  <Image
                    isBlurred
                    shadow="lg"
                    isZoomed={false}
                    src="/dashboard.png"
                    alt="Dashboard preview"
                    className="w-full h-[200px] sm:h-[280px] md:h-[320px] object-cover"
                  />
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>
        </motion.div>
      </div>
    </section>
  );
}
