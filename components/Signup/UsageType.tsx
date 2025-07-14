"use client";

import React from "react";
import { RadioGroup, Radio } from "@heroui/react";
import { useTranslations } from "next-intl";

type UsageType = "personal" | "team";

interface Props {
  value: UsageType | "";
  onChange: (val: UsageType) => void;
  isInvalid?: boolean;
}

export default function UsageTypeSelector({
  value,
  onChange,
  isInvalid = false,
}: Props) {
  const t = useTranslations("signup");

  return (
    <div className="flex flex-col gap-3">
      <RadioGroup
        description={t("selectUsageDescription")}
        errorMessage={isInvalid ? t("selectUsageError") : undefined}
        isInvalid={isInvalid}
        label={t("selectUsageTitle")}
        value={value}
        onValueChange={(val) => onChange(val as UsageType)}
      >
        <Radio value="personal">{t("selectUsageOptionIndividual")}</Radio>
        <Radio value="team">{t("selectUsageOptionTeam")}</Radio>
      </RadioGroup>
    </div>
  );
}
