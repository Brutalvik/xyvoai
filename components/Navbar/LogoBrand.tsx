"use client";

import { NavbarBrand } from "@heroui/navbar";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import XyvoLogo from "@/components/XyvoLogo";

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
        <XyvoLogo />
      </NextLink>
    </NavbarBrand>
  );
}
