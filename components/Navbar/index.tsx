"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import {
  Button,
  Avatar,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
} from "@heroui/react";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser, isLoggedIn } from "@/store/selectors";
import { signoutThunk } from "@/store/auth/thunks";
import { SearchInput } from "@/components/SearchInput";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLocale, useTranslations } from "next-intl";
import { addToast } from "@heroui/react";
import { HiInformationCircle } from "react-icons/hi";
import _ from "lodash";
import { getBgColor, getInitial } from "@/utils";
import { UserState } from "@/types";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const activeUser: any = useAppSelector(selectUser);
  const loggedIn = useAppSelector(isLoggedIn);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = activeUser ? activeUser : { user: null };

  const avatarBg = useMemo(() => {
    return user?.id ? getBgColor(user.id) : "bg-gray-400";
  }, [user?.id]);

  const avatarInitial = useMemo(() => {
    return getInitial(user?.name || "");
  }, [user?.name]);

  const isSignInPage = pathname === `/${locale}/auth/signin`;
  const isSignUpPage = pathname === `/${locale}/auth/signup`;

  return (
    <HeroUINavbar maxWidth="full" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit text-2xl">YVO</p>
          </NextLink>
        </NavbarBrand>
        {/* <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul> */}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">
          <SearchInput />
        </NavbarItem>
        <NavbarItem>
          <LanguageSwitch />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>

        {loggedIn && user && (
          <NavbarItem className="hidden sm:flex">
            <Avatar
              size="sm"
              src={user?.image || undefined}
              name={avatarInitial}
              onClick={onOpen}
              className={clsx(
                "cursor-pointer text-white",
                !user?.image && avatarBg // only apply bg class if no image
              )}
              style={{
                ...(user?.image
                  ? {}
                  : {
                      backgroundColor: getBgColor(user?.id || "", true), // fallback to hex
                      fontSize: "0.975rem", // ~14px
                      fontWeight: "700",
                      color: "#ffffff",
                    }),
              }}
            />
          </NavbarItem>
        )}

        {!loggedIn && (
          <>
            {!isSignUpPage && (
              <NavbarItem>
                <NextLink href={`/${locale}/auth/signup`}>
                  <Button size="sm" variant="ghost" color="primary">
                    {t("signUp")}
                  </Button>
                </NextLink>
              </NavbarItem>
            )}
            {!isSignInPage && (
              <NavbarItem>
                <NextLink href={`/${locale}/auth/signin`}>
                  <Button size="sm" variant="flat" color="primary">
                    {t("signIn")}
                  </Button>
                </NextLink>
              </NavbarItem>
            )}
          </>
        )}
      </NavbarContent>

      {loggedIn && user && (
        <NavbarItem className="sm:hidden">
          <Avatar
            size="sm"
            src={user?.image || undefined}
            className={clsx("text-white cursor-pointer", avatarBg)}
            onClick={onOpen}
            name={!user?.image ? avatarInitial : ""}
          >
            {!user?.image && avatarInitial}
          </Avatar>
        </NavbarItem>
      )}

      {!loggedIn && !user && <NavbarMenuToggle className="sm:hidden" />}

      <NavbarMenu>
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{t("menu")}</h2>
            <div className="flex items-center gap-2">
              <LanguageSwitch />
              <ThemeSwitch />
            </div>
          </div>

          <SearchInput />

          {!isSignInPage && (
            <NavbarMenuItem>
              <NextLink href={`/${locale}/auth/signin`} passHref>
                <Button fullWidth variant="solid" color="primary">
                  {t("signIn")}
                </Button>
              </NextLink>
            </NavbarMenuItem>
          )}
          {!isSignUpPage && (
            <NavbarMenuItem>
              <NextLink href={`/${locale}/auth/signup`} passHref>
                <Button fullWidth variant="bordered" color="primary">
                  {t("signUp")}
                </Button>
              </NextLink>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>

      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="right">
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <p>
                      {t("welcome")}, {_.capitalize(user?.name)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {_.capitalize(t(user?.role ?? "individual"))}
                    </p>
                  </div>
                  <div className="flex items-center gap-10 mr-10 block sm:hidden">
                    <LanguageSwitch />
                    <ThemeSwitch />
                  </div>
                </div>
                <div className="w-full mt-3 block sm:hidden">
                  <SearchInput />
                </div>
              </DrawerHeader>
              <DrawerBody>
                <Button
                  fullWidth
                  variant="flat"
                  color="primary"
                  startContent={<Avatar size="sm" src={user?.image || undefined} name={avatarInitial} className={clsx("text-white", avatarBg)} />}
                  className="mb-4 mt-2 text-left justify-start font-semibold text-lg shadow-md hover:scale-[1.02] transition-transform"
                  onPress={() => {
                    router.push(`/profile`);
                    onClose();
                  }}
                >
                  {t("profile")}
                </Button>
              </DrawerBody>
              <DrawerFooter className="justify-end">
                <Button
                  color="danger"
                  variant="solid"
                  onPress={async () => {
                    await dispatch(signoutThunk());
                    router.push("/");
                    addToast({
                      title: t("signedOutTitle"),
                      description: t("signedOutDescription"),
                      color: "success",
                      icon: <HiInformationCircle />,
                    });
                    onClose();
                  }}
                >
                  {t("signOut")}
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </HeroUINavbar>
  );
}
