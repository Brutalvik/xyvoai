"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
} from "@heroui/navbar";
import { Button, useDisclosure } from "@heroui/react";
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
        className="py-2 px-4 sm:px-6 rounded-2xl shadow-lg backdrop-blur sticky top-0 z-50 mb-8 overflow-x-clip"
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
          <div className="flex items-center ml-auto space-x-3 sm:space-x-4">
            <LanguageSwitch
              aria-label={t("languageToggle", { default: "Toggle Language" })}
            />
            <ThemeSwitch
              aria-label={t("themeToggle", { default: "Toggle Theme" })}
            />
            <NavbarMenuToggle
              aria-label={t("menuToggleAria", {
                default: "Toggle navigation menu",
              })}
            />
          </div>
        </NavbarContent>

        {/* Desktop Right: Controls */}
        <NavbarContent className="gap-4 hidden md:flex" justify="end">
          <LanguageSwitch
            aria-label={t("languageToggle", { default: "Toggle Language" })}
          />
          <ThemeSwitch
            aria-label={t("themeToggle", { default: "Toggle Theme" })}
          />
          <AuthControls onAvatarClick={onOpen} />
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu
          className="!p-6 space-y-6 bg-default-50/80 text-default-500 backdrop-blur-md border-none shadow-lg"
          aria-label={t("menuAria", { default: "Mobile Navigation Menu" })}
        >
          {/* Auth buttons first with spacing */}
          {!loggedIn && (
            <div className="flex flex-col items-end gap-3 w-full mt-4">
              {!isSignUpPage && (
                <NextLink href={`/${locale}/auth/signup`} className="w-[90%]">
                  <Button
                    variant="solid"
                    color="primary"
                    className="w-full"
                    aria-label={t("signUp", { default: "Sign Up" })}
                  >
                    {t("signUp")}
                  </Button>
                </NextLink>
              )}
              {!isSignInPage && (
                <NextLink href={`/${locale}/auth/signin`} className="w-[90%]">
                  <Button
                    variant="ghost"
                    className="w-full"
                    aria-label={t("signIn")}
                  >
                    {t("signIn")}
                  </Button>
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
              aria-label={t("features")}
            >
              {t("features", { default: "Features" })}
            </NextLink>
            <NextLink
              href="#pricing"
              className="text-lg font-semibold hover:text-[#7c3aed] focus:outline-none"
              aria-label={t("pricing")}
            >
              {t("pricing", { default: "Pricing" })}
            </NextLink>
            <NextLink
              href="#about"
              className="text-lg font-semibold hover:text-[#7c3aed] focus:outline-none"
              aria-label={t("about")}
            >
              {t("about", { default: "About Us" })}
            </NextLink>
          </nav>
        </NavbarMenu>
      </HeroUINavbar>

      {/* Drawer */}
      <UserDrawer isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
