"use client";

import { Bell, HelpCircle, Settings as GearIcon } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { isLoggedIn, selectUser } from "@/store/selectors";
import { Badge, Tooltip, useDisclosure } from "@heroui/react";
import { Avatar } from "@heroui/react";
import UserDrawer from "@/components/Navbar/UserDrawer";
import { getBgColor, getInitial } from "@/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import XyvoLogo from "@/components/XyvoLogo";

export function BoardHeader() {
  const drawerDisclosure = useDisclosure();
  const t = useTranslations("Navbar");

  const loggedIn = useAppSelector(isLoggedIn);
  const activeUser: any = useAppSelector(selectUser);
  const { user } = activeUser || {};

  const avatarBg = getBgColor(user?.id || "", true);
  const avatarInitial = getInitial(user?.name || "");

  const AuthAvatar = () => (
    <Avatar
      name={avatarInitial}
      radius="md"
      size="sm"
      src={user?.image}
      style={
        user?.image
          ? {}
          : {
              backgroundColor: avatarBg,
              fontSize: "0.975rem",
              fontWeight: 700,
              color: "#fff",
            }
      }
      className="cursor-pointer"
      onClick={drawerDisclosure.onOpen}
    />
  );

  const UnAuthAvatar = () => (
    <Tooltip content={t("unverified")} showArrow>
      <Badge
        color="warning"
        content="U"
        variant="solid"
        className="cursor-pointer"
        size="sm"
        showOutline={false}
      >
        <AuthAvatar />
      </Badge>
    </Tooltip>
  );

  return (
    <>
      <header className="sticky top-0 z-30 w-full flex items-center justify-between px-6 py-3 border-b border-blue-500 bg-white dark:bg-neutral-900">
        {/* Left: Logo and Nav Items */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <XyvoLogo />
          </Link>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-neutral-700 dark:text-neutral-200">
            <Link href="#">Workspaces</Link>
            <Link href="#">Projects</Link>
            <Link href="#">Dashboards</Link>
            <Link href="#">Reports</Link>
            <Link href="#">Integrations</Link>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
            <Bell size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
            <HelpCircle size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
            <GearIcon size={18} />
          </button>
          {loggedIn && String(user.emailVerified) === "true" ? (
            <AuthAvatar />
          ) : (
            <UnAuthAvatar />
          )}
        </div>
      </header>

      {loggedIn && (
        <UserDrawer
          isOpen={drawerDisclosure.isOpen}
          onOpenChange={drawerDisclosure.onOpenChange}
        />
      )}
    </>
  );
}
