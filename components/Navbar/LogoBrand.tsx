"use client";

import { NavbarBrand } from "@heroui/navbar";
import NextLink from "next/link";
import { Logo } from "@/components/icons";
import { useTranslations } from "next-intl";

export default function LogoBrand() {
  const t = useTranslations("Navbar");

  return (
    <NavbarBrand
      as="li"
      className="gap-3 max-w-fit flex-shrink-0 min-w-0 w-auto"
    >
      <NextLink
        className="flex items-center gap-1 flex-shrink-0 min-w-0 w-auto"
        href="/"
        aria-label={t("logoAria", { default: "Go to homepage" })}
      >
        <Logo className="h-7 w-7 sm:h-8 sm:w-8" />
        <span className="font-bold text-lg text-gray-800 whitespace-nowrap">
          YVO
        </span>
      </NextLink>
    </NavbarBrand>
  );
}
