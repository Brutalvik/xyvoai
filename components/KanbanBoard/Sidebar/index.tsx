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
import { useAppDispatch } from "@/store/hooks";
import { deleteProject } from "@/store/slices/projectsSlice";
import Link from "next/link";
import { Select, SelectItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { getInitials } from "@/lib/utils";

// Navigation items
const navItems = [
  {
    labelKey: "overview",
    icon: <LayoutDashboard size={20} />,
    href: "/overview",
  },
  {
    labelKey: "boards",
    icon: <KanbanSquare className="text-green-500" size={20} />,
    href: "overview/boards",
  },
  { labelKey: "workItems", icon: <ListTodo size={20} />, href: "/work-items" },
  { labelKey: "backlogs", icon: <BookText size={20} />, href: "/backlogs" },
  { labelKey: "sprints", icon: <GitBranch size={20} />, href: "/sprints" },
  { labelKey: "queries", icon: <FileStack size={20} />, href: "/queries" },
  { labelKey: "plans", icon: <FileStack size={20} />, href: "/plans" },
  {
    labelKey: "repos",
    icon: <GitBranch className="text-red-500" size={20} />,
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
interface SidebarProps {
  projects: { id: string; name: string }[];
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  isEmpty?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  projects,
  selectedProjectId,
  setSelectedProjectId,
  isEmpty = false,
}) => {
  const noProjects = projects.length === 0;
  const dispatch = useAppDispatch();
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
        className={`flex items-center gap-3 px-4 py-2 text-sm rounded hover:bg-gray-100 dark:hover:bg-zinc-800 ${pathname === href ? "bg-gray-200 font-semibold" : ""}`}
        href={href}
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
          isIconOnly
          className="fixed top-12 left-2 z-50"
          onPress={onOpen}
        >
          <Menu size={20} />
        </Button>
        <Drawer isOpen={isOpen} placement="left" onOpenChange={onOpenChange}>
          <DrawerContent>
            {(onClose) => (
              <>
                <DrawerHeader>{t("projectBoard")}</DrawerHeader>
                <DrawerBody>
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
                      href={item.href}
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
            size="sm"
            variant="light"
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

      {/* Project Selector */}
      <div className="py-3">
        <Tooltip content={t("projectName")} placement="right">
          <div className="flex items-center gap-2 px-4">
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
              {projects.length > 0 ? getInitials(
                projects.find((p) => p.id === selectedProjectId)?.name || ""
              ) : "--"}
            </div>
            {!isCollapsed && (
              noProjects ? (
                <span className="text-gray-400">No projects</span>
              ) : projects.length > 1 ? (
                <Select
                  selectedKeys={new Set([selectedProjectId])}
                  onSelectionChange={(keys) => {
                    const key = Array.from(keys)[0];
                    if (typeof key === "string") setSelectedProjectId(key);
                  }}
                  className="min-w-[160px]"
                >
                  {projects.map((project) => (
                    <SelectItem key={project.id}>{project.name}</SelectItem>
                  ))}
                </Select>
              ) : (
                <span>{projects[0]?.name}</span>
              )
            )}
          </div>
        </Tooltip>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-auto text-sm">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              {item.labelKey === "backlogs"
                ? (
                  <NavItem
                    href={item.href}
                    icon={item.icon}
                    label={t(item.labelKey)}
                  />
                )
                : ((noProjects || isEmpty)
                  ? (
                    <span className="flex items-center gap-3 px-4 py-2 text-sm rounded text-gray-400 cursor-not-allowed">
                      {item.icon}
                      {!isCollapsed && <span>{t(item.labelKey)}</span>}
                    </span>
                  )
                  : (
                    <NavItem
                      href={item.href}
                      icon={item.icon}
                      label={t(item.labelKey)}
                    />
                  ))}
            </li>
          ))}
        </ul>
      </nav>
      {/* Settings Button: Just below nav links, not in footer */}
      {!isCollapsed && (
        <div className="px-4 py-2">
          {/* Project settings stays enabled even if isEmpty */}
          <NavItem
            href={"#"}
            icon={<Settings />}
            label={t("projectSettings")}
          />
        </div>
      )}
      {/* Mobile view */}
      {!isDesktop && (
        <>
          <Button
            isIconOnly
            className="fixed top-12 left-2 z-50"
            onPress={onOpen}
          >
            <Menu size={20} />
          </Button>
          <Drawer isOpen={isOpen} placement="left" onOpenChange={onOpenChange}>
            <DrawerContent>
              {(onClose) => (
                <>
                  <DrawerHeader>{t("projectBoard")}</DrawerHeader>
                  <DrawerBody>
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
                        href={item.href}
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
      )}
    </aside>
  );
};

export default Sidebar;
