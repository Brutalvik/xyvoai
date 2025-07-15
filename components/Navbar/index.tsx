"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
} from "@heroui/navbar";
import { Button, useDisclosure } from "@heroui/react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import NextLink from "next/link";
import { useAppSelector } from "@/store/hooks";
import { isLoggedIn } from "@/store/selectors";

import LogoBrand from "./LogoBrand";
import { NavLinks } from "./NavLinks";
import AuthControls from "./AuthControls";
import UserDrawer from "./UserDrawer";
import LanguageSwitch from "@/components/LanguageSwitch";
import { ThemeSwitch } from "@/components/theme-switch";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const loggedIn = useAppSelector(isLoggedIn);

  const drawerDisclosure = useDisclosure();

  return (
    <>
      <HeroUINavbar
        maxWidth="full"
        position="sticky"
        role="navigation"
        aria-label={t("mainNavAria")}
        className="py-2 px-4 sm:px-6 rounded-2xl shadow-lg backdrop-blur sticky top-0 z-50 mb-8 overflow-x-clip"
      >
        {/* Desktop Left */}
        <NavbarContent className="gap-4 hidden md:flex" justify="start">
          <LogoBrand />
          {!loggedIn && <NavLinks />}
        </NavbarContent>

        {/* Mobile: Logo + Toggles */}
        <NavbarContent
          className="flex flex-shrink-0 min-w-0 w-full items-center justify-between px-2 md:hidden"
          justify="center"
        >
          <LogoBrand />
          <div className="flex items-center ml-auto space-x-3 sm:space-x-4">
            <LanguageSwitch />
            <ThemeSwitch />
            <NavbarMenuToggle />
          </div>
        </NavbarContent>

        {/* Desktop Right */}
        {/* Desktop Right */}
        <NavbarContent className="gap-4 hidden md:flex" justify="end">
          <LanguageSwitch />
          <ThemeSwitch />
          {!loggedIn ? (
            <>
              <Button
                variant="ghost"
                onPress={() => {
                  router.push(`/${locale}/auth/signin`);
                }}
              >
                {t("signIn")}
              </Button>
              <Button
                variant="solid"
                color="primary"
                onPress={() => {
                  router.push(`/${locale}/auth/signup`);
                }}
              >
                {t("signUp")}
              </Button>
            </>
          ) : (
            <AuthControls onAvatarClick={drawerDisclosure.onOpen} />
          )}
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu className="!p-6 space-y-6 backdrop-blur-md shadow-lg">
          {!loggedIn && (
            <div className="flex flex-col items-end gap-3 w-full mt-4">
              <NextLink href={`/${locale}/auth/signup`} className="w-[90%]">
                <Button variant="solid" color="primary" className="w-full">
                  {t("signUp")}
                </Button>
              </NextLink>
              <Button
                variant="ghost"
                className="w-full"
                onPress={() => {
                  router.push(`/${locale}/auth/signin`);
                  document.body.click(); // close mobile menu
                }}
              >
                {t("signIn")}
              </Button>
            </div>
          )}
          {!loggedIn && (
            <nav className="flex flex-col items-end gap-5 mt-6">
              <NextLink href="#features" className="text-lg font-semibold">
                {t("features")}
              </NextLink>
              <NextLink href="#pricing" className="text-lg font-semibold">
                {t("pricing")}
              </NextLink>
              <NextLink href="#about" className="text-lg font-semibold">
                {t("about")}
              </NextLink>
            </nav>
          )}
        </NavbarMenu>
      </HeroUINavbar>

      {/* User Drawer (still active for logged in users) */}
      {loggedIn && (
        <UserDrawer
          isOpen={drawerDisclosure.isOpen}
          onOpenChange={drawerDisclosure.onOpenChange}
        />
      )}
    </>
  );
}
