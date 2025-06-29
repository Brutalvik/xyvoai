"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
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
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { SearchInput } from "@/components/SearchInput";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import LanguageSwitch from "@/components/LanguageSwitch";
import { useAppSelector } from "@/store/hooks";
import { useLocale } from "next-intl";
import { selectUser, isLoggedIn } from "@/store/selectors/index";

export default function Navbar() {
  const locale = useLocale();
  const user = useAppSelector(selectUser);
  const loggedIn = useAppSelector(isLoggedIn);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

        {!loggedIn ? (
          <>
            <NavbarItem>
              <NextLink href={`/${locale}/auth/register`}>
                <Button size="sm" variant="ghost" color="primary">
                  Sign Up
                </Button>
              </NextLink>
            </NavbarItem>
            <NavbarItem>
              <NextLink href={`/${locale}/auth/signin`}>
                <Button size="sm" variant="flat" color="primary">
                  Sign In
                </Button>
              </NextLink>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem>
            <Avatar
              size="sm"
              name={user?.name}
              src={user?.image || "/user.png"}
              onClick={onOpen}
              className="cursor-pointer"
            />
            <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
              <DrawerContent>
                {(onClose) => (
                  <>
                    <DrawerHeader className="flex flex-col gap-1">
                      Welcome, {user?.name}
                    </DrawerHeader>
                    <DrawerBody>
                      <p>Email: {user?.email}</p>
                      {/* Add more user-related actions here */}
                    </DrawerBody>
                    <DrawerFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => {
                          // Add sign-out logic here
                          onClose();
                        }}
                      >
                        Sign Out
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
