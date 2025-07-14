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
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { addToast } from "@heroui/react";
import { HiInformationCircle } from "react-icons/hi";
import { Settings2 } from "lucide-react";
import _ from "lodash";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser, isLoggedIn } from "@/store/selectors";
import { signoutThunk } from "@/store/auth/thunks";
import { SearchInput } from "@/components/SearchInput";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import LanguageSwitch from "@/components/LanguageSwitch";
import { getBgColor, getInitial } from "@/utils";

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
              className={clsx(
                "cursor-pointer text-white",
                !user?.image && avatarBg, // only apply bg class if no image
              )}
              name={avatarInitial}
              size="sm"
              src={user?.image || undefined}
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
              onClick={onOpen}
            />
          </NavbarItem>
        )}

        {!loggedIn && (
          <>
            {!isSignUpPage && (
              <NavbarItem>
                <NextLink href={`/${locale}/auth/signup`}>
                  <Button color="primary" size="sm" variant="ghost">
                    {t("signUp")}
                  </Button>
                </NextLink>
              </NavbarItem>
            )}
            {!isSignInPage && (
              <NavbarItem>
                <NextLink href={`/${locale}/auth/signin`}>
                  <Button color="primary" size="sm" variant="flat">
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
            className={clsx("text-white cursor-pointer", avatarBg)}
            name={!user?.image ? avatarInitial : ""}
            size="sm"
            src={user?.image || undefined}
            onClick={onOpen}
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
              <NextLink passHref href={`/${locale}/auth/signin`}>
                <Button fullWidth color="primary" variant="solid">
                  {t("signIn")}
                </Button>
              </NextLink>
            </NavbarMenuItem>
          )}
          {!isSignUpPage && (
            <NavbarMenuItem>
              <NextLink passHref href={`/${locale}/auth/signup`}>
                <Button fullWidth color="primary" variant="bordered">
                  {t("signUp")}
                </Button>
              </NextLink>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>

      <Drawer isOpen={isOpen} placement="right" onOpenChange={onOpenChange}>
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
                {/* DrawerBody can remain empty or contain other content if needed */}
              </DrawerBody>
              <DrawerFooter className="flex items-end justify-between">
                <div className="flex items-center">
                  <button
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-100 text-base font-medium hover:underline focus:outline-none"
                    type="button"
                    onClick={() => {
                      router.push(`/profile`);
                      onClose();
                    }}
                  >
                    <Settings2 className="w-5 h-5" />
                    {t("profile")}
                  </button>
                </div>
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
