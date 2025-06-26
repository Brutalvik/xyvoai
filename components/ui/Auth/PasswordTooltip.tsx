"use client";

import { Tooltip } from "@heroui/react";
import React from "react";
import { FcInfo } from "react-icons/fc";
import { useTranslations } from "next-intl";

const ForwardedFcInfo = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>((props, ref) => (
  <span {...props} ref={ref}>
    <FcInfo className="text-lg text-default-400 cursor-pointer" />
  </span>
));

const PasswordTooltip = () => {
  const t = useTranslations("auth");

  return (
    <div className="flex items-center gap-1 text-xs">
      <span>{t("password.instructionsLabel")}</span>
      <Tooltip
        content={
          <div className="px-2 py-1 text-xs">
            <ul className="list-disc pl-4">
              <li>{t("password.minCharacters")}</li>
              <li>{t("password.specialCharacter")}</li>
              <li>{t("password.uppercase")}</li>
              <li>{t("password.lowercase")}</li>
              <li>{t("password.number")}</li>
            </ul>
          </div>
        }
      >
        <ForwardedFcInfo />
      </Tooltip>
    </div>
  );
};

export default PasswordTooltip;
