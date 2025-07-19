"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
} from "@heroui/navbar";
import { Button, useDisclosure } from "@heroui/react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { useAppSelector } from "@/store/hooks";
import { isLoggedIn } from "@/store/selectors";

import LogoBrand from "./LogoBrand";
import { NavLinks } from "./NavLinks";
import AuthControls from "./AuthControls";
import UserDrawer from "./UserDrawer";
import LanguageSwitch from "@/components/LanguageSwitch";
import { ThemeSwitch } from "@/components/theme-switch";
import SigninModal from "@/components/Auth/SigninModal";
import SignupModal from "@/components/Auth/SignupModal";
import { useState } from "react";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const loggedIn = useAppSelector(isLoggedIn);

  const drawerDisclosure = useDisclosure();
  const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

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
          <NavLinks />
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
                  setIsSigninModalOpen(true);
                }}
              >
                {t("signIn")}
              </Button>
              <Button
                variant="solid"
                color="primary"
                onPress={() => {
                  setIsSignupModalOpen(true);
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
              <Button 
                variant="solid" 
                color="primary" 
                className="w-full"
                onPress={() => {
                  setIsSignupModalOpen(true);
                  document.body.click(); // close mobile menu
                }}
              >
                {t("signUp")}
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onPress={() => {
                  setIsSigninModalOpen(true);
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
      
      {/* Signin Modal */}
      <SigninModal
        isOpen={isSigninModalOpen}
        onClose={() => setIsSigninModalOpen(false)}
        onSuccessRedirect={() => {
          setIsSigninModalOpen(false);
          router.push(`/${locale}`);
        }}
        onSignupClick={() => {
          setIsSigninModalOpen(false);
          // Small delay to allow the signin modal to close before opening signup
          setTimeout(() => {
            setIsSignupModalOpen(true);
          }, 100);
        }}
      />
      
      {/* Signup Modal */}
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSuccessRedirect={() => {
          setIsSignupModalOpen(false);
          router.push(`/${locale}`);
        }}
        onSigninClick={() => {
          setIsSignupModalOpen(false);
          // Small delay to allow the signup modal to close before opening signin
          setTimeout(() => {
            setIsSigninModalOpen(true);
          }, 100);
        }}
      />
    </>
  );
}
