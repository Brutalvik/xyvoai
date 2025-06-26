"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3DCard";
import { useTranslations } from "next-intl";

export default function ThreeDCardDemo() {
  const t = useTranslations("card");

  return (
    <CardContainer className="inter-var select-none">
      <CardBody
        className="relative group/card w-auto sm:w-[30rem] h-auto rounded-xl p-6 border backdrop-blur-md transition-shadow
             border-[#2B3A55] bg-[#1E2A3A]/70 dark:border-[#2B3A55] dark:bg-[#1E2A3A]/70
             shadow-black/10 hover:shadow-xl dark:hover:shadow-blue-400/20"
      >
        <CardItem translateZ="50" className="text-xl font-bold text-blue-500">
          {t("title")}
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="text-default-200 text-sm max-w-sm mt-2 "
        >
          {t("subtitle")}
        </CardItem>

        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="/tracker.png"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>

        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl text-xs font-normal text-default-50 hover:cursor-pointer"
          >
            {t("cta")}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
