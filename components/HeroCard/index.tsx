"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3DCard";

export default function ThreeDCardDemo() {
  const t = useTranslations("card");

  return (
    <CardContainer className="inter-var select-none">
      <CardBody
        className="relative group/card w-auto sm:w-[30rem] h-auto rounded-xl p-6 border backdrop-blur-md transition-shadow
             border-[#2B3A55] bg-[#1E2A3A]/70 dark:border-[#2B3A55] dark:bg-[#1E2A3A]/70
             shadow-black/10 hover:shadow-xl dark:hover:shadow-blue-400/20"
      >
        <CardItem className="text-xl font-bold text-blue-500" translateZ="50">
          {t("title")}
        </CardItem>

        <CardItem
          as="p"
          className="text-default-200 text-sm max-w-sm mt-2 "
          translateZ="60"
        >
          {t("subtitle")}
        </CardItem>

        <CardItem className="w-full mt-4" translateZ="100">
          <img
            alt="thumbnail"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            height="1000"
            src="/tracker.png"
            width="1000"
          />
        </CardItem>

        <div className="flex justify-between items-center mt-20">
          <CardItem
            className="px-4 py-2 rounded-xl text-xs font-normal text-default-50 hover:cursor-pointer"
            translateZ={20}
          >
            {t("cta")}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
