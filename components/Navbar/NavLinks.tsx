"use client";

import { NavbarItem, NavbarMenuItem } from "@heroui/navbar";
import NextLink from "next/link";
import { useTranslations } from "next-intl";

export function NavLinks() {
  const t = useTranslations("Navbar");

  const links = [
    { href: "#features", label: t("features", { default: "Features" }) },
    { href: "#pricing", label: t("pricing", { default: "Pricing" }) },
    { href: "#about", label: t("about", { default: "About" }) },
  ];

  return (
    <>
      {links.map(({ href, label }) => (
        <NavbarItem key={href}>
          <NextLink
            href={href}
            className="hover:text-blue-700 text-default-700 font-medium hover:text-blue-700 transition-colors focus:outline-none focus:text-blue-700"
          >
            {label}
          </NextLink>
        </NavbarItem>
      ))}
    </>
  );
}

export function MobileNavLinks() {
  const t = useTranslations("Navbar");

  const links = [
    { href: "#features", label: t("features", { default: "Features" }) },
    { href: "#pricing", label: t("pricing", { default: "Pricing" }) },
    { href: "#about", label: t("about", { default: "About" }) },
  ];

  return (
    <>
      {links.map(({ href, label }) => (
        <NavbarMenuItem key={href}>
          <NextLink
            href={href}
            className="block py-2 px-4 font-medium focus:outline-none focus:text-blue-700 text-default-700 hover:text-blue-700 transition-colors focus:outline-none focus:text-blue-700"
          >
            {label}
          </NextLink>
        </NavbarMenuItem>
      ))}
    </>
  );
}
