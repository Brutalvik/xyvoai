"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Tooltip,
  useDisclosure,
} from "@heroui/react";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  KanbanSquare,
  GitBranch,
  Settings,
  ListTodo,
  BookText,
  FileStack,
  TestTube2,
  PackageSearch,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Navigation items
const navItems = [
  {
    labelKey: "overview",
    icon: <LayoutDashboard size={20} />,
    href: "/dashboard",
  },
  {
    labelKey: "boards",
    icon: <KanbanSquare size={20} className="text-green-500" />,
    href: "/boards",
  },
  { labelKey: "workItems", icon: <ListTodo size={20} />, href: "/work-items" },
  { labelKey: "backlogs", icon: <BookText size={20} />, href: "/backlogs" },
  { labelKey: "sprints", icon: <GitBranch size={20} />, href: "/sprints" },
  { labelKey: "queries", icon: <FileStack size={20} />, href: "/queries" },
  { labelKey: "plans", icon: <FileStack size={20} />, href: "/plans" },
  {
    labelKey: "repos",
    icon: <GitBranch size={20} className="text-red-500" />,
    href: "/repos",
  },
  { labelKey: "pipelines", icon: <FileStack size={20} />, href: "/pipelines" },
  { labelKey: "testPlans", icon: <TestTube2 size={20} />, href: "/test-plans" },
  {
    labelKey: "artifacts",
    icon: <PackageSearch size={20} />,
    href: "/artifacts",
  },
];

const Sidebar = () => {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDesktop, setIsDesktop] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Handle screen resizing
  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  // Navigation item component
  const NavItem = ({
    icon,
    label,
    href,
  }: {
    icon: React.ReactNode;
    label: string;
    href: string;
  }) => (
    <Tooltip content={isDesktop && isCollapsed ? label : ""} placement="right">
      <Link
        href={href}
        className={`flex items-center gap-3 px-4 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-zinc-800 ${pathname === href ? "bg-gray-200 font-semibold" : ""}`}
      >
        {icon}
        {!isCollapsed && <span>{label}</span>}
      </Link>
    </Tooltip>
  );

  // Desktop view layout
  if (!isDesktop) {
    return (
      <>
        <Button
          className="fixed top-12 left-2 z-50"
          isIconOnly
          onPress={onOpen}
        >
          <Menu size={20} />
        </Button>
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader>{t("projectBoard")}</DrawerHeader>
                <DrawerBody>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
                    >
                      {item.icon}
                      <span>{t(item.labelKey)}</span>
                    </Link>
                  ))}
                </DrawerBody>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  // Desktop sidebar layout
  return (
    <aside
      className={`${isCollapsed ? "w-16" : "w-64"} border-r shadow-sm flex flex-col transition-all duration-300 h-full bg-white dark:bg-background`}
    >
      {/* Header: Hamburger and Project Info */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <div className="flex items-center gap-2">
          <span className="material-icons text-blue-600">layers</span>
          {!isCollapsed && (
            <span className="font-bold text-blue-600">{t("projectBoard")}</span>
          )}
        </div>
        <Tooltip content={isCollapsed ? t("expand") : t("collapse")}>
          <Button
            isIconOnly
            variant="light"
            size="sm"
            onPress={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </Button>
        </Tooltip>
      </div>

      {/* Project Name */}
      <div className="py-3">
        <Tooltip content={t("projectName")} placement="right">
          <div className="flex items-center gap-2 px-4">
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
              AW
            </div>
            {!isCollapsed && <span>{t("projectName")}</span>}
          </div>
        </Tooltip>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-auto text-sm">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <NavItem
                icon={item.icon}
                label={t(item.labelKey)}
                href={item.href}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer: Settings */}
      <div className="p-4 border-t text-xs text-gray-400">
        {!isCollapsed && (
          <NavItem
            icon={<Settings />}
            label={t("projectSettings")}
            href={"#"}
          />
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
