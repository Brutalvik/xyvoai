"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
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
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useLocale, useTranslations } from "next-intl";
import { addToast } from "@heroui/react";
import { HiInformationCircle } from "react-icons/hi";

function getInitial(name: string) {
  return name?.charAt(0)?.toUpperCase() || "?";
}

function getUserColor(seed: string): string {
  const colors = [
    "bg-red-500",
    "bg-pink-500",
    "bg-purple-500",
    "bg-indigo-500",
    "bg-blue-500",
    "bg-teal-500",
    "bg-green-500",
    "bg-amber-500",
    "bg-orange-500",
    "bg-rose-500",
  ];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const loggedIn = useAppSelector(isLoggedIn);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const avatarBg = useMemo(() => {
    return user?.id ? getUserColor(user.id) : "bg-gray-400";
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
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
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
        </ul>
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

        {loggedIn && user && (
          <NavbarItem>
            <Avatar
              size="sm"
              src={user?.image || undefined}
              className={clsx("text-white cursor-pointer", avatarBg)}
              onClick={onOpen}
            >
              {!user?.image && avatarInitial}
            </Avatar>
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
              <DrawerContent>
                {(onClose) => (
                  <>
                    <DrawerHeader className="flex flex-col gap-1">
                      {t("welcome")}, {user?.name}
                    </DrawerHeader>
                    <DrawerBody>
                      <p>
                        {t("email")}: {user?.email}
                      </p>
                      <p>
                        {t("phone")}: {user?.phone}
                      </p>
                      <p>
                        {t("accountType")}: {user?.accountType}
                      </p>
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
          </NavbarItem>
        )}
      </NavbarContent>
    </HeroUINavbar>
  );
}
