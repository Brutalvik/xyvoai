"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
} from "@heroui/navbar";
import { useDisclosure } from "@heroui/react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

import LogoBrand from "./LogoBrand";
import { NavLinks } from "./NavLinks";
import AuthControls from "./AuthControls";
import UserDrawer from "./UserDrawer";
import LanguageSwitch from "@/components/LanguageSwitch";
import { ThemeSwitch } from "@/components/theme-switch";
import { useAppSelector } from "@/store/hooks";
import { isLoggedIn } from "@/store/selectors";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const locale = useLocale();
  const pathname = usePathname();
  const loggedIn = useAppSelector(isLoggedIn);

  const isSignInPage = pathname === `/${locale}/auth/signin`;
  const isSignUpPage = pathname === `/${locale}/auth/signup`;

  return (
    <>
      <HeroUINavbar
        maxWidth="full"
        position="sticky"
        role="navigation"
        aria-label={t("mainNavAria", { default: "Main Navigation" })}
        className="py-2 px-4 sm:px-8 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg backdrop-blur sticky top-0 z-50 mb-8 overflow-x-clip"
      >
        {/* Desktop Left: Logo + Nav Links */}
        <NavbarContent className="gap-4 hidden md:flex" justify="start">
          <LogoBrand />
          <NavLinks />
        </NavbarContent>

        {/* Mobile: Logo left, controls right */}
        <NavbarContent
          className="flex flex-shrink-0 min-w-0 w-full items-center justify-between px-2 md:hidden"
          justify="center"
        >
          <LogoBrand />
          <div className="flex items-center gap-2 ml-auto">
            <LanguageSwitch />
            <ThemeSwitch />
            <NavbarMenuToggle
              aria-label={t("menuToggleAria", { default: "Toggle menu" })}
            />
          </div>
        </NavbarContent>

        {/* Desktop Right: Controls */}
        <NavbarContent className="gap-4 hidden md:flex" justify="end">
          <LanguageSwitch />
          <ThemeSwitch />
          <AuthControls onAvatarClick={onOpen} />
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu
          className="!p-6 space-y-6 bg-white/80 dark:bg-gray-900/80 text-gray-900 dark:text-white backdrop-blur-md border-none shadow-lg"
          aria-label={t("menuAria", { default: "Mobile Navigation Menu" })}
        >
          {/* Auth buttons first with spacing */}
          {!loggedIn && (
            <div className="flex flex-col items-end gap-3 w-full mt-4">
              {!isSignUpPage && (
                <NextLink href={`/${locale}/auth/signup`} className="w-[90%]">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={t("signUp")}
                  >
                    {t("signUp")}
                  </button>
                </NextLink>
              )}
              {!isSignInPage && (
                <NextLink href={`/${locale}/auth/signin`} className="w-[90%]">
                  <button
                    className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-base font-semibold text-gray-800 dark:text-white py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={t("signIn")}
                  >
                    {t("signIn")}
                  </button>
                </NextLink>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <nav
            role="menu"
            aria-label={t("sectionNav", { default: "Navigation Links" })}
            className="flex flex-col items-end gap-5 mt-6"
          >
            <NextLink
              href="#features"
              className="text-lg font-semibold hover:text-[#7c3aed] focus:outline-none"
            >
              {t("features", { default: "Features" })}
            </NextLink>
            <NextLink
              href="#pricing"
              className="text-lg font-semibold hover:text-[#7c3aed] focus:outline-none"
            >
              {t("pricing", { default: "Pricing" })}
            </NextLink>
            <NextLink
              href="#about"
              className="text-lg font-semibold hover:text-[#7c3aed] focus:outline-none"
            >
              {t("about", { default: "About Us" })}
            </NextLink>
          </nav>
        </NavbarMenu>
      </HeroUINavbar>

      {/* Profile drawer */}
      <UserDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
