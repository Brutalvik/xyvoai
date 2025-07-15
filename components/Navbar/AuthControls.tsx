"use client";

import { Avatar, Button, NavbarItem } from "@heroui/react";
import NextLink from "next/link";
import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUser, isLoggedIn } from "@/store/selectors";
import { getBgColor, getInitial } from "@/utils";

export default function AuthControls({
  onAvatarClick,
}: {
  onAvatarClick: () => void;
}) {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const dispatch = useAppDispatch();

  const activeUser: any = useAppSelector(selectUser);
  const loggedIn = useAppSelector(isLoggedIn);
  const { user } = activeUser || {};

  const avatarBg = useMemo(
    () => (user?.id ? getBgColor(user.id) : "bg-gray-400"),
    [user?.id]
  );
  const avatarInitial = useMemo(
    () => getInitial(user?.name || ""),
    [user?.name]
  );

  return (
    <>
      {!loggedIn && (
        <>
          <NavbarItem>
            <NextLink href={`/${locale}/auth/signup`}>
              <Button color="primary" size="sm" variant="ghost">
                {t("signUp")}
              </Button>
            </NextLink>
          </NavbarItem>
          <NavbarItem>
            <NextLink href={`/${locale}/auth/signin`}>
              <Button color="primary" size="sm" variant="flat">
                {t("signIn")}
              </Button>
            </NextLink>
          </NavbarItem>
        </>
      )}
      {loggedIn && user && (
        <NavbarItem>
          <Avatar
            className="cursor-pointer text-white"
            name={avatarInitial}
            size="sm"
            src={user?.image}
            style={
              user?.image
                ? {}
                : {
                    backgroundColor: getBgColor(user?.id || "", true),
                    fontSize: "0.975rem",
                    fontWeight: "700",
                    color: "#fff",
                  }
            }
            onClick={onAvatarClick}
          />
        </NavbarItem>
      )}
    </>
  );
}
