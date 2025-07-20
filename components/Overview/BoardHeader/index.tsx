"use client";

import { useState } from "react";
import { Bell, HelpCircle, Settings as GearIcon } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { isLoggedIn, selectUser } from "@/store/selectors";
import {
  Badge,
  Tooltip,
  useDisclosure,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { Avatar } from "@heroui/react";
import UserDrawer from "@/components/Navbar/UserDrawer";
import { getBgColor, getInitial } from "@/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import XyvoLogo from "@/components/XyvoLogo";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export default function BoardHeader() {
  const drawerDisclosure = useDisclosure();
  const t = useTranslations("Navbar");

  const loggedIn = useAppSelector(isLoggedIn);
  const activeUser: any = useAppSelector(selectUser);
  const { user } = activeUser || {};

  const avatarBg = getBgColor(user?.id || "", true);
  const avatarInitial = getInitial(user?.name || "");

  const [notifications, setNotifications] = useState([
    { id: 1, message: "New comment on task #23", read: false },
    { id: 2, message: "Project deadline updated", read: false },
    { id: 3, message: "You were assigned to Sprint Q3", read: false },
    { id: 4, message: "Your report is ready to download", read: false },
    { id: 5, message: "Weekly summary available", read: true },
    { id: 6, message: "New integration added", read: true },
    { id: 7, message: "New task assigned", read: true },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

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
          {/* 🔔 Notifications */}
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <button className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
                <Badge
                  color="primary"
                  size="sm"
                  content={
                    <AnimatePresence>
                      {unreadCount > 0 && (
                        <motion.span
                          key={unreadCount}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {unreadCount}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  }
                >
                  <Bell size={18} />
                </Badge>
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-2 shadow-lg rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs uppercase tracking-wide font-semibold mb-2 text-gray-500 dark:text-gray-300">
                  Notifications
                </p>
                <ul className="space-y-2">
                  {notifications.map((notif) => (
                    <li
                      key={notif.id}
                      className="flex items-start gap-2 text-sm hover:bg-gray-50 dark:hover:bg-neutral-700 px-2 py-1 rounded-md transition cursor-pointer"
                      onClick={() => markAsRead(notif.id)}
                    >
                      {!notif.read && (
                        <span className="mt-1 w-2 h-2 rounded-full bg-yellow-500 shrink-0"></span>
                      )}
                      <span
                        className={clsx("text-gray-700 dark:text-gray-100", {
                          "opacity-70": notif.read,
                        })}
                      >
                        {notif.message}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </PopoverContent>
          </Popover>

          {/* Help & Settings */}
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
            <HelpCircle size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-700">
            <GearIcon size={18} />
          </button>

          {/* Avatar */}
          {loggedIn && String(user.emailVerified) === "true" ? (
            <AuthAvatar />
          ) : (
            <UnAuthAvatar />
          )}
        </div>
      </header>

      {/* User Drawer */}
      {loggedIn && (
        <UserDrawer
          isOpen={drawerDisclosure.isOpen}
          onOpenChange={drawerDisclosure.onOpenChange}
        />
      )}
    </>
  );
}
