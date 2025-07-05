"use client";

import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Tooltip,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useTranslations } from "next-intl";
import {
  CircleChevronLeft,
  CircleChevronRight,
  LayoutDashboard,
  KanbanSquare,
  Code,
  Settings,
  FlaskConical,
  PackageSearch,
  PackagePlus,
  GitFork,
} from "lucide-react";

const Sidebar = () => {
  const t = useTranslations("Sidebar");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDesktop, setIsDesktop] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  const NavItem = ({
    icon,
    label,
  }: {
    icon: React.ReactNode;
    label: string;
  }) => (
    <Tooltip content={isDesktop && isCollapsed ? label : ""} placement="right">
      <a
        href="#"
        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
      >
        {icon}
        {!isCollapsed && <span>{label}</span>}
      </a>
    </Tooltip>
  );

  const navigation = [
    { label: t("overview"), icon: <LayoutDashboard className="h-4 w-4" /> },
    {
      label: t("boards"),
      icon: <KanbanSquare className="h-4 w-4 text-green-500" />,
    },
    { label: t("repos"), icon: <Code className="h-4 w-4 text-red-500" /> },
    {
      label: t("pipelines"),
      icon: <GitFork className="h-4 w-4 text-blue-600" />,
    },
    {
      label: t("testPlans"),
      icon: <FlaskConical className="h-4 w-4 text-purple-600" />,
    },
    {
      label: t("artifacts"),
      icon: <PackagePlus className="h-4 w-4 text-pink-600" />,
    },
  ];

  if (!isDesktop) {
    return (
      <>
        <Button className="fixed top-4 left-4 z-50" isIconOnly onPress={onOpen}>
          <KanbanSquare />
        </Button>
        <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="left">
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader>{t("projectBoard")}</DrawerHeader>
                <DrawerBody>
                  <div className="space-y-4">
                    {navigation.map((item, idx) => (
                      <a
                        href="#"
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </DrawerBody>
              </>
            )}
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } border-r shadow-sm flex flex-col transition-all duration-300`}
    >
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <div className="flex items-center gap-2">
          <span className="material-icons text-blue-600">layers</span>
          {!isCollapsed && (
            <span className="font-bold text-blue-600">{t("projectBoard")}</span>
          )}
        </div>
        <Tooltip
          content={isCollapsed ? t("expand") : t("collapse")}
          placement="right"
        >
          <Button
            isIconOnly
            variant="light"
            onPress={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? <CircleChevronRight /> : <CircleChevronLeft />}
          </Button>
        </Tooltip>
      </div>

      <nav className="flex-1 overflow-auto">
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

        <ul className="space-y-1">
          {navigation.map((item, idx) => (
            <li key={idx}>
              <NavItem icon={item.icon} label={item.label} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t text-xs text-gray-400">
        {!isCollapsed && t("projectSettings")}
      </div>
    </aside>
  );
};

export default Sidebar;
